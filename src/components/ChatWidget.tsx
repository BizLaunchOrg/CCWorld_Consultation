import { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import {
  openOrCreateConversation,
  sendMessage as sendMessageApi,
  subscribeToMessages,
  getMessages,
  markRead,
} from '../lib/chatApi';
import type { Message } from '../types/chat';

const DEFAULT_GREETING: Message = {
  id: 'system-greeting',
  conversation_id: '',
  sender_role: 'system',
  body: 'Hey, how can we help you today?',
  created_at: new Date().toISOString(),
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function ChatWidget() {
  const { user } = useAuth();
  const { isOpen, unreadCount, openChat, closeChat, addUnread, clearUnread } = useChat();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status] = useState<'Online'>('Online');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // When opening chat: get or create conversation, load messages, subscribe to new ones
  useEffect(() => {
    if (!isOpen) return;
    clearUnread();
    inputRef.current?.focus();
    setLoading(true);
    openOrCreateConversation(user?.id ?? null)
      .then(async (conv) => {
        setConversationId(conv.id);
        const list = await getMessages(conv.id);
        setMessages(list.length ? list : [DEFAULT_GREETING]);
        markRead(conv.id).catch(() => {});
      })
      .catch(() => setMessages([DEFAULT_GREETING]))
      .finally(() => setLoading(false));
  }, [isOpen, clearUnread, user?.id]);

  // Realtime: new messages (including admin replies) appear without refresh
  useEffect(() => {
    if (!conversationId) return;
    const unsub = subscribeToMessages(conversationId, (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
      if (!isOpenRef.current) addUnread();
    });
    return unsub;
  }, [conversationId, addUnread]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeChat]);

  const sendMessage = useCallback(async () => {
    const body = input.trim();
    if (!body || !conversationId) return;
    setInput('');
    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId,
      sender_role: 'user',
      body,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    try {
      const created = await sendMessageApi(conversationId, body);
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...created } : m))
      );
    } catch {
      // keep optimistic message
    }
  }, [input, conversationId]);

  return (
    <>
      <button
        type="button"
        onClick={() => (isOpen ? closeChat() : openChat())}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-accent text-background-dark shadow-lg hover:shadow-[0_0_24px_rgba(45,212,191,0.35)] transition-all border border-teal-accent/20"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <span className="material-symbols-outlined text-2xl">chat</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-white text-xs font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-4 pb-24 sm:p-6 sm:pb-28 pointer-events-none"
          aria-hidden
        >
          <div
            className="pointer-events-auto w-full max-w-md h-[min(70vh,520px)] rounded-2xl border border-white/10 bg-background-dark/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Live Chat"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Live Chat</span>
                <span className="flex items-center gap-1.5 text-xs text-teal-accent">
                  <span className="size-2 rounded-full bg-teal-accent" />
                  {status}
                </span>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {loading ? (
                <p className="text-slate-400 text-sm">Loading…</p>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          msg.sender_role === 'user'
                            ? 'bg-teal-accent text-background-dark rounded-br-md'
                            : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                        <p className="text-[10px] mt-1 opacity-80">{formatTime(msg.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type a message…"
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-slate-200 placeholder:text-slate-500 outline-none focus:border-teal-accent/50 text-sm"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="rounded-xl bg-teal-accent text-background-dark px-4 py-3 disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_16px_rgba(45,212,191,0.3)] transition-all"
                aria-label="Send"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
