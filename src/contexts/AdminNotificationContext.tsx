import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { markAllMessagesAsReadForAdmin } from '../lib/chatApi';

export type AdminNotificationType = 'message' | 'transaction' | 'consultation';

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  title: string;
  /** For message: conversation id to open. For transaction/consultation: row id. */
  targetId: string;
  link: string;
  createdAt: string;
}

interface AdminNotificationContextValue {
  notifications: AdminNotification[];
  count: number;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: string) => void;
  /** Navigate to the notification target and clear it (e.g. open conversation, scroll to transaction). */
  goToNotification: (n: AdminNotification) => void;
}

const AdminNotificationContext = createContext<AdminNotificationContextValue | null>(null);

export function AdminNotificationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const idRef = useRef(0);

  const count = notifications.length;

  const addNotification = useCallback((n: Omit<AdminNotification, 'id' | 'createdAt'>) => {
    idRef.current += 1;
    const id = `notif-${idRef.current}-${Date.now()}`;
    setNotifications((prev) => [
      { ...n, id, createdAt: new Date().toISOString() },
      ...prev.filter((x) => !(x.type === n.type && x.targetId === n.targetId)).slice(0, 49),
    ]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await markAllMessagesAsReadForAdmin();
    } catch {
      // ignore
    }
    setNotifications([]);
  }, []);

  const goToNotification = useCallback(
    (n: AdminNotification) => {
      removeNotification(n.id);
      if (n.type === 'message') {
        navigate('/admin/messages', { state: { openConversationId: n.targetId } });
      } else if (n.type === 'transaction') {
        navigate('/admin/transactions', { state: { highlightTransactionId: n.targetId } });
      } else if (n.type === 'consultation') {
        navigate('/admin/consultations', { state: { highlightConsultationId: n.targetId } });
      }
    },
    [navigate, removeNotification]
  );

  useEffect(() => {
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          const row = payload.new as { id: string; conversation_id: string; sender_role: string; body: string };
          if (row.sender_role !== 'user') return;
          addNotification({
            type: 'message',
            title: 'New chat message',
            targetId: row.conversation_id,
            link: '/admin/messages',
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'training_orders' },
        (payload) => {
          const row = payload.new as { id: string; amount: number; status: string };
          addNotification({
            type: 'transaction',
            title: `New order ${row.status === 'paid' ? ' (paid)' : ''} — NGN ${Number(row.amount).toLocaleString()}`,
            targetId: row.id,
            link: '/admin/transactions',
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'consultations' },
        (payload) => {
          const row = payload.new as { id: string; topic: string };
          addNotification({
            type: 'consultation',
            title: `New consultation: ${row.topic || 'Request'}`,
            targetId: row.id,
            link: '/admin/consultations',
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addNotification]);

  const value: AdminNotificationContextValue = {
    notifications,
    count,
    markAllAsRead,
    removeNotification,
    goToNotification,
  };

  return (
    <AdminNotificationContext.Provider value={value}>
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications(): AdminNotificationContextValue {
  const ctx = useContext(AdminNotificationContext);
  if (!ctx) throw new Error('useAdminNotifications must be used within AdminNotificationProvider');
  return ctx;
}
