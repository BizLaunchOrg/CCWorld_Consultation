import type { Transaction } from '../types/training';

const MOCK_STORAGE_KEY = 'ccworld_transactions';

/**
 * Generate a short reference for display and reconciliation.
 */
function generateReference(): string {
  const prefix = 'TXN';
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${time}-${rand}`;
}

/**
 * Get stored transactions (mock). Replace with Supabase when client is available.
 */
function getStoredTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTransactions(list: Transaction[]): void {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(list));
}

/**
 * Create a transaction/order record. Stub: stores in localStorage; later plug Supabase.
 */
export async function createTransaction(params: {
  user_id?: string | null;
  training_id: string;
  amount: number;
  currency: string;
  status?: Transaction['status'];
}): Promise<Transaction> {
  const id = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const created_at = new Date().toISOString();
  const reference = generateReference();
  const transaction: Transaction = {
    id,
    user_id: params.user_id ?? null,
    training_id: params.training_id,
    amount: params.amount,
    currency: params.currency,
    status: params.status ?? 'pending',
    created_at,
    reference,
  };

  const list = getStoredTransactions();
  list.push(transaction);
  saveTransactions(list);

  // Later: await supabase.from('transactions').insert(transaction);
  return Promise.resolve(transaction);
}

/**
 * Update transaction status (e.g. after Paystack verification). Stub.
 */
export async function updateTransactionStatus(
  id: string,
  status: Transaction['status']
): Promise<void> {
  const list = getStoredTransactions();
  const idx = list.findIndex((t) => t.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], status };
    saveTransactions(list);
  }
  // Later: await supabase.from('transactions').update({ status }).eq('id', id);
}
