import { Link, useLocation } from 'react-router-dom';

export function HomePage() {
  const location = useLocation();
  const adminDenied = (location.state as { adminDenied?: boolean })?.adminDenied;
  const tickerItems = [
    { icon: 'warning', text: 'AML THRESHOLD BREACH DETECTED', color: 'text-teal-accent' },
    { icon: 'monitoring', text: 'KYC LATENCY: 1.2s', color: 'text-slate-400' },
    { icon: 'gavel', text: 'NEW REGULATORY DIRECTIVE #402', color: 'text-gold-accent' },
    { icon: 'shield', text: 'SOC2 COMPLIANCE VERIFIED', color: 'text-teal-accent' },
    { icon: 'sync', text: 'SYSTEM AUDIT LOG COMPLETE', color: 'text-slate-400' },
  ];

  const deliverables = [
    { icon: 'description', title: 'Board Framework', desc: 'Full policy suites approved by lead regulators.' },
    { icon: 'hub', title: 'Automated Tools', desc: 'Integration of world-class AML/KYC tech stacks.' },
    { icon: 'group_add', title: 'Talent Sourcing', desc: 'Headhunting certified compliance officers.' },
    { icon: 'fact_check', title: 'Risk Assessment', desc: 'Dynamic institutional risk profiling modules.' },
    { icon: 'receipt_long', title: 'Audit Readiness', desc: 'Permanent "Audit-Ready" state protocols.' },
    { icon: 'school', title: 'Staff Training', desc: 'Custom curriculum for all bank personnel.' },
    { icon: 'security', title: 'Cyber Governance', desc: 'IT risk management and security governance.' },
    { icon: 'analytics', title: 'BI Dashboards', desc: 'Real-time compliance performance visuals.' },
    { icon: 'partner_exchange', title: 'Liaison Support', desc: 'Direct representation with central banks.' },
  ];

  const trustLogos = [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_PjyPCNeizxiyJL1Gh4edxAt_N__d06EdpGcYwjSkTp4fRyEI09cl1AgoMKvsHmQ0mOs58qLiq6k4obnfWMybXw8SKwH7xwyCMBp6qZN6hyMGvBN9WnA0lrNI7nQLiP3kSZ3JqbCuettA2wQOb7_BkrUnwl1r_8LblqfqMfb5P9BV7FpoI-VMLEPPdLNcsyEKovJOB1EYyz6gfeARFHQ2XzABbdDbFalcESjRLoO66QrEppVmfgE0gZX_yiCqVrWRylVMlyENBg', alt: 'Global Banking Institution Logo 1' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwvJY5i3RajjAG-PJKbpO-uSEk9ffj_mtriMnxYroj-aazkPl4TnafmnqSNrBscDGXxpjaxsqBG0SFD58KFJWvS-rsn-fQDnYdgzOreT1zQkbverLzO-TGwPY1R7nl_s5zryCD50bxn75VWAw9SEIBvJVm61H_sMUobfgFvuj1IpEhBKVpWm426Ac9MPOognbASyigFt0ikEqztRXFuNgWAbq_d5P51kQan8r5MWh9ts7hE4HvQZkUqUoCZ4cLKNh6DqZ2sxrDlQ', alt: 'Fintech Unicorn Logo 2' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQtksXKbPjPyOSPvxtLXAZbTdEPxHH-yj67IktMeO5N-sbS-Ad4Bb63AOvuBi2CkcltkCCrcYkXbhdLFskjJgEWN1LbsfuUNSuLC4TiJ_yVjhaB32pVJ6U0tPvjpuJ5HSr0fZa42WzOilez-cQ5q3oRB20YeBHMGB7xMRl8G8SR99CAefQ8Vkosmdg6saud0dsb5fIIroXM3cys9J4iz0HfG4SIh14l4AzpMo037PJwEQJ9kgs7GoQhz-tUXa_SIg0flazT_9KA', alt: 'International Bank Logo 3' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeAfkv4JrM-2Hvs8P4lYZ0v9U_awDwbxorI5EO8A6CErE0QyzOU6pokcYSFvobmHdANE7zAONjzwkskJQk9U8B4pYqytaT4CKDX85mHVdmuJGPedpEeG5RbuwN1Lc2pj_xOQ12MJ1LUyIoN3vLkujqWOyM-A-DrcNRKrv17nGQJVGhj5DKZ4vWUzMRZ6jRrqaeqrTbw88qxqVwHQaGb4ZuKv-60gQZrCaSsD_418hpDXTYFuWZ3Cby7FhzEtyjLXXV5jnLQdwkuA', alt: 'Digital Asset Bank Logo 4' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_V78oZOeHXRej9YUeC9JTHvV0oxiQUTrc15n_snQgJdftm-mvQhGV0SMU6XPynbHK3SedSFmygKnPcOkcsMOycmn_Jx3WMWTsRlwlt3DYJESZtzkKLfniTZOE8sBsPA_WwLCqKwna2GuuVS4HEIBb4Z8Can4cIwxYxtJq8GFiUwECVQh9Prmp46Ozf1EMhOX-iO-nNnZBKDnDvCAQU5QrVOpPDu4YFWY9edbsPBJ0kO4ywltjisKmhgIl0sK0QdnO8VwrdoBxEw', alt: 'Payment Processor Logo 5' },
  ];

  const phaseImages = [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1S4GhzKb8tTecNMkOBB5ulqL8zzYGrxAeqb1Hma4c58_gySKMJSpsEfcuE0a0-hUvB8Bafj9Fq7uu_9pc-MSNfIwAvftdAL94g6KiAuYnV6CWvE9ZylsZhtsuUweeHZXVBAVsXuzCIsEp042sVK76AJ90emXOeDPMXFQ4uUeutPjKhUXZ9YQ98eVDWONZ5bV2OQthDvV32fwrLcyeMdXD_YRdUvTij_kaYfFOLcW-O45BMxlAYiqTvjJyfhBz3rNUtGO0KPysA', alt: 'Data analysis visualization and audit report', title: 'Phase I: Intelligence Gathering', text: 'Deep dive into current tech stack, licensing terms, and historical regulatory feedback. We identify vulnerabilities before auditors do.', active: true },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOfjRUcwOdwZhHPijjI_vsA_l5e_ZnQILNfVRalon2fPDMyhCUH7L5X_uhOUWmKyxtmN9W6wmPw8VT8JoV2melbV3Z8CDYob2LgK3nQl5vcElRNSm4I3hy4zIMfEjgcXuZCsCFtywk5DPi3LF8t0XRdDnFx6RnKRYwwfCK89XbKzLbp_uV1I9TR9eAlnmox7tYqvIWDTFcdHr9WDy3AkAWbOd114yqNzJZjsfbwXsmIWiNvQAElQMVs09oIq_WUr-p4JQaLZ4tNg', alt: 'Network security and integration map', title: 'Phase II: Structural Hardening', text: 'Deployment of automated screening tools, board-ready reporting pipelines, and localized compliance protocols.', active: false },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCga9J026Brxc9fmUopUCBf6TEyp-7UBb74NqAiX3buD2YlbafvRZDyiyRNFcUNLu6AD8XcH9bZIBDkydk8rz0nt_nHijYXkda59h-6THZb2jGqiEcBU8OVhIm1rpP0ztm3oGy6oomvLz_nuTF4gNDET2DufnSbvgiW9wvDsPq8MkJSE1ygcVGA-9QRXrBBUL9ilFs_45s2jvRxiESG_7GPFE9w-83oe50PchLJZ86maVf3Md95Tw_FJkP3ysnp6x2uKF0tLVdSdw', alt: 'Dashboard showing 100% compliance status', title: 'Phase III: Autonomy', text: 'Final stress tests, regulatory handover, and team certification. Your department is now fully operational and autonomous.', active: false },
  ];

  return (
    <main className="flex-1">
      {adminDenied && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-200 text-center py-2 px-4 text-sm font-medium">
          Admin access is restricted to authorized emails only.
        </div>
      )}
      {/* Hero Section */}
      <section className="relative mesh-gradient overflow-hidden px-6 py-24 lg:py-40">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-2/3 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-accent" />
              </span>
              Next-Gen Compliance Standards
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
              Equipping and Building an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-primary">Effective</span>{' '}
              Compliance Department
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Cinematic compliance consultancy for banks and fintechs focusing on building and operationalizing excellence through rigorous frameworks and automated intelligence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/consultation"
                className="px-8 py-4 bg-teal-accent text-background-dark text-base font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center gap-2"
              >
                Request a Consultating <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                to="/training"
                className="px-8 py-4 border-2 border-gold-accent/50 text-gold-accent text-base font-black rounded-xl hover:bg-gold-accent/10 transition-all flex items-center gap-2"
              >
                Trainings <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/3 hidden lg:block">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="h-2 w-24 bg-teal-accent/30 rounded-full" />
                  <div className="flex justify-between items-end h-32 gap-2">
                    <div className="w-full bg-primary/40 rounded-t-sm h-[40%]" />
                    <div className="w-full bg-primary/60 rounded-t-sm h-[60%]" />
                    <div className="w-full bg-teal-accent/80 rounded-t-sm h-[90%]" />
                    <div className="w-full bg-primary/50 rounded-t-sm h-[50%]" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-slate-100 dark:bg-background-dark border-y border-slate-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-600 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">
            Trusted by Global Financial Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {trustLogos.map(({ src, alt }) => (
              <img key={alt} className="h-8" alt={alt} src={src} />
            ))}
          </div>
        </div>
      </section>

      {/* Risk Ticker */}
      <section className="py-10 bg-primary/10 dark:bg-primary/5 overflow-hidden whitespace-nowrap border-y border-slate-200 dark:border-transparent">
        <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={`${item.text}-${i}`} className={`flex items-center gap-3 font-mono text-sm ${item.color}`}>
              <span className="material-symbols-outlined text-xs">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Core Deliverables */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Core Deliverables</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">We don&apos;t just advise; we build the infrastructure required to scale securely.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {deliverables.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl hover:border-teal-accent/30 transition-all group shadow-sm dark:shadow-none"
            >
              <span className="material-symbols-outlined text-teal-accent mb-4 group-hover:scale-110 transition-transform block">
                {icon}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Framework */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">The Framework</h2>
            <div className="h-1.5 w-24 bg-teal-accent mx-auto mt-6 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-background-dark p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">architecture</span>
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Architectural Baseline</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Structural assessment and risk appetite definition.</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-600">expand_more</span>
              </div>
            </div>
            <div className="border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-background-dark p-6 cursor-pointer border-l-4 border-l-teal-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="size-12 rounded-xl bg-teal-accent/20 flex items-center justify-center text-teal-accent">
                    <span className="material-symbols-outlined">settings_suggest</span>
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Operationalization Phase</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Embedding controls into live transaction workflows.</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-teal-accent">expand_less</span>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 grid grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span>
                    API Integration
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span>
                    Manual Override Workflow
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span>
                    Real-time Screening
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span>
                    SAR Generation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Method Timeline */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8">
              The 3-Phase <br />Signature Method
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
              Our proprietary engagement model ensures your compliance department isn&apos;t just a cost center, but a strategic advantage.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-900 dark:text-white font-bold">
                <span className="size-10 rounded-full bg-primary flex items-center justify-center text-white">1</span>
                Phase I: Discovery & GAP
              </div>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-500 font-bold">
                <span className="size-10 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center">2</span>
                Phase II: Integration
              </div>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-500 font-bold">
                <span className="size-10 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center">3</span>
                Phase III: Operational Handover
              </div>
            </div>
          </div>
          <div className="space-y-24">
            {phaseImages.map(({ src, alt, title, text, active }) => (
              <div key={title} className="relative pl-12 border-l-2 border-primary/30">
                <div
                  className={`absolute -left-[11px] top-0 size-5 rounded-full border-2 border-primary ${
                    active ? 'bg-primary shadow-[0_0_15px_rgba(17,82,212,0.8)]' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{title}</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                  <img className="w-full rounded-lg" alt={alt} src={src} />
                  <p className="text-slate-600 dark:text-slate-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-primary py-24 px-8 text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Ready to build a world-class compliance department?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/consultation"
              className="px-10 py-5 bg-white text-primary text-lg font-black rounded-xl hover:scale-105 transition-transform"
            >
              Speak to an Expert
            </Link>
            <button
              type="button"
              className="px-10 py-5 border-2 border-white text-white text-lg font-black rounded-xl hover:bg-white/10 transition-all"
            >
              View Case Studies
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
