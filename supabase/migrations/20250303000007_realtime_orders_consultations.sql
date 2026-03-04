-- Add training_orders and consultations to Realtime so admin notification bell can show new orders and consultations without refresh.
-- Run this after 20250303000006. If a table is already in the publication, the statement will error; you can run the two lines separately if needed.

alter publication supabase_realtime add table public.training_orders;
alter publication supabase_realtime add table public.consultations;
