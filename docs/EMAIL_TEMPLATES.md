# Email templates

Use these for a consistent, professional look for **email confirmation** (Supabase Auth) and **payment successful** (sent automatically by the webhook via Resend).

---

## 1. Confirm signup (Supabase Auth)

Configure in **Supabase Dashboard → Authentication → Email Templates → Confirm signup**.

Replace the default template body with the HTML below. You can keep the default **Subject** (e.g. `Confirm Your Signup`) or use: `Confirm your email – {{ .SiteURL }}`.

**Important:** Supabase uses Go templates. The confirmation link is `{{ .ConfirmationURL }}`. Do not remove it.

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

### Use your company name as the sender (not "Supabase")

So that confirmation emails show **CCworld Consultation** (or your company name) instead of "Supabase" in the From field:

1. **Supabase Dashboard** → **Project Settings** (gear icon) → **Authentication**.
2. Under **SMTP Settings**, enable **Custom SMTP**.
3. Configure your SMTP (e.g. **Resend** – same account you use for payment emails):
   - **Sender email:** e.g. `noreply@ccworldconsultation.com` (must be a verified domain in Resend).
   - **Sender name:** `CCworld Consultation` (this is the name recipients see in their inbox).
   - **Host:** `smtp.resend.com`
   - **Port:** `465` (SSL) or `587` (TLS)
   - **Username:** `resend`
   - **Password:** your Resend API key (same as `RESEND_API_KEY`).

4. Save. All Auth emails (confirm signup, magic link, reset password) will then come from **CCworld Consultation &lt;noreply@ccworldconsultation.com&gt;** (or whatever you set).

If you don’t use Custom SMTP, Supabase sends from its own server and the From name will be something like "Supabase" or "Supabase Auth". There is no way to change that without enabling Custom SMTP.

---

## 2. Payment successful (automatic)

The **payment received** email is sent by the `seerbit-webhook` Edge Function when a payment is marked as paid. It uses **Resend** and does not use the Supabase email templates.

**Setup**

1. Create an account at [resend.com](https://resend.com) and get an API key.
2. In **Supabase Dashboard → Edge Functions → seerbit-webhook → Secrets**, add:
   - `RESEND_API_KEY` – your Resend API key (required for payment emails).
   - `RESEND_FROM` (optional) – sender address, e.g. `notifications@ccworldconsulting.com`. If omitted, Resend uses `onboarding@resend.dev` (you can only send to your own verified email until you add a domain).
   - `SITE_NAME` (optional) – e.g. `CCworld Consulting` (used in subject and footer).

3. In Resend, add and verify your domain so you can send from your own address (e.g. `notifications@ccworldconsulting.com`).

The email content (subject, body, styling) is defined in the webhook code and includes the product name, amount paid, and “We’ll get back to you shortly.”
