import { supabase } from './supabase';
import type { Conversation, Message } from '../types/chat';

const CONVERSATIONS = 'chat_conversations';
const MESSAGES = 'chat_messages';

/**
 * Get or create a conversation for the current user.
 * Logged-in: one conversation per user (by user_id). Anonymous: create new each time (client keeps id in state).
 */
export async function openOrCreateConversation(userId?: string | null): Promise<Conversation> {
  if (userId) {
    const { data: existing } = await supabase
      .from(CONVERSATIONS)
      .select('id, user_id, created_at')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();
    if (existing) {
      return {
        id: existing.id,
        user_id: existing.user_id,
        created_at: existing.created_at,
      };
    }
    const { data: created, error } = await supabase
      .from(CONVERSATIONS)
      .insert({ user_id: userId })
      .select('id, user_id, created_at')
      .single();
    if (error) throw error;
    return { id: created.id, user_id: created.user_id, created_at: created.created_at };
  }
  const { data: created, error } = await supabase
    .from(CONVERSATIONS)
    .insert({ user_id: null })
    .select('id, user_id, created_at')
    .single();
  if (error) throw error;
  return { id: created.id, user_id: created.user_id ?? null, created_at: created.created_at };
}

/**
 * Send a message (user or admin). Inserts into chat_messages; Realtime will notify subscribers.
 */
export async function sendMessage(
  conversationId: string,
  body: string,
  senderRole: 'user' | 'admin' | 'system' = 'user'
): Promise<Message> {
  const { data, error } = await supabase
    .from(MESSAGES)
    .insert({
      conversation_id: conversationId,
      sender_role: senderRole,
      body: body.trim(),
    })
    .select('id, conversation_id, sender_role, body, created_at, read_at')
    .single();
  if (error) throw error;
  const msg: Message = {
    id: data.id,
    conversation_id: data.conversation_id,
    sender_role: data.sender_role,
    body: data.body,
    created_at: data.created_at,
    read_at: data.read_at ?? undefined,
  };
  return msg;
}

/**
 * Subscribe to new messages in a conversation (Realtime). No refresh needed.
 */
export function subscribeToMessages(
  conversationId: string,
  onMessage: (message: Message) => void
): () => void {
  const channel = supabase
    .channel(`chat:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: MESSAGES,
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const row = payload.new as { id: string; conversation_id: string; sender_role: string; body: string; created_at: string; read_at: string | null };
        onMessage({
          id: row.id,
          conversation_id: row.conversation_id,
          sender_role: row.sender_role as Message['sender_role'],
          body: row.body,
          created_at: row.created_at,
          read_at: row.read_at ?? undefined,
        });
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Mark messages in a conversation as read (admin only). Optional for unread badge.
 */
export async function markRead(conversationId: string): Promise<void> {
  await supabase
    .from(MESSAGES)
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .is('read_at', null);
}

/**
 * Load initial messages for a conversation (client or admin).
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from(MESSAGES)
    .select('id, conversation_id, sender_role, body, created_at, read_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    conversation_id: row.conversation_id,
    sender_role: row.sender_role as Message['sender_role'],
    body: row.body,
    created_at: row.created_at,
    read_at: row.read_at ?? undefined,
  }));
}

// --- Admin API ---

export interface AdminConversationRow {
  id: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_email?: string;
  last_message?: string;
  last_message_at?: string;
  unread_count?: number;
}

/**
 * List all conversations for admin with last message and profile info.
 */
export async function listAdminConversations(): Promise<AdminConversationRow[]> {
  const { data: convs, error: convError } = await supabase
    .from(CONVERSATIONS)
    .select('id, user_id, created_at, updated_at')
    .order('updated_at', { ascending: false });
  if (convError) throw convError;
  if (!convs?.length) return [];

  const withDetails: AdminConversationRow[] = [];
  for (const c of convs) {
    const { data: profile } = c.user_id
      ? await supabase.from('profiles').select('name, email').eq('id', c.user_id).single()
      : { data: null };
    const { data: lastMsg } = await supabase
      .from(MESSAGES)
      .select('body, created_at')
      .eq('conversation_id', c.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const { count } = await supabase
      .from(MESSAGES)
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', c.id)
      .eq('sender_role', 'user')
      .is('read_at', null);
    withDetails.push({
      id: c.id,
      user_id: c.user_id,
      created_at: c.created_at,
      updated_at: c.updated_at,
      customer_name: profile?.name ?? (c.user_id ? 'User' : 'Guest'),
      customer_email: profile?.email ?? (c.user_id ? '' : '—'),
      last_message: lastMsg?.body ?? 'No messages yet',
      last_message_at: lastMsg?.created_at ?? c.created_at,
      unread_count: count ?? 0,
    });
  }
  return withDetails;
}

/**
 * Mark messages in a conversation as read (admin). Updates read_at.
 */
export async function adminMarkRead(conversationId: string): Promise<void> {
  await supabase
    .from(MESSAGES)
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .is('read_at', null);
}
