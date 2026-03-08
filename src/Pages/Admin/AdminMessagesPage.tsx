import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import type { AdminMessage } from '../../types/admin';
import {
  listAdminConversations,
  getMessages,
  sendMessage,
  subscribeToMessages,
  subscribeToAllMessages,
  adminMarkRead,
  type AdminConversationRow,
} from '../../lib/chatApi';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function AdminMessagesPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState<AdminConversationRow[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  // Open conversation from notification or deep link
  const openFromState = (location.state as { openConversationId?: string })?.openConversationId;
  const openFromQuery = searchParams.get('conversation');
  const openId = openFromState ?? openFromQuery ?? null;
  useEffect(() => {
    if (!openId) return;
    setSelectedId(openId);
    if (openFromState) {
      try { window.history.replaceState({}, '', location.pathname); } catch {}
    }
  }, [openId, openFromState, location.pathname]);

  const selected = conversations.find((c) => c.id === selectedId);
  const conversationMessages = selectedId
    ? messages.filter((m) => m.conversation_id === selectedId)
    : [];

  const loadConversations = useCallback(async () => {
    try {
      const list = await listAdminConversations();
      setConversations(list);
    } catch {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // When ANY new message is sent (client or admin), refresh conversation list so new conversations appear in real time
  useEffect(() => {
    const unsub = subscribeToAllMessages(() => loadConversations());
    return unsub;
  }, [loadConversations]);

  // When selecting a conversation, load messages and subscribe to new ones
  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    adminMarkRead(selectedId).catch(() => {});
    getMessages(selectedId)
      .then((list) => setMessages(list))
      .catch(() => setMessages([]));

    const unsub = subscribeToMessages(selectedId, (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });
    return unsub;
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  async function handleSend() {
    const body = reply.trim();
    if (!body || !selectedId) return;
    setReply('');
    try {
      const created = await sendMessage(selectedId, body, 'admin');
      setMessages((prev) => [...prev, created]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId
            ? {
                ...c,
                last_message: body,
                last_message_at: created.created_at,
                updated_at: created.created_at,
                unread_count: 0,
              }
            : c
        )
      );
    } catch {
      // leave reply in input
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 overflow-hidden">
      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Conversation list: on mobile hide when a conversation is open */}
        <div
          className={`flex flex-col shrink-0 w-full md:w-80 border-r border-slate-200 dark:border-slate-700 ${
            selectedId ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-bold text-slate-900 dark:text-white">Conversations</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live chat with site visitors. Tap a conversation to open it.
            </p>
            <button
              type="button"
              onClick={() => { setLoading(true); loadConversations(); }}
              className="mt-2 text-xs font-semibold text-primary hover:underline"
            >
              Refresh list
            </button>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            {loading ? (
              <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">Loading…</div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                No conversations yet. When someone uses Live Chat on the site, they will appear here.
              </div>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-primary/10 flex items-start gap-3 touch-manipulation ${
                    selectedId === c.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {c.customer_name ?? 'Guest'}
                      </span>
                      {(c.unread_count ?? 0) > 0 && (
                        <span className="shrink-0 flex items-center justify-center min-w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
                          {c.unread_count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {c.last_message ?? 'No messages yet'}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                      {formatTime(c.last_message_at ?? c.created_at)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat panel: on mobile show only when a conversation is selected; full area for chat */}
        <div
          className={`flex-1 flex flex-col min-w-0 min-h-0 ${
            selectedId ? 'flex' : 'hidden md:flex'
          }`}
        >
          {selectedId ? (
            <>
              <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="md:hidden p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 touch-manipulation"
                  aria-label="Back to conversations"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <span className="material-symbols-outlined text-primary shrink-0">person</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{selected?.customer_name ?? 'Guest'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{selected?.customer_email ?? '—'}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {conversationMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender_role === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        m.sender_role === 'admin'
                          ? 'bg-primary text-white rounded-br-md'
                          : m.sender_role === 'system'
                            ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-bl-md'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{m.body}</p>
                      <p className="text-[10px] mt-1 opacity-80">{formatTime(m.created_at)}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2 shrink-0">
                <input
                  ref={replyInputRef}
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onFocus={() => {
                    setTimeout(() => replyInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Type a reply…"
                  className="flex-1 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!reply.trim()}
                  className="rounded-2xl bg-primary text-white px-4 py-3 disabled:opacity-50 font-bold shrink-0 touch-manipulation"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm px-4">
              Select a conversation from the list to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
