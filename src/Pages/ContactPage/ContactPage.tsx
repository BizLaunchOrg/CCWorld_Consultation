import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  submitContactForm,
  CONTACT_SEND_TO_OPTIONS,
  type ContactSendTo,
} from '../../lib/contactSubmissions';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sendTo, setSendTo] = useState<ContactSendTo>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    const { error } = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      send_to: sendTo,
      subject: subject.trim() || undefined,
      message: message.trim(),
    });
    setSubmitting(false);
    if (error) {
      alert(error.message);
      return;
    }
    setSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  if (success) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 pt-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Message sent</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your message has been received and will be routed to the right team. We&apos;ll get back to you soon.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90"
          >
            Back to Home <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 pt-24">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-primary">Contact Us</span>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Send your message to the right team. Choose where it should go below.
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full name"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Send my message to *</label>
            <select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value as ContactSendTo)}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {CONTACT_SEND_TO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subject (optional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief subject"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Your message..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {submitting ? 'Sending…' : 'Send message'}
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </main>
  );
}
