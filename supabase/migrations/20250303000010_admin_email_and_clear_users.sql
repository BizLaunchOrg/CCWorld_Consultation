-- 1) Set admin email to ccworldconsulting@gmail.com: new signups with this email get role 'admin'
--    Set VITE_ADMIN_ALLOWED_EMAILS=ccworldconsulting@gmail.com in .env to restrict admin to this email only.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
declare
  user_role text := 'client';
begin
  if lower(trim(new.email)) = 'ccworldconsulting@gmail.com' then
    user_role := 'admin';
  end if;
  insert into public.profiles (id, role, name, email)
  values (
    new.id,
    user_role,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.email
  );
  return new;
end;
$$;

-- 2) Clear all users (profiles). Admin will be re-created below or on next sign-in.
delete from public.profiles;

-- 3) Re-create admin profile for ccworldconsulting@gmail.com if they already exist in auth.users
insert into public.profiles (id, role, name, email)
select
  id,
  'admin',
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', ''),
  email
from auth.users
where lower(trim(email)) = 'ccworldconsulting@gmail.com'
on conflict (id) do update set role = 'admin', email = excluded.email, name = excluded.name;
