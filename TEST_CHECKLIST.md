# CCWORLD Consultation – manual test checklist

Use this to verify the full flow after deployment and Supabase setup.

## Prerequisites

- Supabase project created; migrations applied (including `20250303000006_chat_conversations_messages.sql` for live chat).
- Auth: Site URL / Redirect URLs set to `https://www.ccworldconsultation.com` (or your dev URL). For **admin Google sign-in**, add `https://www.ccworldconsultation.com/admin` (and e.g. `http://localhost:5173/admin` for local dev) to **Redirect URLs** so OAuth can redirect back to the admin panel.
- To **make a user an admin**: Supabase Dashboard → **Table Editor** → **profiles** → find the row (match by email) → set **role** to `admin`. Add that email to `VITE_ADMIN_ALLOWED_EMAILS` in your env if you use the allow list.

---

## 1. Consultation (no login required)

- [ ] Go to **Consultation**; fill step 1 (org details + date/time), step 2 (your details), step 3 (review).
- [ ] Submit; see “Request received” and no errors.
- [ ] Try booking again for the **same date/time** (guest); expect error “You already have a consultation booked at this date and time” if applicable.

## 2. Admin: consultations and status

- [ ] In Supabase Dashboard or Admin → **Users**, ensure your test account has `profiles.role` = `admin` (or sign in as an admin account).
- [ ] Open **Admin** → **Consultations**; see the consultation from step 1.
- [ ] Open it; change status to **Scheduled** (or **In review**); save.

## 3. Security checks

- [ ] Admin routes: visiting `/admin` when not an admin redirects to **home** (not the login page). Allowed admins use **`/admin/login`** to sign in (or **`/admin/login?t=YourSecret`** if `VITE_ADMIN_LOGIN_SECRET` is set).
- [ ] If **VITE_ADMIN_LOGIN_SECRET** is set in env, `/admin/login` without `?t=SECRET` redirects to home; only the secret URL shows the login form.
- [ ] RLS: client cannot read other users’ consultations.

## 4. Live chat (client ↔ admin, no refresh)

- [ ] Apply migration `20250303000006_chat_conversations_messages.sql` so `chat_conversations` and `chat_messages` exist. For **admin notifications** (new consultations), also run `20250303000007_realtime_orders_consultations.sql` to add `consultations` to the Realtime publication.
- [ ] On the **website**, open **Live Chat** (floating button), send a message.
- [ ] In **Admin** → **Messages**, open the conversation; you should see the client’s message. Reply from admin; the **client’s chat** should show the reply **without refreshing**.
- [ ] Client sends another message; **admin** sees it **without refreshing**.

---

**Quick reference**

- Consultation: guest or user can submit; admin sees requests under Admin → Consultations.
- Live chat: client uses widget, admin uses Admin → Messages; messages sync in real time via Supabase Realtime.
- No payment or signup on the website; engagements are handled outside the site.
