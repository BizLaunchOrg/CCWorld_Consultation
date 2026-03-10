# Email when the admin has a new unread chat message

The **admin** gets one email when someone sends a message **only if they haven’t opened that conversation yet**. Uses **Brevo**.

## 1. Get a Brevo API key (free)

1. Sign up at [brevo.com](https://www.brevo.com) (formerly Sendinblue).
2. Go to **Settings** → **SMTP & API** → **API Keys** → **Generate a new API key**. Copy it.
3. Add your sender email in Brevo: **Settings** → **Senders & IP** → add **hello@ccworldconsult.com** and verify it (they send a code to that inbox). That way the “From” of the notification email is your address.

## 2. Put the key in Supabase

In Supabase Dashboard: **Project Settings** → **Edge Functions** → **Secrets** → Add:

- Name: `BREVO_API_KEY`
- Value: your Brevo API key

Or in terminal:

```bash
supabase secrets set BREVO_API_KEY=your_brevo_api_key_here
```

## 3. Deploy the function

```bash
supabase functions deploy notify-new-message
```

## 4. Add a Database Webhook

1. In **Supabase Dashboard** go to **Database** → **Webhooks** (or **Integrations** → **Webhooks**).
2. **Create a new webhook**.
3. Set:
   - **Name:** e.g. `Notify new chat message`
   - **Table:** `chat_messages`
   - **Events:** tick **Insert**
   - **URL:** `https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-new-message`  
     (Replace `YOUR_PROJECT_REF` with your project ref from **Project Settings** → **General**.)
4. Save.

After this, every new user message in the chat will trigger the function and send one email to hello@ccworldconsult.com.
