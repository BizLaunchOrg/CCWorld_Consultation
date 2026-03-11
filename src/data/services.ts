import type { Service } from '../types/service';

/** Single source of truth for services. Admin and public pages read from here. */
export const SERVICES_LIST: Service[] = [
  {
    id: 'svc-1',
    slug: 'compliance-department-buildout',
    icon: 'architecture',
    title: 'Compliance Department Build-out',
    tagline: 'Equipping and building an effective compliance function.',
    summary:
      'Building a strong compliance department requires a structured approach that combines governance, people, processes, technology, and culture. We help entities build their compliance unit from day one till perfection and appear for them as and when required.',
    categories: ['Governance', 'People', 'Policies', 'Processes', 'Technology', 'Culture', 'Monitoring', 'Regulatory'],
    outcomes: ['Board-approved charter + risk appetite', 'Policy suite + process maps', 'Monitoring/testing + reporting cadence'],
    duration_label: '8–12 weeks',
    level: 'Build',
    published: true,
    sort_order: 1,
    updated_at: '2025-02-28T10:00:00Z',
  },
  {
    id: 'svc-2',
    slug: 'background-check',
    icon: 'person_search',
    title: 'Background Check',
    tagline: 'Verify integrity, credibility, and compliance of individuals and entities.',
    summary:
      'We provide comprehensive Background Check services to help organizations verify the integrity, credibility, and compliance of individuals and entities. Our solutions support risk-based due diligence, ensuring that clients can make informed decisions while mitigating exposure to fraud, financial crime, and regulatory risk.',
    categories: ['Policies', 'Processes', 'Monitoring', 'Regulatory'],
    outcomes: [
      'Identity verification (individuals and corporate entities)',
      'Sanctions and watchlist screening (OFAC, UN, NIGSAC, and other regulatory lists)',
      'Criminal and legal record checks',
      'Financial and credit assessments',
      'Employment and reference verification',
    ],
    duration_label: 'As required',
    level: 'Foundation',
    published: true,
    sort_order: 2,
    updated_at: '2025-03-05T10:00:00Z',
  },
  {
    id: 'svc-3',
    slug: 'aml-cft-program-design',
    icon: 'warning',
    title: 'AML/CFT Program Design',
    tagline: 'Risk-based controls that stand up in exams.',
    summary:
      'We build your AML/CFT policy suite, STR/SAR readiness, escalation workflows, monitoring design, and testing plan — aligned to your risk profile.',
    categories: ['Policies', 'Processes', 'Monitoring', 'Regulatory'],
    outcomes: ['AML/CFT policy suite', 'STR/SAR readiness workflow', 'Monitoring + testing plan'],
    duration_label: '4–8 weeks',
    level: 'Advanced',
    published: true,
    sort_order: 3,
    updated_at: '2025-02-26T09:00:00Z',
  },
  {
    id: 'svc-11',
    slug: 'aml-cft-cpf-monitoring-reporting',
    icon: 'monitor_heart',
    title: 'AML/CFT/CPF Monitoring & Reporting Solutions',
    tagline: 'End-to-end monitoring, reporting, and compliance documentation.',
    summary:
      'We provide AML/CFT/CPF Monitoring and Reporting solutions including AML/CFT/CPF compliance consulting, independent audit and testing, and AML/CFT/CPF compliance manual compilation. These services ultimately aim to make your organization fully regulatory compliant and exam-ready.',
    categories: ['Monitoring', 'Regulatory', 'Policies', 'Processes'],
    outcomes: [
      'Risk-based AML/CFT/CPF monitoring framework and reporting calendar',
      'Independent audit/testing with practical remediation roadmap',
      'Comprehensive AML/CFT/CPF compliance manual and staff KYC handbook',
      'Clear documentation to evidence compliance to regulators and auditors',
    ],
    duration_label: '4–8 weeks',
    level: 'Advanced',
    published: true,
    sort_order: 11,
    updated_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'svc-12',
    slug: 'aml-cft-cpf-compliance-manual-compilation',
    icon: 'menu_book',
    title: 'AML/CFT/CPF Compliance Manual Compilation',
    tagline: 'Statutory-compliant manuals and KYC handbooks for reporting entities.',
    summary:
      'In line with the Money Laundering (Prohibition) Act of 2011 (as amended), every financial institution and Designated Non-Financial Institution is expected to maintain a comprehensive AML/CFT/CPF compliance program and written manuals. We help you develop AML/CFT/CPF compliance manuals, KYC handbooks, and documented programs that satisfy NFIU and SCUML expectations.',
    categories: ['Policies', 'Regulatory', 'Governance', 'Processes'],
    outcomes: [
      'Institution-specific AML/CFT/CPF compliance manual',
      'Staff KYC handbook tailored to your products and channels',
      'Documented policies, programs, processes, and procedures',
      'Alignment with NFIU and SCUML requirements for reporting entities',
    ],
    duration_label: '3–6 weeks',
    level: 'Build',
    published: true,
    sort_order: 12,
    updated_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'svc-4',
    slug: 'sanctions-pep-screening-program',
    icon: 'shield',
    title: 'Sanctions & PEP Screening Program',
    tagline: 'Screening governance, match handling, audit trails.',
    summary:
      'We design sanctions/PEP screening procedures, match resolution playbooks, list governance, escalation thresholds, and evidence logs for audit defense.',
    categories: ['Policies', 'Processes', 'Technology', 'Monitoring'],
    outcomes: ['Screening SOPs + match handling', 'Escalation thresholds', 'Audit-ready evidence logging'],
    duration_label: '3–6 weeks',
    level: 'Advanced',
    published: true,
    sort_order: 4,
    updated_at: '2025-02-25T11:00:00Z',
  },
  {
    id: 'svc-5',
    slug: 'compliance-monitoring-testing',
    icon: 'fact_check',
    title: 'Compliance Monitoring & Testing',
    tagline: 'Ongoing assurance, thematic reviews, KPIs.',
    summary:
      'We set up monitoring programs, thematic reviews, testing cadence, issue tracking, remediation workflow, and board-ready dashboards & reports.',
    categories: ['Monitoring', 'Processes', 'Regulatory'],
    outcomes: ['Monitoring program + thematic reviews', 'Testing plan + remediation workflow', 'Dashboards + board reporting templates'],
    duration_label: '3–6 weeks',
    level: 'Advanced',
    published: true,
    sort_order: 5,
    updated_at: '2025-02-24T10:00:00Z',
  },
  {
    id: 'svc-6',
    slug: 'regulatory-reporting-exam-readiness',
    icon: 'receipt_long',
    title: 'Regulatory Reporting & Exam Readiness',
    tagline: 'Returns, filings, query response, evidence pack.',
    summary:
      'We structure regulatory returns, define reporting owners and timelines, and build your evidence library so exams stop feeling like emergencies.',
    categories: ['Regulatory', 'Processes', 'Monitoring'],
    outcomes: ['Returns calendar + responsibilities', 'Exam readiness evidence pack', 'Query response playbook'],
    duration_label: '2–5 weeks',
    level: 'Foundation',
    published: true,
    sort_order: 6,
    updated_at: '2025-02-23T14:00:00Z',
  },
  {
    id: 'svc-7',
    slug: 'training-and-compliance-culture',
    icon: 'school',
    title: 'Training & Compliance Culture',
    tagline: 'Induction, role-based training, attestations.',
    summary:
      'We design your training calendar, role-based learning paths, board/senior leadership sessions, and culture campaigns with measurable completion evidence.',
    categories: ['Culture', 'People'],
    outcomes: ['Training calendar + role-based modules', 'Attestation workflow', 'Culture campaigns + reporting'],
    duration_label: '2–4 weeks',
    level: 'Foundation',
    published: true,
    sort_order: 7,
    updated_at: '2025-02-22T09:00:00Z',
  },
  {
    id: 'svc-8',
    slug: 'regtech-integration-and-dashboards',
    icon: 'hub',
    title: 'RegTech Integration & Dashboards',
    tagline: 'Tooling roadmap, integration map, KPIs.',
    summary:
      'We plan and architect compliance tooling — KYC/CDD, transaction monitoring, screening, case management, dashboards — with audit logging and control evidence.',
    categories: ['Technology', 'Processes', 'Monitoring'],
    outcomes: ['Integration roadmap + data flow', 'KPI dashboards definition', 'Audit logging + evidence design'],
    duration_label: '3–7 weeks',
    level: 'Advanced',
    published: true,
    sort_order: 8,
    updated_at: '2025-02-21T11:00:00Z',
  },
  {
    id: 'svc-9',
    slug: 'compliance-risk-assessment-cra',
    icon: 'analytics',
    title: 'Compliance Risk Assessment (CRA)',
    tagline: 'Annual risk posture + prioritized controls.',
    summary:
      'We run an institutional CRA, score risk drivers, map obligations, and deliver a prioritized roadmap with quick wins, owners, timelines, and metrics.',
    categories: ['Continuous Improvement', 'Governance', 'Monitoring'],
    outcomes: ['Risk scoring model + findings', 'Prioritized roadmap', 'Board-ready report pack'],
    duration_label: '2–4 weeks',
    level: 'Foundation',
    published: true,
    sort_order: 9,
    updated_at: '2025-02-20T10:00:00Z',
  },
  {
    id: 'svc-10',
    slug: 'managed-compliance-retainer',
    icon: 'support_agent',
    title: 'Managed Compliance Retainer',
    tagline: 'Ongoing support after setup.',
    summary:
      'Monthly/quarterly managed compliance support including monitoring oversight, reporting, thematic reviews, regulatory updates, and continuous tuning of controls.',
    categories: ['Monitoring', 'Regulatory', 'Continuous Improvement', 'Culture'],
    outcomes: ['Continuous assurance cadence', 'Regulatory horizon scanning', 'Ongoing dashboards + board reporting'],
    duration_label: 'Monthly / Quarterly',
    level: 'Managed',
    published: true,
    sort_order: 10,
    updated_at: '2025-02-19T14:00:00Z',
  },
  // --- Payment Licensing Advisory ---
  {
    id: 'svc-lic-pssp',
    slug: 'pssp',
    icon: 'payments',
    title: 'PSSP License Advisory',
    tagline: 'Payment Solution Service Provider licensing support.',
    summary:
      'End-to-end advisory for Payment Solution Service Provider (PSSP) licensing: corporate and capital requirements, documentation, compliance framework, and engagement support.',
    categories: ['Licensing', 'Regulatory', 'Governance', 'Policies'],
    outcomes: [
      'Document pack aligned to PSSP framework',
      'Gap review and readiness roadmap',
      'Testing and compliance framework',
      'Engagement and submission support',
    ],
    duration_label: 'Advisory',
    level: 'Build',
    published: true,
    sort_order: 50,
    updated_at: '2025-03-03T10:00:00Z',
  },
  {
    id: 'svc-lic-ptsp',
    slug: 'ptsp',
    icon: 'point_of_sale',
    title: 'PTSP License Advisory',
    tagline: 'Payment Terminal Service Provider licensing support.',
    summary:
      'Advisory for Payment Terminal Service Provider (PTSP) licensing: corporate and legal eligibility, capital and escrow, documentary requirements, fees, and compliance preparedness.',
    categories: ['Licensing', 'Regulatory', 'Governance', 'Technology'],
    outcomes: [
      'Eligibility and documentary checklist',
      'Capital and escrow structuring',
      'Compliance and operational readiness pack',
      'Approval process and renewal support',
    ],
    duration_label: 'Advisory',
    level: 'Build',
    published: true,
    sort_order: 51,
    updated_at: '2025-03-03T10:00:00Z',
  },
  {
    id: 'svc-lic-sandbox',
    slug: 'sandbox',
    icon: 'science',
    title: 'Regulatory Sandbox Support',
    tagline: 'Regulatory sandbox participation support.',
    summary:
      'End-to-end support for Regulatory Sandbox applications: eligibility, product documentation, risk and compliance framework, testing plan, technology and security, and reporting.',
    categories: ['Licensing', 'Regulatory', 'Governance', 'Technology'],
    outcomes: [
      'Eligibility and application pack',
      'Product/solution and risk documentation',
      'Testing plan and KPIs',
      'Reporting and post-sandbox roadmap',
    ],
    duration_label: 'Advisory',
    level: 'Advanced',
    published: true,
    sort_order: 52,
    updated_at: '2025-03-03T10:00:00Z',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES_LIST.find((s) => s.slug === slug);
}

export function getPublishedServices(): Service[] {
  return SERVICES_LIST.filter((s) => s.published).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

/** Services for main grid (excludes Licensing Advisory). */
export function getPublishedNonLicensingServices(): Service[] {
  return getPublishedServices().filter((s) => !s.categories.includes('Licensing'));
}

/** Payment licensing advisory services only. */
export function getLicensingServices(): Service[] {
  return SERVICES_LIST.filter((s) => s.categories.includes('Licensing') && s.published).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}
