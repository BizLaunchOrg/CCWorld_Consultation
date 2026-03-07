-- Contact Us form submissions: stored in request trail; send_to maps to one of 3 emails.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  send_to text not null check (send_to in ('general', 'company', 'opeyemi')),
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_submissions_created_at on public.contact_submissions(created_at desc);
create index if not exists idx_contact_submissions_send_to on public.contact_submissions(send_to);

alter table public.contact_submissions enable row level security;

-- Anyone can submit (anon)
create policy "contact_submissions_insert_anon" on public.contact_submissions
  for insert with check (true);

-- Only admin can read
create policy "contact_submissions_select_admin" on public.contact_submissions
  for select using (public.get_my_role() = 'admin');

grant insert on public.contact_submissions to anon, authenticated;
grant select on public.contact_submissions to authenticated;
grant all on public.contact_submissions to service_role;
