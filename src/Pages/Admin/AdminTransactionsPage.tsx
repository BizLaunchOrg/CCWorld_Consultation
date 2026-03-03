import { useState, useEffect } from 'react';
import type { TrainingOrderWithProduct } from '../../lib/adminTrainingOrders';
import { fetchAdminTrainingOrders } from '../../lib/adminTrainingOrders';
import { ListCard } from '../../components/admin/ListCard';
import { Drawer } from '../../components/admin/Drawer';

type TxStatus = 'all' | 'pending' | 'paid' | 'failed';

function formatNGN(n: number): string {
  return `NGN ${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function AdminTransactionsPage() {
  const [orders, setOrders] = useState<TrainingOrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TxStatus>('all');
  const [selected, setSelected] = useState<TrainingOrderWithProduct | null>(null);

  useEffect(() => {
    fetchAdminTrainingOrders().then((list) => {
      setOrders(list);
      setLoading(false);
    });
  }, []);

  const filtered =
    statusFilter === 'all'
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-slate-500 dark:text-slate-400">Loading orders…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Orders</h1>
        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <span className="px-3 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-white/10">Status</span>
            {(['all', 'pending', 'paid', 'failed'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize ${
                  statusFilter === f ? 'bg-gold-accent/20 text-gold-accent' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tx) => (
          <ListCard
            key={tx.id}
            title={tx.provider_reference || tx.id}
            subtitle={tx.training_products?.name ?? 'Training'}
            meta={formatDate(tx.created_at)}
            badge={
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  tx.status === 'paid'
                    ? 'bg-teal-accent/15 text-teal-accent'
                    : tx.status === 'pending'
                      ? 'bg-gold-accent/15 text-gold-accent'
                      : 'bg-red-500/15 text-red-500'
                }`}
              >
                {tx.status}
              </span>
            }
            onClick={() => setSelected(tx)}
          >
            <p className="text-primary font-bold mt-2">{formatNGN(tx.amount)}</p>
            {(tx.profiles?.email || tx.profiles?.name) && (
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 truncate" title={tx.profiles?.email ?? undefined}>
                {tx.profiles?.name || tx.profiles?.email}
              </p>
            )}
          </ListCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No orders match your filters.
        </div>
      )}

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Order details"
      >
        {selected && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-2">
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Reference</span><br />{selected.provider_reference || selected.id}</p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Product</span><br />{selected.training_products?.name ?? '—'}</p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Amount</span><br /><span className="text-primary font-bold">{formatNGN(selected.amount)}</span></p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Status</span><br />
                <span className={`font-bold ${selected.status === 'paid' ? 'text-teal-accent' : selected.status === 'pending' ? 'text-gold-accent' : 'text-red-500'}`}>
                  {selected.status}
                </span>
              </p>
              {(selected.profiles?.name || selected.profiles?.email) && (
                <>
                  <p><span className="text-slate-500 dark:text-slate-400 text-sm">Customer</span><br />{selected.profiles?.name || '—'}</p>
                  <p><span className="text-slate-500 dark:text-slate-400 text-sm">Email</span><br /><a href={`mailto:${selected.profiles?.email}`} className="text-teal-accent hover:underline">{selected.profiles?.email ?? '—'}</a></p>
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Created: {formatDate(selected.created_at)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">User ID: {selected.user_id}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
