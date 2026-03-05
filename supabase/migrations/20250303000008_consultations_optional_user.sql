-- Allow consultation requests without login: user_id nullable; anon can insert.
alter table public.consultations
  alter column user_id drop not null;

-- Allow anonymous insert (guest consultation request)
drop policy if exists "consultations_insert_own" on public.consultations;
create policy "consultations_insert_own" on public.consultations
  for insert with check (user_id = auth.uid() or user_id is null);

-- Allow anon to insert (for guest consultation requests)
grant insert on public.consultations to anon;

-- Allow select: own row or admin (guests don't need to read back)
drop policy if exists "consultations_select" on public.consultations;
create policy "consultations_select" on public.consultations
  for select using (
    auth.uid() = user_id or public.get_my_role() = 'admin'
  );
