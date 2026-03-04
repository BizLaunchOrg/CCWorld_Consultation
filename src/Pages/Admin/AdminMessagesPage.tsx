import { useState, useEffect, useRef } from 'react';
import type { AdminConversation, AdminMessage } from '../../types/admin';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function AdminMessagesPage() {
  const [conversations, setConversations] = useState<AdminConversation[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId);
  const conversationMessages = selectedId
    ? messages.filter((m) => m.conversation_id === selectedId)
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages, typing]);

  function handleSend() {
    const body = reply.trim();
    if (!body || !selectedId) return;
    const newMsg: AdminMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: selectedId,
      sender_role: 'admin',
      body,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setReply('');
    setTyping(true);
    setTimeout(() => setTyping(false), 1200);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              last_message: body,
              last_message_at: newMsg.created_at,
              updated_at: newMsg.created_at,
              unread_count: 0,
            }
          : c
      )
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Conversation list */}
        <div className="w-full md:w-80 border-r border-slate-200 dark:border-white/10 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 dark:border-white/10">
            <h2 className="font-bold text-slate-900 dark:text-white">Conversations</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              No conversations yet. When you add a chat backend, they will appear here.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                No conversations yet
              </div>
            ) : (
              conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 flex items-start gap-3 ${
                  selectedId === c.id ? 'bg-teal-accent/10 border-l-4 border-l-teal-accent' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {c.customer_name}
                    </span>
                    {c.unread_count > 0 && (
                      <span className="shrink-0 flex items-center justify-center min-w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
                        {c.unread_count}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {c.last_message}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    {formatTime(c.last_message_at)}
                  </p>
                </div>
              </button>
              ))
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {selected ? (
            <>
              <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-accent">person</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{selected.customer_name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selected.customer_email}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {conversationMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender_role === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        m.sender_role === 'admin'
                          ? 'bg-teal-accent text-background-dark rounded-br-md'
                          : m.sender_role === 'system'
                            ? 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-bl-md'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                      <p className="text-[10px] mt-1 opacity-80">{formatTime(m.created_at)}</p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm">
                      Typing…
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-white/10 flex gap-2">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Type a reply…"
                  className="flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:border-teal-accent/50 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!reply.trim()}
                  className="rounded-2xl bg-teal-accent text-background-dark px-4 py-3 disabled:opacity-50 font-bold"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
