# Set up email notifications (for CC World Consulting)

When someone sends a message on the website chat, you get one email so you don’t miss it — **only if you haven’t opened that conversation yet**.

You need to set up **Brevo** (free) once. Follow these steps.

---

## 1. Create a Brevo account

1. Go to **[brevo.com](https://www.brevo.com)** and sign up (free).
2. Confirm your email.

---

## 2. Add and verify your sender email

1. In Brevo, go to **Settings** (gear icon) → **Senders, domains & dedicated IPs** → **Senders**.
2. Click **Add sender**.
3. Enter:
   - **Email:** your company email (e.g. **hello@ccworldconsult.com**)
   - **Name:** e.g. **CC World Consulting**
4. Save. Brevo will send a verification code to that email.
5. Open that email and confirm. The sender must show **Verified** (green) before you can send.

---

## 3. Get your API key

1. In Brevo, go to **Settings** → **SMTP & API** → **API Keys**.
2. Click **Generate a new API key**. Give it a name (e.g. “Website chat”).
3. Copy the key (it starts with something like `xkeysib-...`). Keep it somewhere safe.

---

## 4. Add the key in Supabase

Someone with access to the project’s Supabase Dashboard needs to do this once:

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** → your project.
2. Go to **Project Settings** (gear) → **Edge Functions** → **Secrets**.
3. Click **Add new secret**:
   - **Name:** `BREVO_API_KEY`
   - **Value:** paste the API key from step 3.
4. Save.

---

## 5. Deploy the function (one time)

If the function is not deployed yet, run this in a terminal (from the project folder):

```bash
supabase login
supabase link
supabase functions deploy notify-new-message
```

The **Database Webhook** should already be set (table `chat_messages`, event **Insert**, pointing to the function URL). If not, it needs to be added in Supabase → **Database** → **Webhooks**.

---

## Done

After this, when someone sends a message on the site and you haven’t opened that chat yet, you’ll get one email at your company address. No need for the developer to set up Brevo for you — you can do it with this guide.
