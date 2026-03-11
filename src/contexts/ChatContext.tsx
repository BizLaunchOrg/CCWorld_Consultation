import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ChatContextValue {
  isOpen: boolean;
  unreadCount: number;
  /** Open chat. If initialMessage is provided, it will be pre-filled into the input for the user to send. */
  openChat: (initialMessage?: string) => void;
  closeChat: () => void;
  addUnread: () => void;
  clearUnread: () => void;
  /** Consume and clear the pending initial message (used by ChatWidget after sending). */
  consumePendingMessage: () => string | null;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openChat = useCallback((initialMessage?: string) => {
    if (initialMessage?.trim()) setPendingMessage(initialMessage.trim());
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);

  const consumePendingMessage = useCallback(() => {
    const msg = pendingMessage;
    setPendingMessage(null);
    return msg;
  }, [pendingMessage]);

  const addUnread = useCallback(() => {
    setUnreadCount((c) => c + 1);
  }, []);

  const clearUnread = useCallback(() => setUnreadCount(0), []);

  const value: ChatContextValue = {
    isOpen,
    unreadCount,
    openChat,
    closeChat,
    addUnread,
    clearUnread,
    consumePendingMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return ctx;
}
