import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { EngagementType, LicensingStage } from '../../types/admin';
import { useAuth } from '../../contexts/AuthContext';
import { createConsultation } from '../../lib/consultations';

const ENGAGEMENT_OPTIONS: { value: EngagementType; label: string }[] = [
  { value: 'licensing_pssp', label: 'Licensing Advisory: PSSP' },
  { value: 'licensing_ptsp', label: 'Licensing Advisory: PTSP' },
  { value: 'licensing_sandbox', label: 'Licensing Advisory: Regulatory Sandbox' },
  { value: 'training', label: 'Training' },
  { value: 'advisory', label: 'Advisory (Risk review & recommendation)' },
];

const LICENSING_STAGES: { value: LicensingStage; label: string }[] = [
  { value: 'pre_application', label: 'Pre-application' },
  { value: 'aip', label: 'AIP' },
  { value: 'existing_ops', label: 'Existing Ops' },
  { value: 'not_sure', label: 'Not sure' },
];

const ORG_TYPES = [
  { value: 'bank', label: 'Bank', desc: 'Established commercial banking', icon: 'account_balance' },
  { value: 'fintech', label: 'Fintech', desc: 'Digital-first services', icon: 'payments' },
  { value: 'imto', label: 'IMTO', desc: 'Money Transfer Ops', icon: 'language' },
  { value: 'other', label: 'Other', desc: 'Type your organization below', icon: 'business' },
] as const;

const TEAM_SIZES = ['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'];
const REGIONS = ['Lagos', 'Abuja', 'Port Harcourt', 'Other (Nigeria)'];
const TIME_SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:45 PM'];

