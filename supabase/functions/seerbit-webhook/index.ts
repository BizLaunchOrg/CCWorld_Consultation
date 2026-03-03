// Supabase Edge Function: seerbit-webhook
// Verifies webhook (per Seerbit docs: respond 200 + ack). Updates training_orders by provider_reference.
// On successful payment (status paid), sends "We've received your payment" email via Resend.
// Deploy with --no-verify-jwt so Seerbit can POST without a JWT.
// Secrets: RESEND_API_KEY (required for payment email). Optional: RESEND_FROM (e.g. notifications@yourdomain.com), SITE_NAME (e.g. CCworld Consulting).
// Set webhook URL in Seerbit dashboard to: https://<project>.supabase.co/functions/v1/seerbit-webhook

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-expected-ack-reference',
};

function paymentReceivedEmailHtml(params: {
  customerName: string;
  productName: string;
  amountFormatted: string;
  siteName: string;
}) {
  const { customerName, productName, amountFormatted, siteName } = params;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment received</title>
</head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;background:#f1f5f9;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#0d9488 0%,#0f766e 100%);padding:32px 24px;text-align:center;">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.2);margin-bottom:16px;">
        <span style="font-size:32px;color:#fff;">✓</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;">Payment received</h1>
      <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.9);">Thank you for your order</p>
    </div>
    <div style="padding:28px 24px;">
      <p style="margin:0 0 16px;font-size:16px;color:#334155;">Hi ${escapeHtml(customerName)},</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">We've received your payment. Your training booking is confirmed.</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:14px 16px;font-size:13px;color:#64748b;">Product</td><td style="padding:14px 16px;font-size:14px;font-weight:600;color:#0f172a;">${escapeHtml(productName)}</td></tr>
        <tr><td style="padding:14px 16px;font-size:13px;color:#64748b;">Amount paid</td><td style="padding:14px 16px;font-size:14px;font-weight:700;color:#0d9488;">${escapeHtml(amountFormatted)}</td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#64748b;">We'll get back to you shortly with next steps. If you have any questions, reply to this email.</p>
    </div>
    <div style="padding:20px 24px;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">${escapeHtml(siteName)}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendPaymentReceivedEmail(params: {
  to: string;
  customerName: string;
  productName: string;
  amountFormatted: string;
  siteName: string;
}): Promise<boolean> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return false;
  const from = Deno.env.get('RESEND_FROM') || 'onboarding@resend.dev';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: params.to,
      subject: `We've received your payment – ${params.siteName}`,
      html: paymentReceivedEmailHtml({
        customerName: params.customerName,
        productName: params.productName,
        amountFormatted: params.amountFormatted,
        siteName: params.siteName,
      }),
    }),
  });
  return res.ok;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const ackRef = req.headers.get('X-Expected-Ack-Reference') || `fallback-${Date.now()}`;

  try {
    const body = await req.json();
    const items = body?.notificationItems;
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ ackReference: ackRef, status: 'received' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const siteName = Deno.env.get('SITE_NAME') || 'CCworld Consulting';

    for (const item of items) {
      const reqItem = item?.notificationRequestItem;
      if (!reqItem) continue;
      const eventType = reqItem.eventType;
      const data = reqItem.data;
      if (eventType !== 'transaction' || !data) continue;

      const reference = data.reference;
      const gatewayCode = data.gatewayCode ?? data.code;
      const status = gatewayCode === '00' ? 'paid' : 'failed';

      if (reference) {
        const { data: existing } = await supabase
          .from('training_orders')
          .select('id, user_id, amount, training_id, metadata')
          .eq('provider_reference', reference)
          .single();

        if (existing) {
          const meta = (existing.metadata as Record<string, unknown>) || {};
          await supabase
            .from('training_orders')
            .update({
              status,
              metadata: { ...meta, webhook_payload: body, webhook_at: new Date().toISOString() },
            })
            .eq('provider_reference', reference);

          if (status === 'paid') {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('email, name')
                .eq('id', existing.user_id)
                .single();
              const { data: product } = await supabase
                .from('training_products')
                .select('name')
                .eq('id', existing.training_id)
                .single();
              const email = profile?.email ?? null;
              const productName = product?.name ?? 'Training';
              const amountFormatted = `NGN ${Number(existing.amount).toLocaleString('en-NG')}`;
              const customerName = profile?.name?.trim() || 'Customer';
              if (email) {
                await sendPaymentReceivedEmail({
                  to: email,
                  customerName,
                  productName,
                  amountFormatted,
                  siteName,
                });
              }
            } catch (_) {
              // Don't fail webhook ack if email fails
            }
          }
        }
      }
    }
  } catch (_) {
    // Still acknowledge so Seerbit doesn't retry unnecessarily
  }

  return new Response(
    JSON.stringify({ ackReference: ackRef, status: 'received' }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
