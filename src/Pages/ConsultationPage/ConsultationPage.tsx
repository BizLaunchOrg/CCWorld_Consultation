import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CONSULTATION_FEE = 'NGN 450,000';

const ORG_TYPES = [
  { value: 'bank', label: 'Bank', desc: 'Established commercial banking', icon: 'account_balance' },
  { value: 'fintech', label: 'Fintech', desc: 'Digital-first services', icon: 'payments' },
  { value: 'imto', label: 'IMTO', desc: 'Money Transfer Ops', icon: 'language' },
  { value: 'other', label: 'Other', desc: 'Type your organization below', icon: 'business' },
] as const;

const TEAM_SIZES = ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'];
const REGIONS = ['Lagos', 'Abuja', 'Port Harcourt', 'Other (Nigeria)'];
const TIME_SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:45 PM'];

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isPastDate(year: number, month: number, day: number): boolean {
  const today = new Date();
  const d = new Date(year, month - 1, day);
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d < today;
}

function getServiceLabel(orgType: string, customOrg?: string): string {
  if (orgType === 'bank') return 'Regulatory Advisory for Banks';
  if (orgType === 'fintech') return 'Regulatory Advisory for Fintechs';
  if (orgType === 'imto') return 'Regulatory Advisory for IMTOs';
  return customOrg ? `Regulatory Advisory for ${customOrg}` : 'Regulatory Advisory';
}

