export interface Conversation {
  id: string;
  user_id?: string | null;
  created_at: string;
}

export type SenderRole = 'user' | 'admin' | 'system';

export interface Message {
  id: string;
  conversation_id: string;
  sender_role: SenderRole;
  body: string;
  created_at: string;
  read_at?: string | null;
}
