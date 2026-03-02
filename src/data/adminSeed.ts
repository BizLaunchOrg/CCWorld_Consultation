import type {
  AdminTransaction,
  AdminConsultation,
  AdminConversation,
  AdminMessage,
} from '../types/admin';

/** Training payments only. */
export const seedTransactions: AdminTransaction[] = [
  {
    id: 'tx-1',
    type: 'training',
    reference: 'TXN-ABC123',
    amount_ngn: 250_000,
    status: 'paid',
    customer_name: 'Jane Okonkwo',
    customer_email: 'jane@example.com',
    created_at: '2025-03-01T09:15:00Z',
    item_slug: 'compliance-culture-training',
    item_title: 'Compliance Culture Training',
  },
  {
    id: 'tx-2',
    type: 'training',
    reference: 'TXN-DEF456',
    amount_ngn: 320_000,
    status: 'paid',
    customer_name: 'Chidi Nnamdi',
    customer_email: 'chidi@company.ng',
    created_at: '2025-02-28T14:30:00Z',
    item_slug: 'compliance-landscape-training',
    item_title: 'Compliance Landscape Training',
  },
];

/** Consultation requests only (no payment). */
export const seedConsultations: AdminConsultation[] = [
  {
    id: 'con-1',
    customer_name: 'Amina Bello',
    email: 'amina@fintech.ng',
    phone: '+234 800 000 0001',
    company: 'Fintech NG Ltd',
    job_title: 'Head of Compliance',
    service_selected: 'Compliance Department Build-out',
    note: 'We need to prepare for CBN examination in Q2. Can we schedule a discovery call next week?',
    preferred_date: '2025-03-10',
    preferred_time: '10:00',
    status: 'new',
    created_at: '2025-03-02T08:00:00Z',
    internal_notes: '',
  },
  {
    id: 'con-2',
    customer_name: 'Oluwaseun Adeyemi',
    email: 'seun@bank.com',
    phone: '+234 800 000 0002',
    company: 'First Trust Bank',
    job_title: 'COO',
    service_selected: 'IMTO Setup & Licensing Readiness',
    note: 'Exploring IMTO license. Need full scope and timeline.',
    preferred_date: '2025-03-05',
    preferred_time: '14:00',
    status: 'in_review',
    created_at: '2025-02-28T11:20:00Z',
    internal_notes: 'Sent proposal. Follow up Friday.',
  },
];

export const seedConversations: AdminConversation[] = [
  {
    id: 'conv-1',
    customer_name: 'Guest User',
    customer_email: 'guest@example.com',
    last_message: 'Thanks for the info. I will get back to you.',
    last_message_at: '2025-03-02T10:45:00Z',
    unread_count: 0,
    updated_at: '2025-03-02T10:45:00Z',
  },
  {
    id: 'conv-2',
    customer_name: 'Chioma Eze',
    customer_email: 'chioma@company.ng',
    last_message: 'What is the next step after payment?',
    last_message_at: '2025-03-02T09:30:00Z',
    unread_count: 2,
    updated_at: '2025-03-02T09:30:00Z',
  },
];

export const seedMessages: AdminMessage[] = [
  {
    id: 'msg-1',
    conversation_id: 'conv-1',
    sender_role: 'system',
    body: 'Hey, how can we help you today?',
    created_at: '2025-03-02T10:00:00Z',
  },
  {
    id: 'msg-2',
    conversation_id: 'conv-1',
    sender_role: 'user',
    body: 'I need info on compliance training pricing.',
    created_at: '2025-03-02T10:15:00Z',
  },
  {
    id: 'msg-3',
    conversation_id: 'conv-1',
    sender_role: 'admin',
    body: 'Sure! We have Compliance Culture Training at NGN 250,000 and Compliance Landscape at NGN 320,000. Would you like a brochure?',
    created_at: '2025-03-02T10:20:00Z',
    read_at: '2025-03-02T10:25:00Z',
  },
  {
    id: 'msg-4',
    conversation_id: 'conv-1',
    sender_role: 'user',
    body: 'Thanks for the info. I will get back to you.',
    created_at: '2025-03-02T10:45:00Z',
  },
  {
    id: 'msg-5',
    conversation_id: 'conv-2',
    sender_role: 'system',
    body: 'Hey, how can we help you today?',
    created_at: '2025-03-01T14:00:00Z',
  },
  {
    id: 'msg-6',
    conversation_id: 'conv-2',
    sender_role: 'user',
    body: 'What is the next step after payment?',
    created_at: '2025-03-02T09:30:00Z',
  },
];
