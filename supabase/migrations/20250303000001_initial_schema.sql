-- CCWORLD Consultation: initial schema, triggers, RLS
-- Run against your Supabase project (Dashboard SQL or supabase db push)

-- =============================================================================
-- PROFILES (extends auth.users; role for admin guard)
-- =============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'admin')),
  name text,
  avatar_url text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger: create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, name, email)
  values (
    new.id,
    'client',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at trigger for profiles
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- =============================================================================
-- CONSULTATIONS (booking: topic, scheduled_at, details, status)
-- =============================================================================
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  scheduled_at timestamptz not null,
  details jsonb not null default '{}',
  status text not null default 'new' check (status in ('new', 'in_review', 'scheduled', 'completed', 'cancelled')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Prevent duplicate booking same user same slot (one consultation per user per scheduled_at)
  unique (user_id, scheduled_at)
);

create trigger consultations_updated_at
  before update on public.consultations
  for each row execute function public.set_updated_at();

create index if not exists idx_consultations_user_id on public.consultations(user_id);
create index if not exists idx_consultations_scheduled_at on public.consultations(scheduled_at);
create index if not exists idx_consultations_status on public.consultations(status);

-- =============================================================================
-- TRAINING_PRODUCTS (name, amount, active; admin CRUD)
-- =============================================================================
create table if not exists public.training_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  amount numeric not null check (amount >= 0),
  active boolean not null default true,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger training_products_updated_at
  before update on public.training_products
  for each row execute function public.set_updated_at();

-- =============================================================================
-- TRAINING_ORDERS (payment via Seerbit; amount server-controlled)
-- =============================================================================
create table if not exists public.training_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  training_id uuid not null references public.training_products(id) on delete restrict,
  amount numeric not null check (amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'expired')),
  provider_reference text,
  checkout_url text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger training_orders_updated_at
  before update on public.training_orders
  for each row execute function public.set_updated_at();

create index if not exists idx_training_orders_user_id on public.training_orders(user_id);
create index if not exists idx_training_orders_provider_reference on public.training_orders(provider_reference);
create index if not exists idx_training_orders_status on public.training_orders(status);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.consultations enable row level security;
alter table public.training_products enable row level security;
alter table public.training_orders enable row level security;

-- Profiles: user sees own; admin sees all
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Only admin can update role (promote/demote)
create policy "profiles_update_role_admin" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Consultations: user own rows; admin all
create policy "consultations_select_own" on public.consultations
  for select using (auth.uid() = user_id);

create policy "consultations_select_admin" on public.consultations
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "consultations_insert_own" on public.consultations
  for insert with check (auth.uid() = user_id);

create policy "consultations_update_admin" on public.consultations
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Training products: everyone can read active; admin full CRUD
create policy "training_products_select_active" on public.training_products
  for select using (active = true);

create policy "training_products_all_admin" on public.training_products
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Training orders: user own; admin all. No direct insert from client (only via Edge Function)
create policy "training_orders_select_own" on public.training_orders
  for select using (auth.uid() = user_id);

create policy "training_orders_select_admin" on public.training_orders
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Service role / Edge Function will insert/update training_orders (no client insert policy)
-- We allow service role to bypass RLS; Edge Function uses service role key.

-- =============================================================================
-- GRANT USAGE (optional: ensure anon/authenticated can read what RLS allows)
-- =============================================================================
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.consultations to authenticated;
grant select on public.training_products to anon, authenticated;
grant select on public.training_orders to authenticated;
grant all on public.training_products to service_role;
grant all on public.training_orders to service_role;
grant all on public.consultations to service_role;
grant all on public.profiles to service_role;
