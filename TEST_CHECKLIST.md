# CCWORLD Consultation – manual test checklist

Use this to verify the full flow after deployment and Supabase/Seerbit setup.

## Prerequisites

- Supabase project created; migrations applied (including `20250303000006_chat_conversations_messages.sql` for live chat).
- Auth: Email confirmation enabled; Site URL / Redirect URLs set to `https://www.ccworldconsultation.com` (or your dev URL). For **admin Google sign-in**, add `https://www.ccworldconsultation.com/admin` (and e.g. `http://localhost:5173/admin` for local dev) to **Redirect URLs** so OAuth can redirect back to the admin panel. Add **`/signup/success`** too (e.g. `https://www.ccworldconsultation.com/signup/success`) so after email confirmation and after Google signup users can land on the success page.
- **Google signup:** With “Sign in with Google”, users do **not** receive a separate confirmation email — Google has already verified the email, so Supabase signs them in immediately. This is normal. Using the same Gmail for SMTP (e.g. Resend/your app’s “from” address) is unrelated; that’s for sending emails from your app. To **make a Google-signed-up user an admin**: Supabase Dashboard → **Table Editor** → **profiles** → find the row for that user (match by email) → set **role** to `admin`. Also add that email to `VITE_ADMIN_ALLOWED_EMAILS` in your env if you use the allow list.
- Payment success URL (`/training/payment/success`) is where **Seerbit** redirects after payment; you do **not** need to add it to Supabase Redirect URLs (that list is for Auth/OAuth only).
- Edge Functions deployed: `seerbit-init`, `seerbit-webhook`. Deploy **seerbit-init** with `--no-verify-jwt` to avoid gateway 401 Invalid JWT (e.g. with ES256 tokens). Secrets: `SEERBIT_PUBLIC_KEY`, `SEERBIT_SECRET_KEY`, `SITE_URL`, `SUPABASE_ANON_KEY`.
- Seerbit webhook URL configured to your `seerbit-webhook` function URL (deploy webhook with `--no-verify-jwt`).
- Optional: add `RESEND_API_KEY` (and optionally `RESEND_FROM`, `SITE_NAME`) to **seerbit-webhook** secrets to send “We’ve received your payment” emails. See `docs/EMAIL_TEMPLATES.md`.

---

## 1. Signup → Confirm email

- [ ] Open site → **Create account**.
- [ ] Sign up with email/password (or Continue with Google).
- [ ] See “Account created! Check your email…” (or redirect if Google).
- [ ] Confirm email via link (if email confirmation is on).
- [ ] Log in; banner “Confirm your email” should disappear after confirmation.

## 2. Booking a consultation

- [ ] Log in (and confirm email if required).
- [ ] Go to **Consultation**; fill step 1 (org details + date/time), step 2 (your details), step 3 (review).
- [ ] Submit; see “Request received” and no errors.
- [ ] Try booking again for the **same user and same date/time**; expect error “You already have a consultation booked at this date and time.”

## 3. Admin: status change → user sees update

- [ ] In Supabase Dashboard or Admin → **Users**, promote the test user to **admin** (set `profiles.role` to `admin`), or sign in as an admin account.
- [ ] Open **Admin** → **Consultations**; see the consultation from step 2.
- [ ] Open it; change status to **Scheduled** (or **In review**); save.
- [ ] On the **website** (same or other tab), open a page that shows the user’s consultations (if you add “My consultations”) or re-check the consultation list; the updated status should be reflected (same Supabase tables).

## 4. Training payment init → redirect

- [ ] In Admin → **Trainings**, add a training product (name, slug, amount, active).
- [ ] On the website, go to **Training**; see the new product.
- [ ] Open it → **Proceed to Checkout**.
- [ ] Log in and ensure email is confirmed; click **Pay Now**.
- [ ] Expect redirect to Seerbit checkout URL (no frontend error).
- [ ] Complete or cancel payment on Seerbit.
- [ ] After success, you are redirected to **Training payment success** page (“We’ve received your payment”, “We’ll get back to you shortly”). If Resend is configured, the customer receives a confirmation email.

## 5. Webhook → order status update

- [ ] After completing a test payment on Seerbit, ensure webhook is called (Seerbit dashboard or logs).
- [ ] In Supabase, check `training_orders`: the row for that payment should have `status = 'paid'` and `metadata` should contain the webhook payload.
- [ ] In Admin → **Orders**, the order should show as **paid**; user-facing “My orders” (if implemented) should show the same.

## 6. Security checks

- [ ] Seerbit **secret** key is only in Edge Function secrets / server env, never in frontend or `.env` committed to git.
- [ ] Admin routes: visiting `/admin` when not an admin redirects to **home** (not the login page). Allowed admins use **`/admin/login`** to sign in (or **`/admin/login?t=YourSecret`** if `VITE_ADMIN_LOGIN_SECRET` is set).
- [ ] If **VITE_ADMIN_LOGIN_SECRET** is set in env, `/admin/login` without `?t=SECRET` redirects to home; only the secret URL shows the login form. Use a long, random value and keep the full URL private (e.g. bookmark).
- [ ] RLS: client cannot read other users’ consultations or orders; cannot insert into `training_orders` (only Edge Function can).

## 7. Live chat (client ↔ admin, no refresh)

- [ ] Apply migration `20250303000006_chat_conversations_messages.sql` so `chat_conversations` and `chat_messages` exist. Realtime is enabled for `chat_messages` in the migration.
- [ ] On the **website**, open **Live Chat** (floating button), send a message. No fake “team member will get back to you” reply; messages are stored in Supabase.
- [ ] In **Admin** → **Messages**, open the conversation; you should see the client’s message. Reply from admin; the **client’s chat** should show the reply **without refreshing** (Supabase Realtime).
- [ ] Client sends another message; **admin** sees it **without refreshing**. Both sides get new messages in real time.

---

**Quick reference**

- Signup → confirm → book consultation → admin changes status → user sees update.
- Add training product in admin → user pays via “Pay now” → redirect to Seerbit → webhook updates order → admin and user see paid status.
- Live chat: client uses widget, admin uses Admin → Messages; messages sync in real time via Supabase Realtime.
