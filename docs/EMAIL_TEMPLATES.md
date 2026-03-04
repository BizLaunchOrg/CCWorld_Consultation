# Email templates

Use these for a consistent, professional look for **email confirmation** (Supabase Auth) and **payment successful** (sent automatically by the webhook via Resend).

---

## 1. Sender name = company name (Custom SMTP)

**Yes – the form you have open is the right place.**  
Use it so confirmation emails show **CCworld Consultation** (not "Supabase") in the recipient’s inbox.

### If you use **Gmail** (what you have now)

- **Sender email:** `ccworldconsultation@gmail.com` (or the Gmail you want to send from).
- **Sender name:** `CCworld Consultation` ✓ (already correct).
- **Host:** `smtp.gmail.com` ✓  
- **Port:** `465` ✓  
- **Username:** Your **full Gmail address** (e.g. `ccworldconsultation@gmail.com`).
- **Password:** A **Gmail App Password**, not your normal Gmail password.  
  1. Turn on 2-Step Verification for that Google account.  
  2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).  
  3. Create an app password for “Mail” and paste it into the Password field.

Supabase’s warning appears because Gmail is meant for personal use; deliverability and limits can be lower than a transactional provider. For production, **Resend** (or similar) is usually better.

### If you use **Resend** (recommended for production)

- **Sender email:** `noreply@ccworldconsultation.com` (after the domain is verified in Resend).
- **Sender name:** `CCworld Consultation`
- **Host:** `smtp.resend.com`
- **Port:** `465` or `587`
- **Username:** `resend`
- **Password:** Your **Resend API key** (from Resend dashboard → API Keys).

---

## 2. Designing / editing the confirmation emails

There are two different places, depending on which email you mean.

### A) Auth emails (confirm signup, reset password, etc.)

These are controlled by **Supabase**, not by your code.

1. In Supabase: **Authentication** → **Email Templates** (in the left sidebar).
2. Click the template you want to change (e.g. **Confirm signup**).
3. You’ll see:
   - **Subject** – e.g. `Confirm your email` or `Confirm your email – {{ .SiteURL }}`.
   - **Body (HTML)** – the actual design (layout, colors, text, button).
4. To use the nice design from this doc: copy the HTML block from the section below (“Confirm signup HTML body”), paste it into **Body (HTML)**, and save.  
   That’s “designing” the confirmation email: you’re replacing the default plain text with your branded HTML.

You can edit Subject and Body anytime in that screen; no code or deploy needed.

### B) Payment successful email (“We’ve received your payment”)

This one is **not** in Supabase. It’s sent by your Edge Function using Resend.

- **Where it’s defined:** in code: `supabase/functions/seerbit-webhook/index.ts`, inside the function **`paymentReceivedEmailHtml(...)`**.
- **To change the design:** edit that function (HTML string, text, colors, layout), then redeploy the function:
  ```bash
  supabase functions deploy seerbit-webhook --no-verify-jwt
  ```

So: **Auth emails** → Supabase Dashboard → Email Templates. **Payment email** → edit `seerbit-webhook/index.ts` and redeploy.

---

## 3. Confirm signup HTML body (paste into Auth template)

Configure in **Supabase Dashboard → Authentication → Email Templates → Confirm signup**.

Replace the default template body with the HTML below. You can set **Subject** to e.g. `Confirm your email` or `Confirm your email – {{ .SiteURL }}`.

**Important:** Keep `{{ .ConfirmationURL }}` in the link – Supabase replaces it with the real confirmation link.

```html
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;background:#f8fafc;padding:24px;">
  <div style="background:linear-gradient(135deg,#0d9488 0%,#0f766e 100%);border-radius:16px;padding:28px 24px;text-align:center;margin-bottom:24px;">
    <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Confirm your email</h1>
    <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.9);">One click and you're in</p>
  </div>
  <p style="margin:0 0 16px;font-size:15px;color:#334155;">Thanks for signing up. Click the button below to confirm your email address.</p>
  <p style="margin:0 0 24px;text-align:center;">
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:14px 28px;background:#0d9488;color:#fff;font-weight:700;text-decoration:none;border-radius:12px;">Confirm email</a>
  </p>
  <p style="margin:0;font-size:13px;color:#64748b;">If you didn't create an account, you can ignore this email.</p>
</div>
```

---

## 4. Payment successful (automatic)

The **payment received** email is sent by the `seerbit-webhook` Edge Function when a payment is marked as paid. It uses **Resend** and does not use the Supabase email templates.

**Setup**

1. Create an account at [resend.com](https://resend.com) and get an API key.
2. In **Supabase Dashboard → Edge Functions → seerbit-webhook → Secrets**, add:
   - `RESEND_API_KEY` – your Resend API key (required for payment emails).
   - `RESEND_FROM` (optional) – sender address, e.g. `notifications@ccworldconsultation.com`. If omitted, Resend uses `onboarding@resend.dev` (you can only send to your own verified email until you add a domain).
   - `SITE_NAME` (optional) – e.g. `CCworld Consulting` (used in subject and footer).

3. In Resend, add and verify your domain so you can send from your own address (e.g. `notifications@ccworldconsulting.com`).

The email content (subject, body, styling) is defined in the webhook code and includes the product name, amount paid, and “We’ll get back to you shortly.”
