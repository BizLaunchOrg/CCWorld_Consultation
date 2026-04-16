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

const WHATSAPP_URL = 'https://wa.me/2348035244102';

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

const URL_RE = /(https?:\/\/[^\s]+)/g;
function renderMessageBody(body: string) {
  const parts = body.split(URL_RE);
  return parts.map((part, i) =>
    part.startsWith('http://') || part.startsWith('https://') ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline break-all text-primary hover:text-primary/90"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function ChatWidget() {
  const { user } = useAuth();
  const { isOpen, unreadCount, openChat, closeChat, addUnread, clearUnread, consumePendingMessage } = useChat();
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

  useEffect(() => {
    if (!isOpen) return;
    clearUnread();
    setLoading(true);
    openOrCreateConversation(user?.id ?? null)
      .then(async (conv) => {
        setConversationId(conv.id);
        const list = await getMessages(conv.id);
        setMessages(list.length ? list : [DEFAULT_GREETING]);
        markRead(conv.id).catch(() => {});

        // If there is a pending message, pre-fill the input instead of auto-sending
        const pending = consumePendingMessage();
        if (pending) {
          setInput(pending);
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        } else {
          inputRef.current?.focus();
        }
      })
      .catch(() => {
        setMessages([DEFAULT_GREETING]);
        const pending = consumePendingMessage();
        if (pending) {
          setInput(pending);
        }
      })
      .finally(() => setLoading(false));
  }, [isOpen, clearUnread, user?.id, consumePendingMessage]);

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
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl hover:scale-110 transition-transform"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <span className="material-symbols-outlined text-2xl">forum</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-white text-primary text-xs font-bold shadow-lg">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform"
        aria-label="Open WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.786-1.48-1.757-1.653-2.054-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.612-.916-2.203-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.075 4.487.709.306 1.26.489 1.691.626.71.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.312h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-2.995.787.8-2.92-.235-.374A9.958 9.958 0 012.5 11.998c0-5.523 4.477-10 10-10 2.663 0 5.159 1.039 7.032 2.933a9.885 9.885 0 012.937 7.042c-.002 5.522-4.48 10-10.002 10m8.413-18.018A11.815 11.815 0 001.5 11.998C1.5 18.299 6.7 23.5 13 23.5c3.148 0 6.093-1.229 8.306-3.453A11.72 11.72 0 0023.5 11.999a11.8 11.8 0 00-3.615-8.206z" />
        </svg>
      </a>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-4 pb-24 sm:p-6 sm:pb-28 pointer-events-none"
          aria-hidden
        >
          <div
            className="pointer-events-auto w-full max-w-md h-[min(70vh,520px)] rounded-2xl border border-charcoal/10 dark:border-slate-600 bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Live Chat"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal/10 dark:border-slate-600 bg-charcoal/5 dark:bg-slate-700/50">
              <div className="flex items-center gap-2">
                <span className="text-charcoal dark:text-white font-bold">Live Chat</span>
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  {status}
                </span>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="p-2 rounded-lg text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white hover:bg-charcoal/5 dark:hover:bg-slate-600 transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {loading ? (
                <p className="text-charcoal/60 dark:text-slate-400 text-sm">Loading…</p>
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
                            ? 'bg-primary text-white rounded-br-md'
                            : 'bg-charcoal/10 dark:bg-slate-700 text-charcoal dark:text-slate-200 border border-charcoal/5 dark:border-slate-600 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{renderMessageBody(msg.body)}</p>
                        <p className="text-[10px] mt-1 opacity-80">{formatTime(msg.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="p-3 border-t border-charcoal/10 dark:border-slate-600 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type a message…"
                className="flex-1 rounded-xl bg-charcoal/5 dark:bg-slate-700/50 border border-charcoal/10 dark:border-slate-600 px-4 py-3 text-charcoal dark:text-slate-200 placeholder:text-charcoal/50 dark:placeholder:text-slate-500 outline-none focus:border-primary text-sm"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="rounded-xl bg-primary text-white px-4 py-3 disabled:opacity-50 disabled:pointer-events-none hover:bg-primary/90 transition-colors"
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
