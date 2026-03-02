import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ChatContextValue {
  isOpen: boolean;
  unreadCount: number;
  openChat: () => void;
  closeChat: () => void;
  addUnread: () => void;
  clearUnread: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);

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
