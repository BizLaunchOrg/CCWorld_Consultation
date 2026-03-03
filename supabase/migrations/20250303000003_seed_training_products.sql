-- Seed training_products with demo offerings (same as original DEMO_TRAININGS)
-- Run after initial_schema and fix_rls_recursion. Safe to run multiple times: uses insert on conflict do nothing.

insert into public.training_products (name, slug, amount, active, summary)
values
  (
    'Compliance Culture Training',
    'compliance-culture-training',
    250000,
    true,
    'Structured programs to embed compliance awareness, role-based learning paths, and measurable completion evidence across your organization.'
  ),
  (
    'Compliance Landscape Training',
    'compliance-landscape-training',
    320000,
    true,
    'Deep-dive into payment, securities, and sector-specific requirements, obligations mapping, and how to stay ahead of regulatory changes.'
  ),
  (
    'Statutory Training',
    'statutory-training',
    180000,
    true,
    'Curriculum aligned to statutory and regulatory training requirements, with evidence of completion for audits and exams.'
  ),
  (
    'Outsourcing Internal Training',
    'outsourcing-internal-training',
    450000,
    true,
    'We design and deliver your internal training calendar, role-based modules, and reporting so you focus on operations while staying compliant.'
  ),
  (
    'Risk Review & Recommendations',
    'risk-review-and-recommendations',
    550000,
    true,
    'We conduct an independent risk review of your compliance posture, control environment, and key processes, then deliver clear recommendations and a prioritized action plan.'
  ),
  (
    'Compliance Health Check',
    'compliance-health-check',
    380000,
    true,
    'A focused advisory engagement to assess the health of your compliance program, identify quick wins, and flag areas that need deeper work or training.'
  )
on conflict (slug) do update set
  name = excluded.name,
  amount = excluded.amount,
  active = excluded.active,
  summary = excluded.summary,
  updated_at = now();
