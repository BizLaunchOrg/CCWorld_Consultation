import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedNonLicensingServices, getLicensingServices } from "../../data/services";
import type { Service } from "../../types/service";
import { useChat } from "../../contexts/ChatContext";

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

export default function ServicePage() {
  const services = getPublishedNonLicensingServices();
  const licensingServices = getLicensingServices();
  const { openChat } = useChat();
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tickerItems = useMemo(
    () => [
      { icon: "gavel", text: "BOARD CHARTER READY", color: "text-teal-accent" },
      { icon: "monitoring", text: "MONITORING PROGRAM: ENABLED", color: "text-slate-400" },
      { icon: "badge", text: "AML/CFT FRAMEWORK: DRAFTED", color: "text-gold-accent" },
      { icon: "shield", text: "SANCTIONS SCREENING: VERIFIED", color: "text-teal-accent" },
      { icon: "receipt_long", text: "REGULATORY RETURNS: STRUCTURED", color: "text-slate-400" },
    ],
    [],
  );

  // Categories based on your framework
  const filters = useMemo(
    () => [
      "All",
      "Governance",
      "People",
      "Policies",
      "Processes",
      "Technology",
      "Culture",
      "Monitoring",
      "Regulatory",
      "Continuous Improvement",
    ],
    [],
  );

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return services.filter((s) => {
      const matchesFilter = filter === "All" ? true : s.categories.includes(filter);
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.categories.some((c) => c.toLowerCase().includes(q));

      return matchesFilter && matchesQuery;
    });
  }, [services, filter, query]);

  const badgeForLevel = (level: Service["level"]) => {
    switch (level) {
      case "Foundation":
        return { label: "Foundation", cls: "bg-gold-accent/15 border-gold-accent/25 text-gold-accent" };
      case "Build":
        return { label: "Build", cls: "bg-teal-accent/15 border-teal-accent/25 text-teal-accent" };
      case "Advanced":
        return { label: "Advanced", cls: "bg-primary/15 border-primary/25 text-primary" };
      case "Managed":
        return { label: "Managed", cls: "bg-slate-200 dark:bg-white/10 border-slate-300 dark:border-white/15 text-slate-800 dark:text-white" };
      default:
        return { label: "Service", cls: "bg-slate-200 dark:bg-white/10 border-slate-300 dark:border-white/15 text-slate-800 dark:text-white" };
    }
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative mesh-gradient overflow-hidden px-6 pt-24 pb-16">
        <div className="grid-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-xs font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span
                  className={!prefersReduced ? "animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-accent opacity-75" : ""}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-accent" />
              </span>
              Compliance Consulting Services
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white">
              Services built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-primary">
                banks, fintechs & IMTOs
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Choose a service and we’ll build the governance, people, processes, tooling, and reporting you need to become regulator-ready — without killing velocity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/consultation"
                className="px-8 py-4 bg-teal-accent text-background-dark text-sm sm:text-base font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all flex items-center gap-2"
              >
                Request a Consultation <span className="material-symbols-outlined">arrow_forward</span>
              </Link>

              <button
                type="button"
                className="px-8 py-4 border-2 border-gold-accent/50 text-gold-accent text-sm sm:text-base font-black rounded-xl hover:bg-gold-accent/10 transition-all"
              >
                Download Blueprint
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              {[
                { k: "10+", v: "Core deliverables packs", icon: "fact_check" },
                { k: "8–12w", v: "Typical build-out", icon: "schedule" },
                { k: "Audit-ready", v: "Evidence + reporting", icon: "shield" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-4 shadow-sm dark:shadow-none">
                  <span className="material-symbols-outlined text-teal-accent mb-2 block">{x.icon}</span>
                  <div className="text-slate-900 dark:text-white font-black text-lg">{x.k}</div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual panel */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-7 rounded-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Service Navigator</div>
                  <div className="text-xs font-black text-teal-accent">LIVE</div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 p-5">
                  <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Pick by pillar</div>
                  <div className="flex flex-wrap gap-2">
                    {["Governance", "Policies", "Processes", "Technology", "Monitoring"].map((x) => (
                      <span
                        key={x}
                        className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 p-5">
                  <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Typical outputs</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "gavel", t: "Charter & Risk Appetite" },
                      { icon: "description", t: "Policy Suite" },
                      { icon: "account_tree", t: "Workflow Maps" },
                      { icon: "monitoring", t: "Dashboards & KPIs" },
                    ].map((x) => (
                      <div key={x.t} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                        <span className="material-symbols-outlined text-teal-accent text-sm">{x.icon}</span>
                        {x.t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  Not sure what you need? Start with a CRA (risk assessment) or a diagnostic session — we’ll recommend the right service mix.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Ticker */}
      <section className="py-10 bg-primary/10 dark:bg-primary/5 overflow-hidden whitespace-nowrap border-y border-slate-200 dark:border-white/5">
        <div className={cx("flex items-center gap-12", !prefersReduced && "animate-[marquee_30s_linear_infinite]")}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={`${item.text}-${i}`} className={`flex items-center gap-3 font-mono text-sm ${item.color}`}>
              <span className="material-symbols-outlined text-xs">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Licensing Advisory (CBN) */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Licensing Advisory (CBN)</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Dedicated support for CBN payment and sandbox licensing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {licensingServices.map((s) => (
            <div
              key={s.slug}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-accent/25 transition-all group shadow-sm dark:shadow-none flex flex-col"
            >
              <div className="flex items-start gap-4">
                <span className="size-12 rounded-2xl bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center text-teal-accent shrink-0">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg leading-tight">{s.title}</h3>
                  <p className="text-slate-600 dark:text-slate-500 text-xs mt-1">{s.tagline}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-4 flex-1">{s.summary}</p>
              <div className="mt-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark p-4">
                <div className="text-slate-600 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Outcomes</div>
                <ul className="space-y-2">
                  {s.outcomes.slice(0, 5).map((o) => (
                    <li key={o} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                      <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5 shrink-0">check</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  to={`/licensing/${s.slug}`}
                  className="flex-1 min-w-[120px] text-center px-5 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
                >
                  View Details
                </Link>
                <Link
                  to="/consultation"
                  className="px-5 py-3 rounded-2xl border border-gold-accent/40 text-gold-accent font-black hover:bg-gold-accent/10 transition-all"
                  aria-label="Engage us"
                >
                  Engage Us
                </Link>
                <button
                  type="button"
                  onClick={openChat}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:bg-white/10 transition-all"
                  aria-label="Live chat"
                >
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 pt-14">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-5 sm:p-6 shadow-sm dark:shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-teal-accent">tune</span>
              <div>
                <div className="text-white font-black">Browse services</div>
                <div className="text-slate-500 text-xs">Filter by pillar or search by keyword.</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex-1 min-w-[220px]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    search
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search (e.g. AML, IMTO, reporting, dashboards)…"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none focus:border-teal-accent/30"
                  />
                </div>
              </div>

              <div className="min-w-[210px]">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 outline-none focus:border-teal-accent/30"
                >
                  {filters.map((f) => (
                    <option key={f} value={f} className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-200">
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="py-3 px-4 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:border-teal-accent/25 transition-all font-black"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {filters
              .filter((f) => f !== "All")
              .slice(0, 8)
              .map((tag) => {
                const on = filter === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFilter(on ? "All" : tag)}
                    className={cx(
                      "px-3 py-1.5 rounded-full text-xs font-black border transition-all",
                      on
                        ? "bg-teal-accent/15 border-teal-accent/25 text-teal-accent"
                        : "bg-primary/10 border-primary/20 text-primary hover:border-teal-accent/25",
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">All Services</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {filtered.length} service{filtered.length === 1 ? "" : "s"} shown
              {filter !== "All" ? ` • filtered by ${filter}` : ""}.
            </p>
          </div>

          <Link to="/consultation" className="hidden sm:inline-flex items-center gap-2 text-teal-accent font-black hover:opacity-90">
            Need help choosing? <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const badge = badgeForLevel(s.level);

            return (
              <div
                key={s.slug}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 hover:border-teal-accent/25 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="size-12 rounded-2xl bg-teal-accent/10 border border-teal-accent/20 flex items-center justify-center text-teal-accent">
                      <span className="material-symbols-outlined">{s.icon}</span>
                    </span>
                    <div>
                      <div className="text-slate-900 dark:text-white font-black text-lg leading-tight">{s.title}</div>
                      <div className="text-slate-600 dark:text-slate-500 text-xs mt-1">{s.tagline}</div>
                    </div>
                  </div>

                  <span className={cx("px-3 py-1.5 rounded-full text-[11px] font-black border", badge.cls)}>
                    {badge.label}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-5">{s.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {s.categories.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-[11px] font-black"
                    >
                      {c}
                    </span>
                  ))}
                  {s.categories.length > 4 ? (
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-background-dark border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-500 text-[11px] font-black">
                      +{s.categories.length - 4}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-background-dark p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-600 dark:text-slate-500 text-xs font-black uppercase tracking-widest">Typical outputs</div>
                    <div className="text-slate-600 dark:text-slate-500 text-xs font-black">{s.duration_label}</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {s.outcomes.slice(0, 3).map((o) => (
                      <div key={o} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-xs">
                        <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5">check</span>
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {/* If you don’t have detail pages yet, keep this route for later */}
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex-1 text-center px-5 py-3 rounded-2xl bg-teal-accent text-background-dark font-black hover:shadow-[0_0_24px_rgba(45,212,191,0.25)] transition-all"
                  >
                    View Service
                  </Link>
                  <Link
                    to="/consultation"
                    className="px-5 py-3 rounded-2xl border border-gold-accent/40 text-gold-accent font-black hover:bg-gold-accent/10 transition-all"
                    aria-label="Request consultation"
                  >
                    Consult
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-10 text-center">
            <div className="text-slate-900 dark:text-white font-black text-xl">No services found</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2">Try a different keyword or switch filters.</div>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
              className="mt-6 px-6 py-3 rounded-2xl bg-teal-accent text-background-dark font-black"
            >
              Reset
            </button>
          </div>
        ) : null}
      </section>

      {/* How we engage (same “3-phase method” vibe) */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">How engagements work</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-3xl mx-auto">
              A consistent delivery approach across governance, policies, workflows, tooling, reporting, and culture — with auditable outputs at every stage.
            </p>
            <div className="h-1.5 w-24 bg-teal-accent mx-auto mt-7 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: "1",
                icon: "search",
                title: "Discovery & GAP",
                text: "Obligations map, risk posture, control baseline, and prioritized roadmap with quick wins.",
              },
              {
                n: "2",
                icon: "settings_suggest",
                title: "Build & Embed",
                text: "Policies, workflows, tooling plan, reporting cadence, evidence structure — embedded into real operations.",
              },
              {
                n: "3",
                icon: "verified",
                title: "Handover & Assurance",
                text: "Training, testing cadence, dashboards, and regulator-ready evidence packs for sustained compliance.",
              },
            ].map((x) => (
              <div key={x.n} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-background-dark p-7 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4">
                  <span className="size-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-black text-lg">
                    {x.n}
                  </span>
                  <span className="material-symbols-outlined text-teal-accent">{x.icon}</span>
                </div>
                <div className="text-slate-900 dark:text-white font-black text-xl mt-5">{x.title}</div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{x.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-accent text-background-dark font-black rounded-xl hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] transition-all"
            >
              Request a Consultation <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Not sure which service fits your license and risk profile?
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Start with a diagnostic session or a Compliance Risk Assessment (CRA). We’ll recommend the most effective build path.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/consultation"
              className="px-10 py-5 bg-white text-primary text-lg font-black rounded-xl hover:scale-105 transition-transform"
            >
              Speak to an Expert
            </Link>
            <Link
              to="/services/compliance-risk-assessment-cra"
              className="px-10 py-5 border-2 border-white text-white text-lg font-black rounded-xl hover:bg-white/10 transition-all"
            >
              Start with CRA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
export { ServicePage as ServicesPage };