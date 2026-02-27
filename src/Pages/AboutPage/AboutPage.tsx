import { Link } from 'react-router-dom';

const values = [
  {
    icon: 'gavel',
    title: 'Integrity',
    desc: 'Unwavering commitment to ethical standards and transparent practices in every engagement.',
  },
  {
    icon: 'visibility',
    title: 'Clarity',
    desc: 'Simplifying complex regulations into actionable, clear strategies for your entire organization.',
  },
  {
    icon: 'description',
    title: 'Evidence',
    desc: 'Data-driven frameworks backed by robust documentation and verifiable compliance proof.',
  },
  {
    icon: 'speed',
    title: 'Readiness',
    desc: 'Ensuring your systems are always prepared for immediate scrutiny and future-proofed growth.',
  },
];

const approachSteps = [
  { num: '01', title: 'Assessment', desc: 'Deep-dive diagnostic of current compliance architecture and risk exposure.' },
  { num: '02', title: 'Blueprint', desc: 'Designing a custom framework aligned with local and global regulatory bodies.' },
  { num: '03', title: 'Implementation', desc: 'Deploying protocols, training staff, and integrating compliance software.' },
  { num: '04', title: 'Evolution', desc: 'Continuous monitoring and optimization for emerging regulatory shifts.' },
];

const teamMembers = [
  {
    name: 'Arthur Sterling',
    role: 'Managing Partner, Ex-IMF Auditor',
    bio: 'Over 20 years of experience in cross-border regulatory frameworks and policy development.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChjehcrObGEOgfAiDehvrpouIpf2UTu-hFTnMTuSiffxV8eOzxG2XMrzc9nNbVctshCtz-UbDs6Hg8UysABfRYlT3OP0WsCdkd2l0EePZtODsgzX8cFgSMZkWdqOJERq-mBaqu6wKSornyCYSdbNOWK3cVfjBmJAB4ppc5izz64jOIrWzB9-f6tuZzYWGTalWOk3i9QufpzvoAWCZ8eFbV-ChI215xGvU1OLW8MY16FxxJLEHhfOSGz7JwhTA7x0ocReCUoabMTQ',
    alt: 'Professional headshot of male executive in dark suit',
  },
  {
    name: 'Elena Vance',
    role: 'Director of Compliance Strategy',
    bio: 'Lead consultant for top-tier fintechs specializing in digital asset compliance and AML protocols.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNmRAarvvZru7fsXnizj_L0n_XV0eq0WXzWTWGtvdNVOBuaHl_yJepFFqdpgpewdsu9dQGjLB-WhTrKjA01OZKzp9Owe9cVkvz59o7Ptvx6fLKSe7L32kqGfGwXAXlFxvKX_KMHVHuDKCtv9Q1sOG4QGV4pqyJUwgqhIScZTe8RSU6gEh4bzYUOG0Z6vJSWb4WR1aTnt7-rKziGUJ5adS-IRQaMGFkpgBPmx58O1R75RjPwKrbJYFanzhlYKDZNEu1PL9Dld6QdQ',
    alt: 'Professional headshot of female executive with confident expression',
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Regulatory Relations',
    bio: 'Former senior advisor at the Central Bank with a focus on IMTO licensing and institutional oversight.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX5n_y0iKZgM-yOl076_Dl-hdtDUr93pOaM3roNDwd8LQ17Ide2maVZEKgcnpIipx-yXxWmGdMILdwYUKDwgi8nT2OdUQHXmd5-gVFaJ_Nd2so2saP_heLOea4tmR0fZsFgqMFzIL3MMZ-ltdV_9ljvULXdr-lAzhmbyXNhwJBSYvkCSFtP33HWDKiU8v29sreyRLMhs7Ep3X7lbh0DqErH2eJHIlcRVwabbfwCEU49h3SGKW8zURu9cMZiLwyimWT0dQIfdo4-g',
    alt: 'Professional headshot of male executive with glasses in modern office',
  },
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
              Regulator-Ready Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              The Gold Standard in Financial Compliance
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Empowering banks, fintechs, and IMTOs with ccworld compliance frameworks built on integrity and evidence.
              We don&apos;t just meet standards; we set them.
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
                Successful regulatory audit record for all long-term partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              To transform compliance from a hurdle into a competitive advantage by building resilient,
              regulator-ready departments for the world&apos;s leading financial institutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors group"
              >
                <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Approach */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Our Strategic Approach</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 hidden lg:block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {approachSteps.map(({ num, title, desc }, i) => (
                <div key={num} className="flex flex-col items-center text-center group">
                  <div
                    className={`size-16 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg outline outline-8 outline-background-light dark:outline-background-dark transition-colors ${
                      i === 0 ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-800 text-white group-hover:bg-primary'
                    }`}
                  >
                    {num}
                  </div>
                  <h4 className="font-bold text-lg mb-2 dark:text-white">{title}</h4>
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
                Industry veterans from global regulatory bodies and top-tier financial firms.
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
                Ready to build a regulator-ready department?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Schedule a confidential consultation with our partners to audit your current frameworks.
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
