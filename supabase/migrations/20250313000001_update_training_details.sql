-- Migration: Update Compliance Training with proper training details
-- Run this in Supabase SQL Editor to update the training product with complete training-specific details

-- Update the training product with proper training details (not service details)
UPDATE public.training_products 
SET 
  name = 'Compliance Training',
  summary = 'We design your training calendar, role-based learning paths, board/senior leadership sessions, and culture campaigns with measurable completion evidence.',
  tagline = 'Induction, role-based training, attestations.',
  benefits = '["Training calendar + role-based modules","Attestation workflow","Culture campaigns + reporting"]'::jsonb,
  who_its_for = 'Organizations that need structured induction programs, role-based compliance training, and culture-building initiatives with audit-ready evidence.',
  modules = '["Training needs assessment and calendar design","Induction programs for new hires","Role-based compliance modules","Board and leadership sessions","Culture campaigns and attestation workflows"]'::jsonb,
  delivery_format = 'Hybrid - online and/or onsite. Flexible scheduling to fit your organizational calendar.',
  duration_label = '2–4 weeks',
  category = 'training',
  icon = 'school',
  updated_at = now()
WHERE slug = 'training-and-compliance-culture';

-- Also update the AML/CFT/CPF Intermediate Course with the correct description
UPDATE public.training_products 
SET 
  summary = 'The intermediate course provides deeper exposure to emerging AML/CFT/CPF risks, regulatory expectations, and practical control enhancements for middle level staff and senior/executive management.',
  updated_at = now()
WHERE slug = 'aml-cft-cpf-intermediate-course';

-- Verify the updates
SELECT 
  name, 
  slug, 
  summary, 
  tagline, 
  benefits, 
  duration_label, 
  who_its_for,
  delivery_format
FROM public.training_products 
WHERE slug IN ('training-and-compliance-culture', 'aml-cft-cpf-intermediate-course')
ORDER BY slug;
