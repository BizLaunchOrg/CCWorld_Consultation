import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  submitContactForm,
  submitContactFormToFormspree,
  type ContactSendTo,
} from '../../lib/contactSubmissions';
import {
  SITE_PHONE,
  SITE_WHATSAPP_LINK,
  SITE_ADDRESS_LINES,
  SITE_EMAIL,
  SITE_OFFICE_HOURS,
} from '../../lib/siteConfig';

const SUBJECT_OPTIONS: { value: ContactSendTo; label: string }[] = [
  { value: 'company', label: 'Licensing Support' },
  { value: 'general', label: 'Regulatory Compliance' },
  { value: 'general', label: 'Corporate Training' },
  { value: 'opeyemi', label: 'Legal Consultation' },
];

export function ContactPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<ContactSendTo>('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    const messageWithCompany = company.trim()
      ? `Company: ${company.trim()}\n\n${message.trim()}`
      : message.trim();
    const subjectLabel = SUBJECT_OPTIONS.find((o) => o.value === subject)?.label ?? subject;
    const payload = {
      name: name.trim(),
      email: email.trim(),
      send_to: subject,
      subject: subjectLabel,
      message: messageWithCompany,
    };
    const { error } = await submitContactForm(payload);
    if (error) {
      setSubmitting(false);
      alert(error.message);
      return;
    }
    submitContactFormToFormspree({ ...payload, message: messageWithCompany }).catch(() => {});
    setSubmitting(false);
    setSuccess(true);
    setName('');
    setCompany('');
    setEmail('');
    setSubject('general');
    setMessage('');
  }

  if (success) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 pt-16">
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
    <main className="flex-1">
      {/* Hero */}
      <div className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col gap-6 md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Professional Consultation
            </div>
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Speak with our team about consultation, <span className="text-primary">licensing support</span>, or training.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal max-w-xl">
              Partner with industry experts to navigate complex regulatory landscapes with confidence and precision.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link
                to="/services"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-xl shadow-primary/30"
              >
                View Services
              </Link>
              <Link
                to="/about"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Our Approach
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img
                alt="Modern office meeting space"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMy-taTDUYw0oa-xUZDgMO3lXQSWdG_wrC5GNWcJU0FGPIphqoOb5YNr4h7ZCnHyTDxTFTDSjtutBcZLkScfRWiit-WyLTIl0FckgYzWTQwf8rtzUQ912Hdxk8jkmsk1QuW5GWrljk_VkmpyDxFt9W2tZdQ9kZQ1EHIDL09tLSSd2-z7yCj9cHIhysLQKlFIaz8YsGqqpmkf9hVwhirHVsdX9RSbWKMV2PnGjWk6AvJAqXFG_6cvRofR9ijtg5L04-Sl82j238-WGJ"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Detail Cards - no USA, use WhatsApp */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-20 px-6 md:px-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Reach out to our team in Lagos or via WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group flex flex-col p-8 bg-white dark:bg-background-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-2">Email us</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">For general enquiries and support.</p>
              <a className="text-primary font-bold text-sm hover:underline" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </div>
            <div className="group flex flex-col p-8 bg-white dark:bg-background-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-2">WhatsApp</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">Chat with our team directly.</p>
              <a className="text-primary font-bold text-sm hover:underline" href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{SITE_PHONE}</a>
            </div>
            <div className="group flex flex-col p-8 bg-white dark:bg-background-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-2">Office hours</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">Available during business days.</p>
              <p className="text-primary font-bold text-sm">{SITE_OFFICE_HOURS}</p>
            </div>
            <div className="group flex flex-col p-8 bg-white dark:bg-background-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-2">Office</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">Our office in Nigeria.</p>
              <p className="text-primary font-bold text-sm">{SITE_ADDRESS_LINES.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-slate-900 dark:text-slate-100 text-4xl font-bold mb-6">General enquiry</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
              Please fill out the form below. A senior compliance officer will be assigned to your case and will respond within 24 business hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 shrink-0">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">Confidentiality guaranteed through NDA upon request.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 shrink-0">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">Licensed across major financial jurisdictions.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white mt-1 shrink-0">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">Direct access to regulatory experts, not just account managers.</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full name *</label>
                  <input
                    className="h-12 px-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                    placeholder="John Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Company</label>
                  <input
                    className="h-12 px-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                    placeholder="Acme Corp"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email address *</label>
                <input
                  className="h-12 px-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                  placeholder="john@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject *</label>
                <select
                  className="h-12 px-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as ContactSendTo)}
                  required
                >
                  {SUBJECT_OPTIONS.map((opt, i) => (
                    <option key={`${opt.label}-${i}`} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message *</label>
                <textarea
                  className="p-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white resize-none"
                  placeholder="How can we help you?"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send message'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ strip - no USA regions */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 overflow-x-auto pb-4 md:pb-0">
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-primary font-bold">FAQ:</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">Response time?</p>
                <p className="text-sm font-bold">24 hours</p>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Initial consultation?</p>
                <p className="text-sm font-bold">Complimentary</p>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Regions?</p>
                <p className="text-sm font-bold">Nigeria, West Africa & global</p>
              </div>
            </div>
            <Link to="/insights" className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
              View insights
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
