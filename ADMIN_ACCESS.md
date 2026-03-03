# How to access Admin

Admin routes (`/admin`, `/admin/users`, etc.) are protected by **role**: only users whose `profiles.role` is `'admin'` can access.

## Make your account an admin

1. **Sign up / sign in** on the site with the account you want to use as admin.
2. Open **Supabase Dashboard** → your project → **Table Editor** → **profiles**.
3. Find the row for your user (match `id` to your user id, or find by `email`).
4. Set **role** from `client` to **`admin`** and save.
5. Refresh the site (or sign out and sign in again).
6. Go to **https://www.ccworldconsultation.com/admin** (or `/admin`). You should see the admin dashboard. If not, you’ll be sent to `/admin/login` — sign in with the same account you made admin.

You can also promote users from **Admin → Users** once you’re logged in as an admin (e.g. after step 4).
