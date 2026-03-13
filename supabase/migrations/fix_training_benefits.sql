-- Run this SQL in Supabase SQL Editor to update the Training & Compliance Culture

UPDATE public.training_products 
SET 
  benefits = '["Training calendar + role-based modules","Attestation workflow","Culture campaigns + reporting"]'::jsonb,
  updated_at = now()
WHERE slug = 'training-and-compliance-culture';

-- Verify the update
SELECT name, benefits, summary, tagline, duration_label 
FROM public.training_products 
WHERE slug = 'training-and-compliance-culture';
