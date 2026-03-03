# CCWORLD Consultation – manual test checklist

Use this to verify the full flow after deployment and Supabase/Seerbit setup.

## Prerequisites

- Supabase project created; migrations applied (`supabase/migrations/20250303000001_initial_schema.sql`).
- Auth: Email confirmation enabled; Site URL / Redirect URLs set to `https://www.ccworldconsultation.com` (or your dev URL).
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
- [ ] Admin routes: logged-out or client-role user is redirected to `/admin/login`.
- [ ] RLS: client cannot read other users’ consultations or orders; cannot insert into `training_orders` (only Edge Function can).

---

**Quick reference**

- Signup → confirm → book consultation → admin changes status → user sees update.
- Add training product in admin → user pays via “Pay now” → redirect to Seerbit → webhook updates order → admin and user see paid status.
