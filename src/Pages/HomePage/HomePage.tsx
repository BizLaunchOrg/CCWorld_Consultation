import { Link, useLocation } from 'react-router-dom';

const COMPLIANCE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB6LJpc4vGHasROqBiQc7yRvyOSq0QGTmUZn6XcXr38VESoGVongxpQQgNPiqwTKEk0YJSbOoHxWKcdnSrgU1upHv9dqvlVtbwfbqeG05a7mwpQalkSNx0bGmIVHf7c4qqNdCa5UKUQksvIIor8qKDomdO7djIgzzTYZGNIpBmLCUf5GiGfWnlCYjdVRvWATFtle9QaFuSadjDn-uHvg51Mtrs-M1dq7PUapYNq8ypLq7Xmk-tguwhdH1uKPQVlkshLUVMEc5pXTJg';

export function HomePage() {
  const location = useLocation();
  const adminDenied = (location.state as { adminDenied?: boolean })?.adminDenied;

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

  const frameworkPillars = [
    { title: 'Governance', desc: 'Establishing board-level oversight and clear lines of accountability across the organization.' },
    { title: 'People', desc: 'Recruiting and training specialized talent equipped for the modern regulatory landscape.' },
    { title: 'Policies', desc: 'Developing living documentation that evolves with both the business and the law.' },
    { title: 'Technology', desc: 'Leveraging RegTech tools for real-time monitoring and automated screening.' },
    { title: 'Processes', desc: 'Optimizing internal workflows to minimize friction while maintaining strict control.' },
    { title: 'Assurance', desc: 'Continuous testing and internal audits to prove framework effectiveness.' },
  ];

  const testimonials = [
    { quote: '"Their approach to our PTSP license application was surgical. They didn\'t just tell us what to do; they built the department with us."', name: 'Head of Compliance', org: 'Tier 1 Commercial Bank', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3IDhQNkJaqg0Yxx4LYmzGl0MBmWrRunQUlGcAa8ke9Ws9IX-H11OxgXtN51Al-LCQBDyq4EfQ3uz2HHS9JIJEzdPdEOaX1cY_suwYPRucEs3-XQiV2oNqXBKyrTXnB4d5SS71TR7xs1mZxAtlDP-IqJx48W5ePhK7QHyldwQGF9KOjvA3LT5pMgv1Nw7ly1MMqOnXPc8Unsw2T5pJNs-EkTJ1yJxeSnkfTDOORrf39f1jMpAf70nyHPvAtlKbvVTJ9bwx7OjGU2M' },
    { quote: '"The training modules provided to our AML team transformed our reporting efficiency by 40%. Highly professional."', name: 'CEO & Founder', org: 'Regional Fintech Unicorn', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHLmqoI-fPJF6HJA4b7-bILwqNN4Z4vvBuHUEkj53p3IIGkkWeTiVi79KE8qWdD_uJ7XQZXkpmbfFVz7DVE-pinTcqpOzUXgLu0OEWb_qYgPvNl_tesBZxlIpUKb5HigUQqF-0HuCXmDVDrlyukz9bOpt2cbD-WCEfhe7iTJ7pwgUCZ1QMM4ZWrC524W_5GNZjo5RhjCK-rE7W4auix_lqAnAwl-Gn8EqSJhfvwSbQyZRq3mYy6OSGMYRXrpLIV9azoLOZPYAcP_w' },
    { quote: '"Trustworthy, responsive, and incredibly deep knowledge of Central Bank regulations across multiple African markets."', name: 'Director of Ops', org: 'Global Money Transfer Org', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMYRYcn13D2qbYKsGPx2laAlUSlHPAuSSanJY9Dyq3EjzEBJjHBb5qYm4z4HRg-fNT8MBcyFchMFWn_nB3kS-5td1mIx04XASXDOcmbfYGFLQU3yg1rz4xH0kDYFTP8W6HiGEHOUmXhvqNFhEdxk63GW8QfDgqnSoSk4ICkEdapb7__qGI-xSAqs_veL8-TgqR5RlL7qToriPczEeiyI_MV2xct2WbLvDHI9S-9gF2uocVI5urej81YUSIQ8duBfmS7y-iboeU1X0' },
  ];

  return (
    <main className="flex-1">
      {adminDenied && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-200 text-center py-2 px-4 text-sm font-medium">
          Admin access is restricted to authorized emails only.
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-[60%]">
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-charcoal dark:text-white md:text-7xl">
                Build a stronger <span className="text-primary">compliance</span> function with clear structure.
              </h1>
              <p className="mt-8 max-w-xl text-lg text-charcoal/70 leading-relaxed">
                Strategic regulatory consulting for high-growth financial institutions and fintechs. We move beyond manual checks to integrated governance frameworks.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/consulting"
                  className="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  Request Consultation
                </Link>
                <Link
                  to="/training"
                  className="rounded-lg border border-charcoal/10 bg-white dark:bg-white/5 px-8 py-4 text-base font-bold text-charcoal dark:text-white hover:bg-charcoal/5 dark:hover:bg-white/10"
                >
                  Explore Training
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[40%]">
              <div className="relative rounded-2xl bg-white dark:bg-white/5 p-4 shadow-2xl border border-charcoal/5">
                <img alt="Compliance Framework" className="rounded-lg w-full h-auto object-cover" src={COMPLIANCE_IMAGE} />
                <div className="absolute -bottom-6 -left-6 rounded-lg bg-primary p-6 text-white shadow-xl">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-xs uppercase tracking-widest opacity-80">Licensing Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling strip */}
      <div className="bg-charcoal text-white py-6 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 animate-infinite-scroll px-6">
          {[
            'Compliance Strategy',
            'Licensing Advisory',
            'Operational Risk',
            'Regulatory Audit',
            'Governance Framework',
          ].concat([
            'Compliance Strategy',
            'Licensing Advisory',
            'Operational Risk',
            'Regulatory Audit',
            'Governance Framework',
          ]).map((label, i) => (
            <div key={`${label}-${i}`} className="flex items-center gap-4 shrink-0 font-bold uppercase tracking-widest text-xs">
              <span className="material-symbols-outlined text-primary scale-75">circle</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Strategy / Risk / Audit - 3 columns */}
      <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-1 w-12 bg-primary mb-6 transition-all duration-300 group-hover:w-full rounded-full" />
            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">Regulatory Strategy</h3>
            <p className="text-charcoal/60 dark:text-slate-400 leading-relaxed">
              We align your business objectives with global regulatory expectations, ensuring a seamless path to market entry and sustained operation.
            </p>
          </div>
          <div className="group transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-1 w-12 bg-primary mb-6 transition-all duration-300 group-hover:w-full rounded-full" />
            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">Risk Management</h3>
            <p className="text-charcoal/60 dark:text-slate-400 leading-relaxed">
              Identify, quantify, and mitigate systemic vulnerabilities before they impact your license or reputation.
            </p>
          </div>
          <div className="group transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-1 w-12 bg-primary mb-6 transition-all duration-300 group-hover:w-full rounded-full" />
            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">Internal Audit</h3>
            <p className="text-charcoal/60 dark:text-slate-400 leading-relaxed">
              Rigorous third-party evaluations designed to satisfy regulators and provide internal stakeholders with absolute clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Core Deliverables - full list from old content, new design */}
      <section className="px-6 py-24 bg-white dark:bg-charcoal/20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start gap-4 mb-16">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white md:text-4xl tracking-tight">Core Deliverables</h2>
            <div className="h-1 w-20 bg-primary" />
            <p className="text-charcoal/60 max-w-2xl">We don&apos;t just advise; we build the infrastructure required to scale securely.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map(({ icon, title, desc }) => (
              <div key={title} className="group flex flex-col gap-4 border border-charcoal/5 p-8 rounded-xl hover:shadow-xl transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
                <h3 className="text-xl font-bold text-charcoal dark:text-white">{title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="bg-charcoal px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Compliance Department Framework</h2>
            <p className="text-lg text-white/60">Our proprietary model for building scalable, high-performance compliance units.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {frameworkPillars.map(({ title, desc }, i) => (
              <div key={title} className={`p-8 border-l-2 bg-white/5 ${i === 0 ? 'border-primary' : 'border-white/20'}`}>
                <h4 className="text-xl font-bold mb-4">{title}</h4>
                <p className="text-sm text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing Advisory */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16 text-white">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black mb-6">Strategic Licensing Advisory</h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">Accelerate your market entry. We handle the complexities of PSSP, PTSP, and Regulatory Sandbox applications globally.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined">check_circle</span> Pre-application feasibility study</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined">check_circle</span> Document preparation & vetting</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined">check_circle</span> Regulator engagement & advocacy</li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Link to="/consulting" className="inline-block bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-background-light transition-colors">
                  Book License Audit
                </Link>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5" />
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="px-6 py-24 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-charcoal dark:text-white">Our Engagement Process</h2>
            <p className="mt-4 text-charcoal/60">A structured path to regulatory excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-charcoal/40 text-primary shadow-lg border border-primary/10 font-bold text-xl">1</div>
              <h3 className="font-bold text-charcoal dark:text-white mb-2">Discovery</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">In-depth assessment of current status.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-charcoal/40 text-primary shadow-lg border border-primary/10 font-bold text-xl">2</div>
              <h3 className="font-bold text-charcoal dark:text-white mb-2">Gap Analysis</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">Identifying regulatory shortfalls.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-charcoal/40 text-primary shadow-lg border border-primary/10 font-bold text-xl">3</div>
              <h3 className="font-bold text-charcoal dark:text-white mb-2">Framework</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">Custom solution architecture.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-charcoal/40 text-primary shadow-lg border border-primary/10 font-bold text-xl">4</div>
              <h3 className="font-bold text-charcoal dark:text-white mb-2">Implementation</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">Hands-on setup and training.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-charcoal/40 text-primary shadow-lg border border-primary/10 font-bold text-xl">5</div>
              <h3 className="font-bold text-charcoal dark:text-white mb-2">Handover</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">Continuous support & monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-charcoal dark:text-white mb-4">Who We Serve</h2>
              <p className="text-charcoal/60">Partnering with pioneers in the financial ecosystem.</p>
            </div>
            <div className="flex gap-4">
              <span className="rounded-lg bg-charcoal/5 px-4 py-2 text-sm font-semibold text-charcoal dark:text-white">Commercial Banks</span>
              <span className="rounded-lg bg-charcoal/5 px-4 py-2 text-sm font-semibold text-charcoal dark:text-white">Fintechs</span>
              <span className="rounded-lg bg-charcoal/5 px-4 py-2 text-sm font-semibold text-charcoal dark:text-white">IMTOs</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, name, org, img }) => (
              <div key={name} className="rounded-2xl bg-white dark:bg-charcoal/30 p-8 border border-charcoal/5">
                <p className="italic text-charcoal/80 mb-6 text-lg">{quote}</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-charcoal/10 overflow-hidden shrink-0">
                    <img alt="" className="h-full w-full object-cover" src={img} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-charcoal dark:text-white">{name}</p>
                    <p className="text-xs text-charcoal/50">{org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 bg-charcoal text-white text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Move from compliance intention to compliance <span className="text-primary">structure</span>.
          </h2>
          <p className="text-xl text-white/60 mb-12">Stop treating compliance as a hurdle. Start leveraging it as a competitive advantage.</p>
          <Link to="/consulting" className="inline-block bg-primary px-12 py-5 rounded-lg font-bold text-xl text-white hover:scale-105 transition-transform">
            Start Your Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
