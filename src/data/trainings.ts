import type { Training } from '../types/training';


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
      'Audit-ready evidence of training',
    ],
    category: 'training',
    whoItsFor: 'Compliance officers, HR, and department heads who need to roll out organization-wide compliance awareness and attestations.',
    modules: [
      'Introduction to compliance culture',
      'Regulatory expectations and accountability',
      'Role-based responsibilities',
      'Escalation and reporting',
      'Case studies and assessments',
    ],
    faq: [
      { q: 'How long does the program run?', a: 'Typically 2–4 weeks with flexible scheduling.' },
      { q: 'Do we get certificates?', a: 'Yes. Completion certificates and evidence packs for audits and compliance.' },
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
    summary: 'Deep-dive into payment, securities, and sector-specific requirements, obligations mapping, and how to stay ahead of regulatory changes.',
    benefits: [
      'Current regulatory framework overview',
      'Obligations mapping by function',
      'Horizon scanning and change management',
      'Exam and audit readiness tips',
      'Q&A with practitioners',
    ],
    category: 'training',
    whoItsFor: 'New compliance staff, legal, and operations leads who need a clear map of applicable rules and how they apply day to day.',
    modules: [
      'Key frameworks and sector architecture (payment, securities, others)',
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
      'Evidence packs for audits and compliance',
    ],
    category: 'training',
    whoItsFor: 'Organizations that must demonstrate mandatory compliance training (AML/CFT, sanctions, code of conduct) to auditors and for exam readiness.',
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
  {
    id: 't5',
    slug: 'aml-cft-cpf-foundation-course',
    title: 'AML/CFT/CPF Foundation Course',
    tagline: 'Introductory AML/CFT/CPF awareness for new and frontline staff.',
    summary:
      'This foundation course introduces executive trainees, new hires, and staff encountering AML/CFT/CPF compliance for the first time. It is designed to nurture a sustainable compliance culture from day one.',
    benefits: [
      'Clear introduction to AML/CFT/CPF concepts and obligations',
      'Practical examples relevant to day-to-day operations',
      'Awareness of red flags and reporting expectations',
      'Baseline culture-building for new hires across the organization',
    ],
    category: 'training',
    whoItsFor:
      'Executive trainees, new hires, and staff who are new to AML/CFT/CPF compliance and need a practical introduction.',
    modules: [
      'Overview of AML/CFT/CPF concepts and terminology',
      'Understanding your institution’s compliance obligations',
      'Customer due diligence and basic KYC expectations',
      'Red flags, suspicious activities, and escalation',
      'Embedding AML/CFT/CPF culture from day one',
    ],
    deliveryFormat: 'Online or onsite; typically delivered as a half-day or full-day session.',
    faq: [
      {
        q: 'Is this suitable for non-technical staff?',
        a: 'Yes. The course is designed for all staff, including non-technical and non-compliance roles.',
      },
      {
        q: 'Can we customize examples to our products?',
        a: 'Yes. We tailor case studies and examples to your business model.',
      },
    ],
    duration_label: '0.5–1 day',
    icon: 'lightbulb',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't6',
    slug: 'aml-cft-cpf-intermediate-course',
    title: 'AML/CFT/CPF Intermediate Course',
    tagline: 'Latest trends, patterns, and updates for middle and senior management.',
    summary:
      'The intermediate course provides deeper exposure to emerging AML/CFT/CPF risks, regulatory expectations, and practical control enhancements for middle level staff and senior/executive management.',
    benefits: [
      'Up-to-date view of AML/CFT/CPF risks, trends, and typologies',
      'Better understanding of management and board responsibilities',
      'Guidance on strengthening existing controls and reporting processes',
      'Reduced incidences of non-compliance and regulatory breaches',
    ],
    category: 'training',
    whoItsFor:
      'Middle level staff, senior management, and executives who need deeper AML/CFT/CPF exposure and practical guidance to reduce non-compliance.',
    modules: [
      'Emerging AML/CFT/CPF risks and typologies',
      'Management and board accountability and expectations',
      'Enhancing transaction monitoring, reporting, and documentation',
      'Case studies on enforcement actions and lessons learned',
      'Designing a stronger compliance culture and oversight framework',
    ],
    deliveryFormat: 'Workshop format over 1–2 days, online or onsite.',
    faq: [
      {
        q: 'Is this different from the foundation course?',
        a: 'Yes. It assumes basic awareness and focuses on deeper responsibilities, trends, and control enhancements.',
      },
      {
        q: 'Can we invite board members?',
        a: 'Yes. Board and executive participation is encouraged where possible.',
      },
    ],
    duration_label: '1–2 days',
    icon: 'trending_up',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't7',
    slug: 'aml-cft-cpf-train-the-trainer',
    title: 'AML/CFT/CPF Train-the-Trainer',
    tagline: 'Equip internal trainers to cascade AML/CFT/CPF knowledge.',
    summary:
      'This course equips selected staff with the expertise, content, and facilitation skills needed to deliver in-house AML/CFT/CPF training and support sustainable capacity development.',
    benefits: [
      'Internal training champions with deep AML/CFT/CPF knowledge',
      'Structured training materials and facilitation guides',
      'Improved consistency and quality of in-house training',
      'Reduced long-term external training costs',
    ],
    category: 'training',
    whoItsFor:
      'Compliance, risk, HR, and other staff nominated to champion in-house AML/CFT/CPF capacity building.',
    modules: [
      'Advanced AML/CFT/CPF concepts and practical applications',
      'Adult learning principles and facilitation skills',
      'Designing and adapting training modules for internal teams',
      'Assessments, quizzes, and evidence of completion',
      'Ongoing mentoring and refresh planning',
    ],
    deliveryFormat: 'Instructor-led program delivered over 2–3 days, onsite or virtual.',
    faq: [
      {
        q: 'Do participants get reusable training materials?',
        a: 'Yes. Participants receive slide decks, facilitator notes, and sample assessments.',
      },
      {
        q: 'Can we run this for multiple entities?',
        a: 'Yes. We can structure it as a cohort for a group of related entities.',
      },
    ],
    duration_label: '2–3 days',
    icon: 'record_voice_over',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't8',
    slug: 'aml-cft-cpf-upskilling-top-up',
    title: 'AML/CFT/CPF Up-skilling & Top-up Class',
    tagline: 'Deep dive into statutory and legislative AML/CFT/CPF frameworks.',
    summary:
      'An intensive class focused on interpreting the letters and spirit of the AML/CFT/CPF statutory and legislative framework in Nigeria, including the future of compliance and supporting technologies.',
    benefits: [
      'Clear interpretation of key AML/CFT/CPF laws and regulations',
      'Better understanding of regulatory expectations and enforcement posture',
      'Insight into the future of compliance and enabling technologies',
      'Improved ability to design result-oriented compliance programs',
    ],
    category: 'training',
    whoItsFor:
      'Compliance officers, legal teams, internal auditors, and senior management seeking deeper understanding of statutory AML/CFT/CPF frameworks.',
    modules: [
      'Detailed review of Nigerian AML/CFT/CPF legislation and regulations',
      'Regulatory expectations and thematic review focus areas',
      'Designing risk-based, result-oriented compliance controls',
      'Technology trends and the future of AML/CFT/CPF compliance',
      'Interactive case studies and Q&A',
    ],
    deliveryFormat: 'Hybrid (online and/or onsite) as a 1–2 day intensive class.',
    faq: [
      {
        q: 'Is this suitable as a refresher course?',
        a: 'Yes. It can serve as an up-skilling or refresher class for experienced professionals.',
      },
    ],
    duration_label: '1–2 days',
    icon: 'upgrade',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't9',
    slug: 'aml-cft-cpf-bank-directors-training',
    title: 'AML/CFT/CPF Bank Directors Training',
    tagline: 'Board-level AML/CFT/CPF responsibilities and oversight.',
    summary:
      'A focused program for board members and executive management on their ultimate responsibility for AML/CFT/CPF compliance and how to exercise effective oversight.',
    benefits: [
      'Board-level understanding of AML/CFT/CPF obligations and liabilities',
      'Clarity on governance structures, reporting lines, and risk appetite',
      'Tools for effective oversight, challenge, and decision-making',
      'Reduced personal and institutional exposure to regulatory sanctions',
    ],
    category: 'training',
    whoItsFor: 'Board members and executive management of banks and other regulated institutions.',
    modules: [
      'Board and senior management AML/CFT/CPF responsibilities',
      'Reading and challenging AML/CFT/CPF reports and dashboards',
      'Approving risk appetite, policies, and key frameworks',
      'Regulatory expectations and enforcement case studies',
      'Practical oversight tools and questions to ask management',
    ],
    deliveryFormat: 'Board retreat or dedicated session, onsite or virtual.',
    faq: [
      {
        q: 'Can this be delivered during a board retreat?',
        a: 'Yes. We frequently deliver this as part of strategy or governance retreats.',
      },
    ],
    duration_label: '0.5–1 day',
    icon: 'chair_alt',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't10',
    slug: 'aml-cft-cpf-master-class',
    title: 'AML/CFT/CPF Master Class',
    tagline: 'Regulatory intelligence and emerging AML/CFT/CPF issues.',
    summary:
      'A master-level course that teaches participants how to leverage regulatory intelligence, understand new technologies, and manage international and emerging AML/CFT/CPF issues.',
    benefits: [
      'Ability to anticipate and navigate upcoming regulations and guidance',
      'Deeper understanding of new technologies and their compliance impact',
      'Practical tools for managing cross-border and emerging AML/CFT/CPF risks',
      'Enhanced strategic positioning of the compliance function',
    ],
    category: 'training',
    whoItsFor:
      'Senior compliance professionals, heads of compliance, chief risk officers, and other leaders dealing with complex AML/CFT/CPF issues.',
    modules: [
      'Using regulatory intelligence and horizon scanning',
      'Responding to new guidance, policy, and legislation',
      'Technology-driven financial crime risks and controls',
      'International perspectives and cross-border issues',
      'Designing agile, future-proof compliance programs',
    ],
    deliveryFormat: 'Advanced workshop over 2 days, with optional follow-on clinics.',
    faq: [
      {
        q: 'Is this program exam-focused?',
        a: 'It is practice-focused, with insights that also support exam and audit readiness.',
      },
    ],
    duration_label: '2 days',
    icon: 'stars',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't11',
    slug: 'compliance-firewalls-training',
    title: 'Compliance Firewalls Training',
    tagline: 'Monthly deep dives on burning compliance issues.',
    summary:
      'The Compliance Firewalls training is a monthly program for professionals who want to stay current on burning compliance issues across customer due diligence, compliance, and risk management.',
    benefits: [
      'Regular exposure to current and emerging compliance topics',
      'Focused sessions on CDD, compliance, and risk management themes',
      'Opportunities to discuss real-life scenarios with practitioners',
      'Ongoing professional development throughout the year',
    ],
    category: 'training',
    whoItsFor:
      'Compliance, risk, operations, and front-office professionals who want continuous learning on topical compliance issues.',
    modules: [
      'Monthly themed sessions on key compliance topics',
      'Customer Due Diligence deep dives',
      'Risk management and control themes',
      'Interactive Q&A and peer sharing',
    ],
    deliveryFormat: 'Monthly virtual sessions with optional recordings and materials.',
    duration_label: 'Monthly series',
    icon: 'fireplace',
    updated_at: '2026-03-10T10:00:00Z',
    published: true,
  },
  {
    id: 't12',
    slug: 'aml-cft-cpf-compliance-manual-compilation-training',
    title: 'AML/CFT/CPF Compliance Manual Compilation',
    tagline: 'Practical workshop on developing AML/CFT/CPF manuals and KYC handbooks.',
    summary:
      'Hands-on training for financial institutions and DNFIs on designing and compiling AML/CFT/CPF compliance manuals, KYC handbooks, and documented programs that meet NFIU and SCUML expectations.',
    benefits: [
      'Clarity on statutory AML/CFT/CPF program expectations under the MLPA',
      'Guided structure for AML/CFT/CPF compliance manuals and staff KYC handbooks',
      'Better alignment of policies, processes, and procedures with regulatory expectations',
      'Improved readiness for regulatory inspections and intelligence requests',
    ],
    category: 'training',
    whoItsFor:
      'Compliance officers, legal teams, and operations leaders in banks and DNFIs responsible for developing AML/CFT/CPF documentation.',
    modules: [
      'Regulatory basis for AML/CFT/CPF programs and manuals (MLPA and related regulations)',
      'Core components of an institution-specific AML/CFT/CPF compliance manual',
      'Designing and structuring a staff KYC handbook',
      'Documenting programs, processes, and procedures for DNFIs',
      'Practical clinic: reviewing and improving your existing documentation',
    ],
    deliveryFormat: 'Workshop-style training, online or onsite, typically delivered over 1 day.',
    faq: [
      {
        q: 'Is this training suitable if we already have a manual?',
        a: 'Yes. We review and benchmark your existing documentation and provide guidance on closing gaps.',
      },
      {
        q: 'Does this replace implementation support?',
        a: 'The training focuses on equipping your team; we can provide separate advisory support for full compilation projects.',
      },
    ],
    duration_label: '1 day',
    icon: 'menu_book',
    updated_at: '2026-03-10T10:00:00Z',
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
