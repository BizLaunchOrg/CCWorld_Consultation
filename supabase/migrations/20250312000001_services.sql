-- Services table and seed data
-- Creates the services table mirroring the Service type and seeds all services

-- =============================================================================
-- SERVICES (compliance services; admin CRUD)
-- =============================================================================
-- Drop and recreate table if exists (for clean re-run)
drop table if exists public.services cascade;

create table if not exists public.services (
  id text primary key,
  title text not null,
  slug text not null unique,
  tagline text not null,
  summary text not null,
  categories text[] not null default '{}',
  outcomes text[] not null default '{}',
  duration_label text not null,
  level text not null check (level in ('Foundation', 'Build', 'Advanced', 'Managed')),
  icon text not null default 'design_services',
  published boolean not null default false,
  sort_order integer,
  content_sections jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- Drop trigger if exists to recreate (in case of re-run)
drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create index if not exists idx_services_slug on public.services(slug);
create index if not exists idx_services_published on public.services(published);
create index if not exists idx_services_sort_order on public.services(sort_order);

-- =============================================================================
-- SEED SERVICES
-- =============================================================================
-- Seed all services from SERVICES_LIST (src/data/services.ts)
-- Safe to run multiple times: uses insert on conflict do update

insert into public.services (
  id, title, slug, tagline, summary, categories, outcomes,
  duration_label, level, icon, published, sort_order, updated_at
)
values
  (
    'svc-1',
    'Compliance Department Build-out',
    'compliance-department-buildout',
    'Equipping and building an effective compliance function.',
    'Building a strong compliance department requires a structured approach that combines governance, people, processes, technology, culture, and monitoring. We help entities build their compliance unit from day one till perfection and appear for them as and when required.',
    array['Governance', 'People', 'Policies', 'Processes', 'Technology', 'Culture', 'Monitoring', 'Regulatory'],
    array['Board-approved charter + risk appetite', 'Policy suite + process maps', 'Monitoring/testing + reporting cadence'],
    '8–12 weeks',
    'Build',
    'architecture',
    true,
    1,
    '2025-02-28T10:00:00Z'
  ),
  (
    'svc-2',
    'Background Check',
    'background-check',
    'Verify integrity, credibility, and compliance of individuals and entities.',
    'We provide comprehensive Background Check services to help organizations verify the integrity, credibility, and compliance of individuals and entities. Our solutions support risk-based due diligence, ensuring that clients can make informed decisions while mitigating exposure to fraud, financial crime, and regulatory risk.',
    array['Policies', 'Processes', 'Monitoring', 'Regulatory'],
    array['Identity verification (individuals and corporate entities)', 'Sanctions and watchlist screening (OFAC, UN, NIGSAC, and other regulatory lists)', 'Criminal and legal record checks', 'Financial and credit assessments', 'Employment and reference verification'],
    'As required',
    'Foundation',
    'person_search',
    true,
    2,
    '2025-03-05T10:00:00Z'
  ),
  (
    'svc-3',
    'AML/CFT Program Design',
    'aml-cft-program-design',
    'Risk-based controls that stand up in exams.',
    'We build your AML/CFT policy suite, STR/SAR readiness, escalation workflows, monitoring design, and testing plan — aligned to your risk profile.',
    array['Policies', 'Processes', 'Monitoring', 'Regulatory'],
    array['AML/CFT policy suite', 'STR/SAR readiness workflow', 'Monitoring + testing plan'],
    '4–8 weeks',
    'Advanced',
    'warning',
    true,
    3,
    '2025-02-26T09:00:00Z'
  ),
  (
    'svc-4',
    'Sanctions & PEP Screening Program',
    'sanctions-pep-screening-program',
    'Screening governance, match handling, audit trails.',
    'We design sanctions/PEP screening procedures, match resolution playbooks, list governance, escalation thresholds, and evidence logs for audit defense.',
    array['Policies', 'Processes', 'Technology', 'Monitoring'],
    array['Screening SOPs + match handling', 'Escalation thresholds', 'Audit-ready evidence logging'],
    '3–6 weeks',
    'Advanced',
    'shield',
    true,
    4,
    '2025-02-25T11:00:00Z'
  ),
  (
    'svc-5',
    'Compliance Monitoring & Testing',
    'compliance-monitoring-testing',
    'Ongoing assurance, thematic reviews, KPIs.',
    'We set up monitoring programs, thematic reviews, testing cadence, issue tracking, remediation workflow, and board-ready dashboards & reports.',
    array['Monitoring', 'Processes', 'Regulatory'],
    array['Monitoring program + thematic reviews', 'Testing plan + remediation workflow', 'Dashboards + board reporting templates'],
    '3–6 weeks',
    'Advanced',
    'fact_check',
    true,
    5,
    '2025-02-24T10:00:00Z'
  ),
  (
    'svc-6',
    'Regulatory Reporting & Exam Readiness',
    'regulatory-reporting-exam-readiness',
    'Returns, filings, query response, evidence pack.',
    'We structure regulatory returns, define reporting owners and timelines, and build your evidence library so exams stop feeling like emergencies.',
    array['Regulatory', 'Processes', 'Monitoring'],
    array['Returns calendar + responsibilities', 'Exam readiness evidence pack', 'Query response playbook'],
    '2–5 weeks',
    'Foundation',
    'receipt_long',
    true,
    6,
    '2025-02-23T14:00:00Z'
  ),
  (
    'svc-7',
    'Training & Compliance Culture',
    'training-and-compliance-culture',
    'Induction, role-based training, attestations.',
    'We design your training calendar, role-based learning paths, board/senior leadership sessions, and culture campaigns with measurable completion evidence.',
    array['Culture', 'People'],
    array['Training calendar + role-based modules', 'Attestation workflow', 'Culture campaigns + reporting'],
    '2–4 weeks',
    'Foundation',
    'school',
    true,
    7,
    '2025-02-22T09:00:00Z'
  ),
  (
    'svc-8',
    'RegTech Integration & Dashboards',
    'regtech-integration-and-dashboards',
    'Tooling roadmap, integration map, KPIs.',
    'We plan and architect compliance tooling — KYC/CDD, transaction monitoring, screening, case management, dashboards — with audit logging and control evidence.',
    array['Technology', 'Processes', 'Monitoring'],
    array['Integration roadmap + data flow', 'KPI dashboards definition', 'Audit logging + evidence design'],
    '3–7 weeks',
    'Advanced',
    'hub',
    true,
    8,
    '2025-02-21T11:00:00Z'
  ),
  (
    'svc-9',
    'Compliance Risk Assessment (CRA)',
    'compliance-risk-assessment-cra',
    'Annual risk posture + prioritized controls.',
    'We run an institutional CRA, score risk drivers, map obligations, and deliver a prioritized roadmap with quick wins, owners, timelines, and metrics.',
    array['Continuous Improvement', 'Governance', 'Monitoring'],
    array['Risk scoring model + findings', 'Prioritized roadmap', 'Board-ready report pack'],
    '2–4 weeks',
    'Foundation',
    'analytics',
    true,
    9,
    '2025-02-20T10:00:00Z'
  ),
  (
    'svc-10',
    'Managed Compliance Retainer',
    'managed-compliance-retainer',
    'Ongoing support after setup.',
    'Monthly/quarterly managed compliance support including monitoring oversight, reporting, thematic reviews, regulatory updates, and continuous tuning of controls.',
    array['Monitoring', 'Regulatory', 'Continuous Improvement', 'Culture'],
    array['Continuous assurance cadence', 'Regulatory horizon scanning', 'Ongoing dashboards + board reporting'],
    'Monthly / Quarterly',
    'Managed',
    'support_agent',
    true,
    10,
    '2025-02-19T14:00:00Z'
  ),
  (
    'svc-11',
    'AML/CFT/CPF Monitoring & Reporting Solutions',
    'aml-cft-cpf-monitoring-reporting',
    'End-to-end monitoring, reporting, and compliance documentation.',
    'We provide AML/CFT/CPF Monitoring and Reporting solutions including AML/CFT/CPF compliance consulting, independent audit and testing, and AML/CFT/CPF compliance manual compilation. These services ultimately aim to make your organization fully regulatory compliant and exam-ready.',
    array['Monitoring', 'Regulatory', 'Policies', 'Processes'],
    array['Risk-based AML/CFT/CPF monitoring framework and reporting calendar', 'Independent audit/testing with practical remediation roadmap', 'Comprehensive AML/CFT/CPF compliance manual and staff KYC handbook', 'Clear documentation to evidence compliance to regulators and auditors'],
    '4–8 weeks',
    'Advanced',
    'monitor_heart',
    true,
    11,
    '2026-03-10T10:00:00Z'
  ),
  (
    'svc-12',
    'AML/CFT/CPF Compliance Manual Compilation',
    'aml-cft-cpf-compliance-manual-compilation',
    'Statutory-compliant manuals and KYC handbooks for reporting entities.',
    'In line with the Money Laundering (Prohibition) Act of 2011 (as amended), every financial institution and Designated Non-Financial Institution is expected to maintain a comprehensive AML/CFT/CPF compliance program and written manuals. We help you develop AML/CFT/CPF compliance manuals, KYC handbooks, and documented programs that satisfy NFIU and SCUML expectations.',
    array['Policies', 'Regulatory', 'Governance', 'Processes'],
    array['Institution-specific AML/CFT/CPF compliance manual', 'Staff KYC handbook tailored to your products and channels', 'Documented policies, programs, processes, and procedures', 'Alignment with NFIU and SCUML requirements for reporting entities'],
    '3–6 weeks',
    'Build',
    'menu_book',
    true,
    12,
    '2026-03-10T10:00:00Z'
  ),
  (
    'svc-lic-pssp',
    'PSSP License Advisory',
    'pssp',
    'Payment Solution Service Provider licensing support.',
    'End-to-end advisory for Payment Solution Service Provider (PSSP) licensing: corporate and capital requirements, documentation, compliance framework, and engagement support.',
    array['Licensing', 'Regulatory', 'Governance', 'Policies'],
    array['Document pack aligned to PSSP framework', 'Gap review and readiness roadmap', 'Testing and compliance framework', 'Engagement and submission support'],
    'Advisory',
    'Build',
    'payments',
    true,
    50,
    '2025-03-03T10:00:00Z'
  ),
  (
    'svc-lic-ptsp',
    'PTSP License Advisory',
    'ptsp',
    'Payment Terminal Service Provider licensing support.',
    'Advisory for Payment Terminal Service Provider (PTSP) licensing: corporate and legal eligibility, capital and escrow, documentary requirements, fees, and compliance preparedness.',
    array['Licensing', 'Regulatory', 'Governance', 'Technology'],
    array['Eligibility and documentary checklist', 'Capital and escrow structuring', 'Compliance and operational readiness pack', 'Approval process and renewal support'],
    'Advisory',
    'Build',
    'point_of_sale',
    true,
    51,
    '2025-03-03T10:00:00Z'
  ),
  (
    'svc-lic-sandbox',
    'Regulatory Sandbox Support',
    'sandbox',
    'Regulatory sandbox participation support.',
    'End-to-end support for Regulatory Sandbox applications: eligibility, product documentation, risk and compliance framework, testing plan, technology and security, and reporting.',
    array['Licensing', 'Regulatory', 'Governance', 'Technology'],
    array['Eligibility and application pack', 'Product/solution and risk documentation', 'Testing plan and KPIs', 'Reporting and post-sandbox roadmap'],
    'Advisory',
    'Advanced',
    'science',
    true,
    52,
    '2025-03-03T10:00:00Z'
  )
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  summary = excluded.summary,
  categories = excluded.categories,
  outcomes = excluded.outcomes,
  duration_label = excluded.duration_label,
  level = excluded.level,
  icon = excluded.icon,
  published = excluded.published,
  sort_order = excluded.sort_order,
  updated_at = excluded.updated_at;