/** Parse "09:00 AM" -> { hours: 9, minutes: 0 }, "02:00 PM" -> { hours: 14, minutes: 0 } */
function parseTimeSlot(slot: string): { hours: number; minutes: number } {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 9, minutes: 0 };
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (match[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (match[3].toUpperCase() === 'AM' && h === 12) h = 0;
  return { hours: h, minutes: m };
}

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

function getServiceLabel(engagementType: EngagementType, orgType: string, customOrg?: string): string {
  if (engagementType === 'licensing_pssp') return 'Licensing Advisory: PSSP';
  if (engagementType === 'licensing_ptsp') return 'Licensing Advisory: PTSP';
  if (engagementType === 'licensing_sandbox') return 'Licensing Advisory: Regulatory Sandbox';
  if (engagementType === 'training') return 'Training';
  if (engagementType === 'advisory') return 'Advisory (Risk review & recommendation)';
  if (orgType === 'bank') return 'Compliance Advisory for Banks';
  if (orgType === 'fintech') return 'Compliance Advisory for Fintechs';
  if (orgType === 'imto') return 'Compliance Advisory for IMTOs';
  return customOrg ? `Compliance Advisory for ${customOrg}` : 'Compliance Advisory';
}

const isLicensingEngagement = (e: EngagementType) =>
  e === 'licensing_pssp' || e === 'licensing_ptsp' || e === 'licensing_sandbox';

export function ConsultationPage() {
  const navigate = useNavigate();
  const { user, isEmailConfirmed } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() + 1, date: t.getDate() };
  }, []);

  // Step 1
  const [engagementType, setEngagementType] = useState<EngagementType>('advisory');
  const [licensingStage, setLicensingStage] = useState<LicensingStage>('not_sure');
  const [licensingNote, setLicensingNote] = useState('');
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

  // Step 2 – personal details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLicensingEngagement(engagementType) && !licensingNote?.trim()) return;
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const consultationDate =
    selectedYear != null && selectedMonth != null && selectedDay != null
      ? `${MONTH_NAMES[selectedMonth - 1]} ${selectedDay}, ${selectedYear}`
      : '';
  const consultationTimeSlot = selectedTime ? `${selectedTime} (WAT)` : '';

  async function submitConsultationRequest(payload: {
    fullName: string;
    email: string;
    phone: string;
    companyName?: string;
    jobTitle?: string;
    service: string;
    engagement_type?: EngagementType;
    license_type?: 'pssp' | 'ptsp' | 'sandbox';
    stage?: LicensingStage;
    note: string;
    consultationDate?: string;
    consultationTime?: string;
    teamSize: string;
    region: string;
    gap?: string;
  }) {
    if (!user) {
      navigate('/login', { state: { from: '/consultation', message: 'Please sign in to book a consultation.' } });
      return { success: false };
    }
    if (!isEmailConfirmed) {
      return { success: false };
    }
    if (!payload.consultationDate || !payload.consultationTime) {
      return { success: false };
    }
    const { hours, minutes } = parseTimeSlot(payload.consultationTime);
    const [monthName, dayStr, yearStr] = payload.consultationDate.replace(/,/g, '').split(/\s+/);
    const month = MONTH_NAMES.indexOf(monthName) + 1;
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    const scheduledAt = new Date(year, month - 1, day, hours, minutes).toISOString();

    const { data, error } = await createConsultation({
      topic: payload.service,
      scheduled_at: scheduledAt,
      details: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        companyName: payload.companyName,
        jobTitle: payload.jobTitle,
        engagement_type: payload.engagement_type,
        license_type: payload.license_type,
        stage: payload.stage,
        note: payload.note,
        teamSize: payload.teamSize,
        region: payload.region,
        gap: payload.gap,
      },
    });
    if (error) throw error;
    return { success: !!data };
  }

  function resetForm() {
    setStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setJobTitle('');
    setEngagementType('advisory');
    setLicensingStage('not_sure');
    setLicensingNote('');
    setCustomOrgName('');
    setOrgType('bank');
    setTeamSize(TEAM_SIZES[0]);
    setRegion(REGIONS[0]);
    setGap('');
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedDay(null);
    setSelectedTime('09:00 AM');
    setDisplayYear(today.year);
    setDisplayMonth(today.month);
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) return;
    if (isLicensingEngagement(engagementType) && !licensingNote?.trim()) return;
    if (!user) {
      navigate('/login', { state: { from: '/consultation' } });
      return;
    }
    if (!isEmailConfirmed) return;
    if (!consultationDate || !consultationTimeSlot) {
      return;
    }
    setSubmitting(true);
    const note = isLicensingEngagement(engagementType) ? licensingNote.trim() : (gap?.trim() || '');
    const licenseType = engagementType === 'licensing_pssp' ? 'pssp' : engagementType === 'licensing_ptsp' ? 'ptsp' : engagementType === 'licensing_sandbox' ? 'sandbox' : undefined;
    try {
      await submitConsultationRequest({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        companyName: companyName.trim() || undefined,
        jobTitle: jobTitle.trim() || undefined,
        service: getServiceLabel(engagementType, orgType, customOrgName),
        engagement_type: engagementType,
        license_type: licenseType,
        stage: isLicensingEngagement(engagementType) ? licensingStage : undefined,
        note,
        consultationDate: consultationDate || undefined,
        consultationTime: consultationTimeSlot || undefined,
        teamSize,
        region,
        gap: gap.trim() || undefined,
      });
      setSuccessModalOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Booking failed. Try again.';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!successModalOpen) return;
    const el = modalRef.current;
    if (!el) return;
    const focusables = el.querySelectorAll<HTMLElement>('button, [href]');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSuccessModalOpen(false);
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [successModalOpen]);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 pt-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-primary">Consultation</span>
      </div>

      {!user && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-sm">
          <Link to="/login" state={{ from: '/consultation' }} className="font-semibold underline">
            Sign in
          </Link>
          {' '}to book a consultation. If you don&apos;t have an account,{' '}
          <Link to="/signup" className="font-semibold underline">create one</Link>.
        </div>
      )}

      {/* Step 1: Org details + Schedule */}
      {step === 1 && (
        <>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Book Your Compliance Consultation
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Tailored compliance guidance for Banks, Fintechs, and IMTOs in Nigeria.
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
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">What do you want to engage us for?</p>
                  <select
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value as EngagementType)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-slate-900 dark:text-white"
                  >
                    {ENGAGEMENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {isLicensingEngagement(engagementType) && (
                  <div className="rounded-xl border-2 border-teal-accent/20 bg-teal-accent/5 dark:bg-teal-accent/10 p-4 space-y-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Licensing details</p>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Company name (optional)</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your company name"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Stage</label>
                      <select
                        value={licensingStage}
                        onChange={(e) => setLicensingStage(e.target.value as LicensingStage)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-slate-900 dark:text-white"
                      >
                        {LICENSING_STAGES.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Note / message (required)</label>
                      <textarea
                        value={licensingNote}
                        onChange={(e) => setLicensingNote(e.target.value)}
                        placeholder="Tell us about your licensing needs, timeline, or questions..."
                        rows={4}
                        required={isLicensingEngagement(engagementType)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary placeholder:text-slate-400 px-4 py-3 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
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
                    required
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
                    Request Consultation
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Review & Submit (no payment) */}
      {step === 3 && (
        <div className="px-0 lg:px-4 py-8 lg:py-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="mb-12">
              <div className="flex gap-6 justify-between items-end mb-3 flex-wrap">
                <div>
                  <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Review & Submit
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                    Review your consultation request and submit. We&apos;ll get back to you shortly.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">Step 3 of 3</p>
                </div>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-primary w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">event_available</span>
                    Request Summary
                  </h3>
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
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Request for</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">{fullName || '—'}</span>
                    </div>
                    {companyName && (
                      <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">Company</span>
                        <span className="text-slate-900 dark:text-white font-medium text-right">{companyName}</span>
                      </div>
                    )}
                    {jobTitle && (
                      <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">Job Title</span>
                        <span className="text-slate-900 dark:text-white font-medium text-right">{jobTitle}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Service</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">{getServiceLabel(engagementType, orgType, customOrgName)}</span>
                    </div>
                    {isLicensingEngagement(engagementType) && (
                      <>
                        <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">License type</span>
                          <span className="text-slate-900 dark:text-white font-medium text-right">
                            {engagementType === 'licensing_pssp' ? 'PSSP' : engagementType === 'licensing_ptsp' ? 'PTSP' : 'Regulatory Sandbox'}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Stage</span>
                          <span className="text-slate-900 dark:text-white font-medium text-right">
                            {LICENSING_STAGES.find((s) => s.value === licensingStage)?.label ?? licensingStage}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Note / message</span>
                          <span className="text-slate-900 dark:text-white font-medium text-right text-sm whitespace-pre-wrap">{licensingNote || '—'}</span>
                        </div>
                      </>
                    )}
                    {consultationDate && (
                      <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">Preferred date</span>
                        <span className="text-slate-900 dark:text-white font-medium text-right">{consultationDate}</span>
                      </div>
                    )}
                    {consultationTimeSlot && (
                      <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">Preferred time</span>
                        <span className="text-slate-900 dark:text-white font-medium text-right">{consultationTimeSlot}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Duration</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right">60 Minutes</span>
                    </div>
                    <div className="flex justify-between items-start py-3">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Contact</span>
                      <span className="text-slate-900 dark:text-white font-medium text-right text-sm">{email}<br />{phone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">What happens next?</h3>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shrink-0 z-10 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">mail</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Instant confirmation</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">We&apos;ll send an email to {email || 'your email'} with your request details.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 z-10">
                        <span className="material-symbols-outlined text-lg">assignment</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Pre-consultation brief</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">We&apos;ll send a short questionnaire to make the most of our time together.</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 z-10">
                        <span className="material-symbols-outlined text-lg">videocam</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Meeting link & calendar</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">A calendar invite with a meeting link (Zoom or Google Meet) will be shared once we confirm.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xl">
                  <form onSubmit={handleSubmitRequest} className="space-y-6">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Confirm your details above, then submit your request. Our team will contact you via email or phone to confirm the consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                      >
                        Back to details
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 h-14 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-lg"
                      >
                        {submitting ? (
                          <>Submitting…</>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">send</span>
                            Submit Request
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success modal */}
      {successModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setSuccessModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-desc"
        >
          <div
            ref={modalRef}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 id="success-modal-title" className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Request received
            </h2>
            <p id="success-modal-desc" className="text-slate-600 dark:text-slate-400 mb-8">
              You&apos;ve successfully requested a consultation. We&apos;ll contact you shortly via email or phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSuccessModalOpen(false);
                  resetForm();
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Submit another request
              </button>
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
