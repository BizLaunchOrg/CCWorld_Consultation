// Supabase Edge Function: seerbit-webhook
// Verifies webhook (per Seerbit docs: respond 200 + ack). Updates training_orders by provider_reference.
// Deploy with --no-verify-jwt so Seerbit can POST without a JWT.
// Set webhook URL in Seerbit dashboard to: https://<project>.supabase.co/functions/v1/seerbit-webhook

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-expected-ack-reference',
};

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
          .select('id, metadata')
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
