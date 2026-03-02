import type { Conversation, Message } from '../types/chat';

/**
 * Placeholder: open or create a conversation. Replace with Supabase when ready.
 */
export async function openOrCreateConversation(userId?: string | null): Promise<Conversation> {
  // Demo: return a single local conversation
  const conv: Conversation = {
    id: 'demo-conv-1',
    user_id: userId ?? null,
    created_at: new Date().toISOString(),
  };
  return Promise.resolve(conv);
}

/**
 * Placeholder: send a message. Replace with Supabase insert when ready.
 */
export async function sendMessage(
  _conversationId: string,
  body: string,
  _senderRole: 'user' | 'admin' | 'system' = 'user'
): Promise<Message> {
  const msg: Message = {
    id: `msg-${Date.now()}`,
    conversation_id: _conversationId,
    sender_role: 'user',
    body,
    created_at: new Date().toISOString(),
  };
  return Promise.resolve(msg);
}

/**
 * Placeholder: subscribe to new messages (e.g. Supabase realtime). For now no-op.
 */
export function subscribeToMessages(
  _conversationId: string,
  _onMessage: (message: Message) => void
): () => void {
  // Later: const sub = supabase.channel(`conv:${_conversationId}`).on('postgres_changes', ..., (payload) => _onMessage(payload.new)).subscribe();
  return () => {};
}

/**
 * Placeholder: mark messages as read. Replace with Supabase update when ready.
 */
export async function markRead(_conversationId: string): Promise<void> {
  return Promise.resolve();
}
