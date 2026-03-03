-- Allow joining training_orders to profiles so admin can show customer name/email.
-- training_orders.user_id and profiles.id both refer to the same user.
alter table public.training_orders
  add constraint training_orders_user_id_profiles_fkey
  foreign key (user_id) references public.profiles(id)
  on delete cascade;
