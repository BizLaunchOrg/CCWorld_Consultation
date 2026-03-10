# Email templates

Use these for a consistent, professional look for **auth emails** (Supabase Auth: confirm email, reset password, etc.). There is no payment or signup flow on the website; engagements are handled outside the site.

---

## 1. Sender name = company name (Custom SMTP)

Use it so confirmation emails show **CCworld Consultating** (not "Supabase") in the recipient’s inbox.

### If you use **Gmail**

- **Sender email:** `hello@ccworldconsult.com` (or the sender email you want to use).
- **Sender name:** `CCworld Consultating` ✓ (already correct).
- **Host:** `smtp.gmail.com` ✓  
- **Port:** `465` ✓  
- **Username:** Your **full email address** (e.g. `hello@ccworldconsult.com`).
- **Password:** A **Gmail App Password**, not your normal email password.  
  1. Turn on 2-Step Verification for that Google account.  
  2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).  
  3. Create an app password for “Mail” and paste it into the Password field.

Supabase’s warning appears because Gmail is meant for personal use; deliverability and limits can be lower than a transactional provider. For production, **Resend** (or similar) is usually better.

### If you use **Resend** (recommended for production)

- **Sender email:** `noreply@ccworldconsulting.com` (after the domain is verified in Resend).
- **Sender name:** `CCworld Consultating`
- **Host:** `smtp.resend.com`
- **Port:** `465` or `587`
- **Username:** `resend`
- **Password:** Your **Resend API key** (from Resend dashboard → API Keys).

---

## 2. Auth email templates (confirm email, reset password, etc.)

These are controlled by **Supabase**, not by your code.

1. In Supabase: **Authentication** → **Email Templates** (in the left sidebar).
2. Click the template you want to change (e.g. **Confirm signup**).
3. You’ll see:
   - **Subject** – e.g. `Confirm your email` or `Confirm your email – {{ .SiteURL }}`.
   - **Body (HTML)** – the actual design (layout, colors, text, button).
4. To use the nice design from this doc: copy the HTML block from the section below (“Confirm signup HTML body”), paste it into **Body (HTML)**, and save.

You can edit Subject and Body anytime in that screen; no code or deploy needed.

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
