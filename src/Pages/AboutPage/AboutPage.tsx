import { Link } from 'react-router-dom';

const values = [
  {
    icon: 'gavel',
    title: 'Integrity',
    desc: 'We uphold the highest ethical standards in all our dealings, ensuring trust and transparency with clients, regulators, and partners.',
  },
  {
    icon: 'star',
    title: 'Excellence',
    desc: 'We strive for outstanding quality in every solution, service, and advisory we deliver.',
  },
  {
    icon: 'verified_user',
    title: 'Accountability',
    desc: 'We take full responsibility for our work, providing reliable and dependable compliance and risk solutions.',
  },
  {
    icon: 'lightbulb',
    title: 'Innovation',
    desc: 'We embrace new ideas, technologies, and methodologies to provide forward-thinking compliance solutions.',
  },
  {
    icon: 'groups',
    title: 'Collaboration',
    desc: 'We work closely with clients, regulators, and internal teams to achieve practical, results-driven outcomes.',
  },
  {
    icon: 'school',
    title: 'Continuous Learning',
    desc: 'We remain committed to learning and adapting to the evolving regulatory and financial landscape.',
  },
];

const approachSteps = [
  { num: '01', title: 'Assessment', desc: 'Deep-dive diagnostic of current compliance architecture and risk exposure.' },
  { num: '02', title: 'Blueprint', desc: 'Designing a custom framework aligned with local and international requirements.' },
  { num: '03', title: 'Implementation', desc: 'Deploying protocols, training staff, and integrating compliance software.' },
  { num: '04', title: 'Evolution', desc: 'Continuous monitoring and optimization for emerging regulatory shifts.' },
];


export function AboutPage() {
  const scrollToTeam = () => {
    const el = document.getElementById('leadership');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex-1 pt-20">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-20 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="material-symbols-outlined text-sm">verified</span>
              Compliance Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              The Gold Standard in Financial Compliance
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Delivering effective compliance, risk management, and regulatory solutions that enable organizations to operate securely, mitigate risks, and maintain full regulatory compliance.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={scrollToTeam}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 group"
              >
                Meet Our Team
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-slate-200 dark:bg-slate-800 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq8HNpe5t_soK51lfmUSzg6XK_Ym_eG_B2YO-LBNnA4BFBzJiEwh8P_am1O7xVCGn5TtjhCV3JJuRWoze4ZBgX3Ccd0OvHuC7kMwaD3RsHHu7QpCiQGOyABnc4xPXdKIelSfgSDO42rUgTVEc-L85q-RaV-VC--MWMT6ld8f5-2T-kUDsHOCxUP0KIY8_6HY-AUmw6kM1S5IATP0qcHUiEPJNZ9LWw4BOBV2W0ZO4WBnddK34pHvPdUHj6MrnU4-_VFv6XeWL95Q')`,
              }}
              role="img"
              aria-label="Modern corporate boardroom with clean glass surfaces"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-xs">
              <p className="text-primary font-bold text-3xl italic">100%</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Successful compliance audit record for all long-term partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objective & Values */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Objective</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To deliver effective compliance, risk management, and regulatory solutions that enable organizations to operate securely, mitigate financial and operational risks, and maintain full regulatory compliance. We strive to provide practical tools, expert guidance, and actionable insights that support sustainable growth and strengthen governance frameworks.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To provide practical, innovative, and reliable compliance and risk management solutions that help organizations meet regulatory requirements, strengthen governance, prevent financial crime, and achieve sustainable growth. We aim to empower our clients with knowledge, tools, and advisory support to navigate complex regulatory environments with confidence.
              </p>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Vision</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              To be a leading compliance and risk advisory firm recognized for delivering innovative, practical, and regulator-ready solutions that empower organizations to operate confidently, mitigate financial crime risks, and achieve sustainable growth.
            </p>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors group"
              >
                <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Brand Personality</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              <strong className="text-slate-900 dark:text-white">We are:</strong> Clear, confident, and solutions-driven.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">We are not:</strong> Informal, exaggerated, aggressive, or compliance-guaranteeing.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Approach */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">Our Strategic Approach</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 hidden lg:block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {approachSteps.map(({ num, title, desc }, i) => (
                <div key={num} className="flex flex-col items-center text-center group">
                  <div
                    className={`size-16 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg outline outline-8 outline-background-light dark:outline-background-dark transition-colors ${
                      i === 0 ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    {num}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {/* <section id="leadership" className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold dark:text-white mb-4">Leadership Team</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Industry veterans from top-tier financial firms and compliance leadership roles.
              </p>
            </div>
            <Link
              to="/services"
              className="hidden md:block border border-slate-300 dark:border-slate-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              View All Members
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(({ name, role, bio, image, alt }) => (
              <div key={name} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]">
                  <div
                    className="absolute inset-0 bg-slate-200 dark:bg-slate-800 bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                    role="img"
                    aria-label={alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-lg transition-colors"
                        aria-label="LinkedIn"
                      >
                        <span className="material-symbols-outlined text-white">link</span>
                      </a>
                      <a
                        href="#"
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-lg transition-colors"
                        aria-label="Email"
                      >
                        <span className="material-symbols-outlined text-white">mail</span>
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold dark:text-white">{name}</h4>
                <p className="text-primary font-medium text-sm mb-2">{role}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-primary rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                Ready to build a compliance-ready department?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Schedule a confidential consultating with our partners to audit your current frameworks.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/consultation"
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Contact Us Today
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
