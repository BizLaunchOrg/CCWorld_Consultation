import type { Training } from '../types/training';

/**
 * Demo in-memory trainings. Replace with Supabase fetch via fetchTrainings() when DB is wired.
 */
export const DEMO_TRAININGS: Training[] = [
  {
    id: 't1',
    slug: 'compliance-culture-training',
    title: 'Compliance Culture Training',
    tagline: 'Build a culture of compliance from the ground up.',
    summary: 'Structured programs to embed compliance awareness, role-based learning paths, and measurable completion evidence across your organization.',
    benefits: [
      'Board and senior leadership sessions',
      'Role-based learning paths',
      'Attestation and completion tracking',
      'Culture campaigns with reporting',
      'Regulator-ready evidence of training',
    ],
    priceNGN: 250_000,
    category: 'training',
    whoItsFor: 'Compliance officers, HR, and department heads who need to roll out organization-wide compliance awareness and attestations.',
    modules: [
      'Introduction to compliance culture',
      'Regulatory expectations and accountability',
      'Role-based responsibilities',
      'Escalation and reporting',
      'Case studies and assessments',
    ],
    deliveryFormat: 'Online, onsite, or hybrid. Typically 2–4 sessions over 2–4 weeks.',
    faq: [
      { q: 'How long does the program run?', a: 'Typically 2–4 weeks with flexible scheduling.' },
      { q: 'Do we get certificates?', a: 'Yes. Completion certificates and evidence packs for regulators.' },
    ],
    duration_label: '2–4 weeks',
    icon: 'school',
    updated_at: '2025-02-28T10:00:00Z',
    published: true,
  },
  {
    id: 't2',
    slug: 'compliance-landscape-training',
    title: 'Compliance Landscape Training',
    tagline: 'Master the regulatory landscape for your sector.',
    summary: 'Deep-dive into CBN, SEC, and sector-specific regulations, obligations mapping, and how to stay ahead of regulatory changes.',
    benefits: [
      'Current regulatory framework overview',
      'Obligations mapping by function',
      'Horizon scanning and change management',
      'Exam and audit readiness tips',
      'Q&A with practitioners',
    ],
    priceNGN: 320_000,
    category: 'training',
    whoItsFor: 'New compliance staff, legal, and operations leads who need a clear map of applicable rules and how they apply day to day.',
    modules: [
      'Regulatory architecture (CBN, SEC, others)',
      'Licensing and ongoing obligations',
      'Reporting and filing calendar',
      'Enforcement trends and case studies',
      'Staying current: horizon scanning',
    ],
    deliveryFormat: 'Online or onsite. Full-day workshop or 2 half-days.',
    faq: [
      { q: 'Is this tailored to our license type?', a: 'Yes. We customize for banks, fintechs, IMTOs, or mixed audiences.' },
      { q: 'Do you provide materials?', a: 'Yes. Slide packs, checklists, and optional takeaway guides.' },
    ],
    duration_label: '1–2 days',
    icon: 'menu_book',
    updated_at: '2025-02-27T15:00:00Z',
    published: true,
  },
  {
    id: 't3',
    slug: 'statutory-training',
    title: 'Statutory Training',
    tagline: 'Meet mandatory training requirements with confidence.',
    summary: 'Curriculum aligned to statutory and regulatory training requirements, with evidence of completion for audits and exams.',
    benefits: [
      'Aligned to statutory requirements',
      'Audit-ready completion records',
      'Refresher and annual updates',
      'Multi-level (board to frontline)',
      'Evidence packs for regulators',
    ],
    priceNGN: 180_000,
    category: 'training',
    whoItsFor: 'Organizations that must demonstrate mandatory compliance training (AML/CFT, sanctions, code of conduct) to regulators and auditors.',
    modules: [
      'Statutory and regulatory training obligations',
      'AML/CFT and sanctions awareness',
      'Code of conduct and ethics',
      'Board and senior management modules',
      'Documentation and evidence',
    ],
    deliveryFormat: 'Online preferred for scale; onsite available. Can be scheduled annually or per cohort.',
    faq: [
      { q: 'Can we run this annually?', a: 'Yes. We offer recurring statutory training and refreshers.' },
      { q: 'What evidence do we get?', a: 'Attendance records, assessments, and certificates suitable for audit.' },
    ],
    duration_label: '2–4 weeks',
    icon: 'gavel',
    updated_at: '2025-02-26T09:00:00Z',
    published: true,
  },
  {
    id: 't4',
    slug: 'outsourcing-internal-training',
    title: 'Outsourcing Internal Training',
    tagline: 'Let us run your internal compliance training program.',
    summary: 'We design and deliver your internal training calendar, role-based modules, and reporting so you focus on operations while staying compliant.',
    benefits: [
      'Custom training calendar',
      'Role-based modules and assessments',
      'Delivery and facilitation by our team',
      'Completion and attestation reporting',
      'Reduced internal training burden',
    ],
    priceNGN: 450_000,
    category: 'training',
    whoItsFor: 'Teams that want a full internal training program delivered by experts without building an in-house training function.',
    modules: [
      'Needs assessment and calendar design',
      'Core compliance modules',
      'Role-specific deep-dives',
      'Assessments and attestations',
      'Reporting and evidence packs',
    ],
    deliveryFormat: 'Hybrid. We deliver online and/or onsite per your schedule; typically quarterly or per cohort.',
    faq: [
      { q: 'How many sessions are included?', a: 'Depends on scope. We agree a calendar and number of cohorts upfront.' },
      { q: 'Can you train our remote staff?', a: 'Yes. We support fully remote delivery and recording for async completion.' },
    ],
    duration_label: 'Ongoing',
    icon: 'groups',
    updated_at: '2025-02-25T11:00:00Z',
    published: true,
  },
  // Advisory offerings
  {
    id: 'a1',
    slug: 'risk-review-and-recommendations',
    title: 'Risk Review & Recommendations',
    tagline: 'Work with our organization to conduct risk review and make recommendations.',
    summary: 'We conduct an independent risk review of your compliance posture, control environment, and key processes, then deliver clear recommendations and a prioritized action plan.',
    benefits: [
      'Independent risk assessment and gap analysis',
      'Recommendations aligned to your risk appetite',
      'Prioritized action plan with owners and timelines',
      'Board-ready report and executive summary',
      'Follow-up support to implement key actions',
    ],
    priceNGN: 550_000,
    category: 'advisory',
    whoItsFor: 'Boards, C-suite, and compliance leads who want an external view of their compliance and operational risk before exams or strategic decisions.',
    modules: [
      'Scoping and information gathering',
      'Risk and control assessment',
      'Gap analysis and benchmarking',
      'Recommendations and prioritization',
      'Report and presentation',
    ],
    deliveryFormat: 'Onsite and remote. Typically 3–6 weeks from kick-off to final report.',
    faq: [
      { q: 'How is this different from a CRA?', a: 'This is a broader risk review and recommendation engagement; we can include CRA as part of it or run it standalone.' },
      { q: 'Do you present to the board?', a: 'Yes. We can present findings and recommendations to the board or audit committee if required.' },
    ],
    duration_label: '3–6 weeks',
    icon: 'recommend',
    updated_at: '2025-02-24T10:00:00Z',
    published: true,
  },
  {
    id: 'a2',
    slug: 'compliance-health-check',
    title: 'Compliance Health Check',
    tagline: 'Quick diagnostic of your compliance function and key controls.',
    summary: 'A focused advisory engagement to assess the health of your compliance program, identify quick wins, and flag areas that need deeper work or training.',
    benefits: [
      'Structured diagnostic across governance, policies, and processes',
      'Quick wins and medium-term recommendations',
      'Benchmark against peer practice where relevant',
      'Clear report with findings and next steps',
      'Optional follow-on for implementation support',
    ],
    priceNGN: 380_000,
    category: 'advisory',
    whoItsFor: 'Organizations that want a fast, external view of compliance health before an audit, exam, or licensing step.',
    modules: [
      'Document and process review',
      'Interviews with key stakeholders',
      'Control testing and evidence review',
      'Findings and recommendations',
      'Report and debrief',
    ],
    deliveryFormat: 'Hybrid. Usually 2–4 weeks with a mix of remote and onsite as needed.',
    faq: [
      { q: 'What does the deliverable look like?', a: 'A written report with findings, recommendations, and priority, plus a live debrief with your team.' },
      { q: 'Can we scope only certain areas?', a: 'Yes. We can focus on specific pillars (e.g. AML, sanctions, reporting) if you prefer.' },
    ],
    duration_label: '2–4 weeks',
    icon: 'health_and_safety',
    updated_at: '2025-02-23T14:00:00Z',
    published: true,
  },
];

/**
 * Fetch trainings. Replace implementation with Supabase when DB is ready.
 */
export async function fetchTrainings(): Promise<Training[]> {
  // Simulate async; later: const { data } = await supabase.from('trainings').select('*');
  return Promise.resolve([...DEMO_TRAININGS]);
}

export function getTrainingBySlug(slug: string): Training | undefined {
  return DEMO_TRAININGS.find((t) => t.slug === slug);
}

/** All demo offerings (trainings + advisory) for listing. */
export function getAllOfferings(): Training[] {
  return [...DEMO_TRAININGS];
}
