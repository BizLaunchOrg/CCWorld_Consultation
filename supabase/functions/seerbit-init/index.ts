// Supabase Edge Function: seerbit-init
// Requires authenticated + email confirmed. Creates training_orders with server-controlled price,
// calls Seerbit to get checkout link, returns checkout_url to client.
// Deploy with: supabase functions deploy seerbit-init --no-verify-jwt
//   (Gateway JWT verification can fail with ES256-signed tokens; this function validates the user via getUser() instead.)
// Secrets: SEERBIT_PUBLIC_KEY, SEERBIT_SECRET_KEY, SUPABASE_ANON_KEY (set in Dashboard -> Edge Functions -> seerbit-init)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!anonKey) {
      return new Response(
        JSON.stringify({
          error: 'Server misconfiguration: SUPABASE_ANON_KEY not set. Add it in Dashboard → Edge Functions → seerbit-init → Secrets.',
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      anonKey,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({
          error: 'Invalid or expired session. Please log out and log in again, then try paying again.',
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!user.email_confirmed_at) {
      return new Response(
        JSON.stringify({ error: 'Please confirm your email before paying' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const training_id = body?.training_id;
    if (!training_id) {
      return new Response(
        JSON.stringify({ error: 'training_id required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const publicKey = Deno.env.get('SEERBIT_PUBLIC_KEY');
    const secretKey = Deno.env.get('SEERBIT_SECRET_KEY');
    if (!publicKey || !secretKey) {
      const missing = [(!publicKey && 'SEERBIT_PUBLIC_KEY'), (!secretKey && 'SEERBIT_SECRET_KEY')].filter(Boolean);
      return new Response(
        JSON.stringify({
          error: 'Payment configuration error',
          detail: `Add these secrets in Dashboard → Edge Functions → seerbit-init → Secrets: ${missing.join(', ')}`,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const serviceSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: product, error: productError } = await serviceSupabase
      .from('training_products')
      .select('id, name, amount, active')
      .eq('id', training_id)
      .single();

    if (productError || !product || !product.active) {
      return new Response(
        JSON.stringify({ error: 'Training product not found or inactive' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const amount = Number(product.amount);
    if (!(amount >= 0)) {
      return new Response(
        JSON.stringify({ error: 'Invalid product amount' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentReference = `CCW-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const baseUrl = (Deno.env.get('SITE_URL') || 'https://www.ccworldconsultation.com').replace(/\/$/, '');
    const successUrl = `${baseUrl}/training/payment/success`;
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'Customer';

    const encryptRes = await fetch('https://seerbitapi.com/api/v2/encrypt/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: `${secretKey}.${publicKey}` }),
    });
    const encryptData = await encryptRes.json();
    const bearerToken = encryptData?.data?.EncryptedSecKey?.encryptedKey;
    if (!bearerToken) {
      return new Response(
        JSON.stringify({ error: 'Payment provider error' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentRes = await fetch('https://seerbitapi.com/api/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        publicKey,
        amount: String(Math.round(amount)),
        currency: 'NGN',
        country: 'NG',
        paymentReference,
        email: user.email,
        fullName,
        tokenize: 'false',
        callbackUrl: successUrl,
        callback_url: successUrl,
      }),
    });
    const paymentData = await paymentRes.json();
    const redirectLink = paymentData?.data?.payments?.redirectLink;
    if (!redirectLink) {
      return new Response(
        JSON.stringify({ error: paymentData?.message || 'Failed to create payment link' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: order, error: orderError } = await serviceSupabase
      .from('training_orders')
      .insert({
        user_id: user.id,
        training_id: product.id,
        amount,
        status: 'pending',
        provider_reference: paymentReference,
        checkout_url: redirectLink,
        metadata: { created_via: 'seerbit-init' },
      })
      .select('id')
      .single();

    if (orderError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ checkout_url: redirectLink, order_id: order.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
