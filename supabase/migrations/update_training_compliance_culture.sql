-- Run this in Supabase SQL Editor to update Training & Compliance Culture

UPDATE public.training_products 
SET 
  summary = 'We design your training calendar, role-based learning paths, board/senior leadership sessions, and culture campaigns with measurable completion evidence.',
  tagline = 'Induction, role-based training, attestations.',
  benefits = '["Training calendar + role-based modules","Attestation workflow","Culture campaigns + reporting"]'::jsonb,
  duration_label = '2–4 weeks',
  who_its_for = NULL,
  modules = '[]'::jsonb,
  delivery_format = NULL,
  updated_at = now()
WHERE slug = 'training-and-compliance-culture';

-- Verify the update
SELECT name, summary, tagline, benefits, duration_label, who_its_for, delivery_format
FROM public.training_products 
WHERE slug = 'training-and-compliance-culture';
