import { useState, useMemo } from 'react';
import type { AdminTransaction } from '../../types/admin';
import { seedTransactions } from '../../data/adminSeed';
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
  const [transactions] = useState<AdminTransaction[]>(() => [...seedTransactions]);
  const [statusFilter, setStatusFilter] = useState<TxStatus>('all');
  const [selected, setSelected] = useState<AdminTransaction | null>(null);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter((t) => t.status === statusFilter);
  }, [transactions, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white md:hidden">Transactions</h1>
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
          <button
            type="button"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Export (placeholder)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tx) => (
          <ListCard
            key={tx.id}
            title={tx.reference}
            subtitle={tx.item_title ?? tx.type}
            meta={`${tx.customer_name} · ${formatDate(tx.created_at)}`}
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
            <p className="text-primary font-bold mt-2">{formatNGN(tx.amount_ngn)}</p>
          </ListCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-10 text-center text-slate-500 dark:text-slate-400">
          No transactions match your filters.
        </div>
      )}

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Transaction details"
      >
        {selected && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-2">
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Reference</span><br />{selected.reference}</p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Type</span><br />{selected.type}</p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Amount</span><br /><span className="text-primary font-bold">{formatNGN(selected.amount_ngn)}</span></p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Status</span><br />
                <span className={`font-bold ${selected.status === 'paid' ? 'text-teal-accent' : selected.status === 'pending' ? 'text-gold-accent' : 'text-red-500'}`}>
                  {selected.status}
                </span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-2">
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Customer</span><br />{selected.customer_name}</p>
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Email</span><br />{selected.customer_email}</p>
            </div>
            {selected.item_title && (
              <p><span className="text-slate-500 dark:text-slate-400 text-sm">Item</span><br />{selected.item_title}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">Created: {formatDate(selected.created_at)}</p>
            {/* TODO: Paystack verify — call edge function to verify reference and update status */}
            <button
              type="button"
              className="w-full py-3 rounded-2xl border-2 border-teal-accent/50 text-teal-accent font-bold hover:bg-teal-accent/10 transition-all"
            >
              Verify payment (placeholder)
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
