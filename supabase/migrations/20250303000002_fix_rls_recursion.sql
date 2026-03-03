-- Fix: "infinite recursion detected in policy for relation profiles"
-- Policies that did SELECT on profiles to check admin role caused recursion.
-- Use a SECURITY DEFINER function that bypasses RLS to get current user's role.

-- Helper: get current user's role (bypasses RLS)
create or replace function public.get_my_role()
returns text language sql security definer set search_path = public stable
as $$
  select role from public.profiles where id = auth.uid() limit 1;
$$;

-- Drop old policies that reference profiles (causing recursion)
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_select_admin" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_update_role_admin" on public.profiles;
drop policy if exists "consultations_select_own" on public.consultations;
drop policy if exists "consultations_select_admin" on public.consultations;
drop policy if exists "consultations_insert_own" on public.consultations;
drop policy if exists "consultations_update_admin" on public.consultations;
drop policy if exists "training_products_select_active" on public.training_products;
drop policy if exists "training_products_all_admin" on public.training_products;
drop policy if exists "training_orders_select_own" on public.training_orders;
drop policy if exists "training_orders_select_admin" on public.training_orders;
-- Drop new-style names so this migration is re-runnable
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_update_admin" on public.profiles;
drop policy if exists "consultations_select" on public.consultations;
drop policy if exists "consultations_update_admin" on public.consultations;
drop policy if exists "training_products_select" on public.training_products;
drop policy if exists "training_orders_select" on public.training_orders;

-- Profiles: select own row OR if current user is admin select any
create policy "profiles_select" on public.profiles
  for select using (
    auth.uid() = id or public.get_my_role() = 'admin'
  );

-- Profiles: update own row (name, etc.)
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Profiles: admin can update any (for role promote/demote)
create policy "profiles_update_admin" on public.profiles
  for update using (public.get_my_role() = 'admin');

-- Consultations
create policy "consultations_select" on public.consultations
  for select using (
    auth.uid() = user_id or public.get_my_role() = 'admin'
  );
create policy "consultations_insert_own" on public.consultations
  for insert with check (auth.uid() = user_id);
create policy "consultations_update_admin" on public.consultations
  for update using (public.get_my_role() = 'admin');

-- Training products: everyone can read active; admin full CRUD
create policy "training_products_select" on public.training_products
  for select using (
    active = true or public.get_my_role() = 'admin'
  );
create policy "training_products_all_admin" on public.training_products
  for all using (public.get_my_role() = 'admin');

-- Training orders
create policy "training_orders_select" on public.training_orders
  for select using (
    auth.uid() = user_id or public.get_my_role() = 'admin'
  );
