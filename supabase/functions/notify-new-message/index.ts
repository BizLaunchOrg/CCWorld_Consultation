// Supabase Edge Function: email ccworldconsulting@gmail.com when someone sends a new chat message.
// Uses Brevo (free, simple): sign up at brevo.com → API Keys → create key.
// Set secret: supabase secrets set BREVO_API_KEY=your_key
// Deploy: supabase functions deploy notify-new-message
// In Supabase Dashboard add Database Webhook: table chat_messages, event INSERT, URL https://<project-ref>.supabase.co/functions/v1/notify-new-message

const ADMIN_EMAIL = 'ccworldconsulting@gmail.com';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  schema: string;
  record: {
    id?: string;
    conversation_id?: string;
    sender_role?: string;
    body?: string;
    created_at?: string;
  };
  old_record: unknown;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*' } });
  }
  try {
    const payload = (await req.json()) as WebhookPayload;
    if (payload.type !== 'INSERT' || payload.table !== 'chat_messages' || payload.record?.sender_role !== 'user') {
      return new Response(JSON.stringify({ ok: true, skipped: 'not a user message' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const apiKey = Deno.env.get('BREVO_API_KEY');
    if (!apiKey) {
      console.error('BREVO_API_KEY not set');
      return new Response(JSON.stringify({ error: 'Email not configured. Set BREVO_API_KEY in Supabase secrets.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const body = payload.record.body ?? '';
    const truncated = body.length > 300 ? body.slice(0, 300) + '…' : body;
    const html = `
      <p>You have a new message from the website chat.</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(truncated)}</p>
      <p><a href="https://www.ccworldconsulting.com/admin/messages">Open Admin → Messages</a></p>
    `;
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: ADMIN_EMAIL, name: 'CC World Consulting' },
        to: [{ email: ADMIN_EMAIL }],
        subject: 'New chat message on CC World Consulting',
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Brevo error:', res.status, err);
      return new Response(JSON.stringify({ error: err }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
