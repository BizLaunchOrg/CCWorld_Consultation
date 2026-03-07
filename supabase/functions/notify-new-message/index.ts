// Supabase Edge Function: email admin only when a new user message arrives AND the admin
// hasn't opened the conversation yet (no other unread user messages in that conversation).
// So we send at most one email per "unread thread" — not one per message.
// Uses Brevo. Set BREVO_API_KEY in Supabase secrets. Deploy and add DB webhook on chat_messages INSERT.

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
    const conversationId = payload.record.conversation_id;
    if (!conversationId) {
      return new Response(JSON.stringify({ ok: true, skipped: 'no conversation_id' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    // Only notify if admin hasn't opened this conversation yet: count unread user messages.
    // If there's more than one, admin already had unread — don't send another email.
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (supabaseUrl && serviceRoleKey) {
      const countRes = await fetch(
        `${supabaseUrl}/rest/v1/chat_messages?conversation_id=eq.${conversationId}&sender_role=eq.user&read_at=is.null&select=id`,
        { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } }
      );
      if (countRes.ok) {
        const rows = await countRes.json();
        if (Array.isArray(rows) && rows.length > 1) {
          return new Response(JSON.stringify({ ok: true, skipped: 'admin already has unread in this conversation' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
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
    // Brevo requires the sender email to be verified in Brevo dashboard (Senders & IP).
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
    const resText = await res.text();
    if (!res.ok) {
      console.error('Brevo API error:', res.status, resText);
      return new Response(
        JSON.stringify({
          error: 'Brevo failed',
          details: resText,
          hint: 'Verify sender email in Brevo (Senders & IP) and check API key.',
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('notify-new-message error:', e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
