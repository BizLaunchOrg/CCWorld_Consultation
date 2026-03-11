import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Shown when user is logged in but email is not confirmed.
 * Blocks booking flows until confirmed.
 */
export function EmailConfirmationBanner() {
  const { user, isEmailConfirmed, resendConfirmation } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<'idle' | 'sent' | 'error'>('idle');

  if (!user || isEmailConfirmed) return null;

  async function handleResend() {
    setSending(true);
    setMessage('idle');
    const { error } = await resendConfirmation();
    setSending(false);
    setMessage(error ? 'error' : 'sent');
  }

  return (
    <div
      className="bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3"
      role="alert"
    >
      <p className="text-sm font-medium">
        Please confirm your email address to book consultatings and pay for training. Check your inbox for the confirmation link.
      </p>
      <div className="flex items-center gap-3">
        {message === 'sent' && (
          <span className="text-sm text-green-600 dark:text-green-400">Check your email</span>
        )}
        {message === 'error' && (
          <span className="text-sm text-red-600 dark:text-red-400">Failed to send. Try again.</span>
        )}
        <button
          type="button"
          onClick={handleResend}
          disabled={sending}
          className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 font-semibold text-sm disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Resend confirmation email'}
        </button>
      </div>
    </div>
  );
}