export function ConsultationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const today = useMemo(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() + 1, date: t.getDate() };
  }, []);

  // Step 1
  const [orgType, setOrgType] = useState<string>('bank');
  const [customOrgName, setCustomOrgName] = useState('');
  const [teamSize, setTeamSize] = useState<string>(TEAM_SIZES[0]);
  const [region, setRegion] = useState<string>(REGIONS[0]);
  const [gap, setGap] = useState('');
  const [displayYear, setDisplayYear] = useState(today.year);
  const [displayMonth, setDisplayMonth] = useState(today.month);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>('09:00 AM');

  // Step 2 – personal details (no picture)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // Step 3 – payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/consultation/success', {
      state: {
        fullName: fullName || undefined,
        consultationDate: consultationDate || undefined,
        consultationTime: consultationTimeSlot || undefined,
        amount: CONSULTATION_FEE,
        service: getServiceLabel(orgType, customOrgName),
      },
    });
  };

  const consultationDate =
    selectedYear != null && selectedMonth != null && selectedDay != null
      ? `${MONTH_NAMES[selectedMonth - 1]} ${selectedDay}, ${selectedYear}`
      : '';
  const consultationTimeSlot = selectedTime ? `${selectedTime} (WAT)` : '';

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 pt-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-primary">Consultation</span>
      </div>

      {/* Step 1: Org details + Schedule */}
      {step === 1 && (
        <>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Book Your Compliance Consultation
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Tailored regulatory guidance for Banks, Fintechs, and IMTOs in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-xl font-bold">Organization Details</h2>
              </div>
              <form onSubmit={handleStep1} className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">What type of organization do you represent?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ORG_TYPES.map(({ value, label, desc, icon }) => (
                      <label
                        key={value}
                        className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          orgType === value ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="org_type"
                          value={value}
                          checked={orgType === value}
                          onChange={() => setOrgType(value)}
                          className="absolute top-4 right-4 text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className={`material-symbols-outlined mb-2 ${orgType === value ? 'text-primary' : 'text-slate-400'}`}>{icon}</span>
                        <span className="font-bold text-sm">{label}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</span>
                      </label>
                    ))}
                  </div>
                  {orgType === 'other' && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Organization name</label>
                      <input
                        type="text"
                        value={customOrgName}
                        onChange={(e) => setCustomOrgName(e.target.value)}
                        placeholder="e.g. Microfinance, Holding Company"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                      />
                      <p className="text-xs text-slate-500 mt-1">Type your organization — selection updates as you type.</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Team Size</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                    >
                      {TEAM_SIZES.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                    >
                      {REGIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">What is your biggest compliance gap today?</label>
                  <textarea
                    value={gap}
                    onChange={(e) => setGap(e.target.value)}
                    placeholder="e.g. AML/KYC automation, Licensing hurdles..."
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary placeholder:text-slate-400 px-4 py-3"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    Continue to Your Details
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Schedule a Slot</h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (displayMonth === 1) {
                          setDisplayYear((y) => y - 1);
                          setDisplayMonth(12);
                        } else setDisplayMonth((m) => m - 1);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      aria-label="Previous month"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px] text-center">
                      {MONTH_NAMES[displayMonth - 1]} {displayYear}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (displayMonth === 12) {
                          setDisplayYear((y) => y + 1);
                          setDisplayMonth(1);
                        } else setDisplayMonth((m) => m + 1);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      aria-label="Next month"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="text-[10px] uppercase font-bold text-slate-400">{d}</div>
                  ))}
                  {getCalendarCells(displayYear, displayMonth).map((day, i) =>
                    day === null ? (
                      <div key={`empty-${i}`} className="aspect-square flex items-center justify-center text-sm text-slate-300">—</div>
                    ) : (
                      <button
                        key={`${displayYear}-${displayMonth}-${day}`}
                        type="button"
                        disabled={isPastDate(displayYear, displayMonth, day)}
                        onClick={() => {
                          setSelectedYear(displayYear);
                          setSelectedMonth(displayMonth);
                          setSelectedDay(day);
                        }}
                        className={`aspect-square flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                          selectedYear === displayYear && selectedMonth === displayMonth && selectedDay === day
                            ? 'bg-primary text-white'
                            : isPastDate(displayYear, displayMonth, day)
                              ? 'text-slate-400 cursor-not-allowed opacity-60'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Available Times</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-sm font-medium rounded-lg border transition-colors ${
                          selectedTime === time ? 'border-primary text-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 flex gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                <div>
                  <h4 className="font-bold text-primary mb-1">Confidential Guarantee</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your data is protected under global banking security standards. All consultations are under strict NDA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 2: Personal details (name, email, phone, company, job – no picture) */}
      {step === 2 && (
        <>
          <div className="mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-wider">Step 2 of 3</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 mt-2">
              Your Details
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Tell us how to reach you and who will join the consultation.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
              <form onSubmit={handleStep2} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adebola Johnson"
                    required
                    className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent px-4 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent px-4 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent px-4 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Company / Organization</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name"
                    className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent px-4 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Head of Compliance"
                    className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent px-4 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    Continue to Confirm & Pay
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Confirm & Secure Session – show their details, only Lagos */}
      {step === 3 && (
        <div className="px-0 lg:px-4 py-8 lg:py-12">
          <div className="max-w-[1100px] mx-auto">
            {/* Progress */}
            <div className="mb-12">
              <div className="flex gap-6 justify-between items-end mb-3 flex-wrap">
                <div>
                  <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Confirm & Secure Session
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                    Review your consultation details and complete the secure payment.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">Step 3 of 3</p>
                  <p className="text-slate-900 dark:text-white text-lg font-bold">100% Complete</p>
                </div>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-primary w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Summary – their details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">event_available</span>
                    Consultation Summary
                  </h3>
                  {/* Consultant (no client picture) */}
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                    <div
                      className="size-14 rounded-lg bg-cover bg-center shrink-0"
                      style={{
                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlvniWvz9n1uXeViPmsDW4ZJInoIWDZR9C6VTIaHNsZpyBuvjhL7BfcrKC33uNr8asfgZsHiDLhgZzm9odIQ1CQGRZS3ku7UzjEJGpl_XVQVXgXmyGnmZVuHNBCMj01JAO8R6_euLBat5BzYWlTAln3-fgyfMbAZ7bSiG48pswT9XnixRaZtqeX4FB2FlP01uMHQDOl4UY-7ZT9sGYTYzg38t073M1oDFoyEpnWyL4QOaJt39nqQQRNImHkCi8ayC4QS0ngFkljw')`,
                      }}
                      role="img"
                      aria-label="Portrait of Dr. Sarah Adebayo"
                    />
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold">Dr. Sarah Adebayo</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm italic">Senior Compliance Lead (Fintech)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Booking for</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">{fullName || '—'}</span>
                    </div>
                    {companyName && (
                      <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">Company</span>
                        <span className="text-slate-900 dark:text-white font-medium text-right">{companyName}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Service</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">{getServiceLabel(orgType, customOrgName)}</span>
                    </div>
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Date & Time</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">
                        {consultationDate}
                        <br />
                        {consultationTimeSlot} · 60 Minutes
                      </span>
                    </div>
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Duration</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">60 Minutes</span>
                    </div>
                    <div className="flex justify-between items-start pt-3">
                      <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">Session Fee</span>
                      <span className="text-primary text-xl font-extrabold tracking-tight">{CONSULTATION_FEE}</span>
                    </div>
                  </div>
                </div>

                {/* What happens next */}
                <div className="p-6">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">What happens next?</h3>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shrink-0 z-10 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">mail</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Instant Confirmation</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Receive an email at {email || 'your email'} with your session details and receipt.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 z-10">
                        <span className="material-symbols-outlined text-lg">assignment</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Pre-consultation Brief</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">We&apos;ll send a brief questionnaire to maximize our time together.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 z-10">
                        <span className="material-symbols-outlined text-lg">videocam</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Zoom Link & Calendar</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Calendar invite with a secure meeting link will be shared.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Payment */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">Secure Payment</h3>
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-slate-400">lock</span>
                      <span className="text-slate-400 text-xs font-medium uppercase mt-1">SSL Encrypted</span>
                    </div>
                  </div>
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`relative flex flex-col p-4 rounded-xl cursor-pointer group border-2 transition-colors ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="absolute opacity-0"
                        />
                        <span className={`material-symbols-outlined mb-2 ${paymentMethod === 'card' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>credit_card</span>
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Card Payment</span>
                        <span className="text-slate-500 text-[10px] mt-1">Visa, Mastercard, AMEX</span>
                      </label>
                      <label
                        className={`relative flex flex-col p-4 rounded-xl cursor-pointer group border-2 transition-all ${
                          paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'transfer'}
                          onChange={() => setPaymentMethod('transfer')}
                          className="absolute opacity-0"
                        />
                        <span className={`material-symbols-outlined mb-2 ${paymentMethod === 'transfer' ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>account_balance</span>
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Bank Transfer</span>
                        <span className="text-slate-500 text-[10px] mt-1">Bank Transfer</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Johnathan Doe"
                            className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white px-4"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white px-4"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expiry Date</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM / YY"
                              className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white px-4"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white px-4"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="submit"
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-lg"
                      >
                        <span className="material-symbols-outlined">security</span>
                        Pay {CONSULTATION_FEE} & Secure Slot
                      </button>
                      <div className="flex flex-wrap justify-center items-center gap-6 grayscale opacity-60">
                        <span className="font-black text-slate-900 dark:text-white text-sm">paystack</span>
                        <span className="font-black text-slate-900 dark:text-white text-sm tracking-tight">flutterwave</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">verified</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">PCI-DSS Compliant</span>
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs text-center max-w-xs leading-relaxed">
                        Your payment is processed securely. We do not store your full card details on our servers.
                      </p>
                    </div>
                  </form>
                </div>
                <div className="mt-8 flex justify-between items-center text-sm px-2 flex-wrap gap-4">
                  <a href="#" className="text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-lg">help_outline</span>
                    Refund & Cancellation Policy
                  </a>
                  <span className="text-slate-500">
                    Need help? <a href="#" className="text-primary font-bold">Chat with us</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Presence – Lagos only */}
      {step === 1 && (
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Our Office</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Headquartered in Lagos, serving financial institutions across Nigeria.
            </p>
          </div>
          <div className="relative w-full aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-overlay">
              <img
                className="w-full h-full object-cover"
                alt="Map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmzlZJpuzv4YkXkN7ugVxZHpeG_a7JwB69oY4IvqJuA5DhMvcC8F3V4dUbKWI1-fLf6SiK_6D0TpY3lEOmx5CgCCzptupD8YXge02ajiGaxhHFc2fKvoLasZBSGkG2cz1Maz7oHDUmcMklNS-83_BQwunZqSPP2pUynVrly4MixPfc9ppjhYj_Bm9sdeWeh5LGsboxwHZgzBsQBmaQhaq1p4QMqDJCiMdihu-M3VaVvXOyeF9C11UYdU2SEFebvH_uHchbUNPqMA"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">HQ</p>
                <p className="font-bold text-white">Lagos, Nigeria</p>
                <p className="text-xs text-slate-300">Victoria Island, Lagos</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
