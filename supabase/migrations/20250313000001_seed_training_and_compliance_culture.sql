-- Seed Training & Compliance Culture training product
insert into public.training_products (
  name, slug, amount, active, summary, tagline, category, who_its_for, modules, benefits, delivery_format, duration_label, icon, faq
)
values (
  'Training & Compliance Culture',
  'training-and-compliance-culture',
  250000,
  true,
  'We design your training calendar, role-based learning paths, board/senior leadership sessions, and culture campaigns with measurable completion evidence.',
  'Induction, role-based training, attestations.',
  'training',
  'Organizations that need structured induction programs, role-based compliance training, and culture-building initiatives with audit-ready evidence.',
  '["Training needs assessment and calendar design","Induction programs for new hires","Role-based compliance modules","Board and leadership sessions","Culture campaigns and attestation workflows"]'::jsonb,
  '["Training calendar + role-based modules","Attestation workflow","Culture campaigns + reporting"]'::jsonb,
  'Online, onsite, or hybrid. Typically 2–4 sessions over 2–4 weeks.',
  '2–4 weeks',
  'school',
  '[]'::jsonb
)
on conflict (slug) do update set
  name = excluded.name,
  amount = excluded.amount,
  active = excluded.active,
  summary = excluded.summary,
  tagline = excluded.tagline,
  category = excluded.category,
  who_its_for = excluded.who_its_for,
  modules = excluded.modules,
  benefits = excluded.benefits,
  delivery_format = excluded.delivery_format,
  duration_label = excluded.duration_label,
  icon = excluded.icon,
  faq = excluded.faq,
  updated_at = now();
