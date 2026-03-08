import { useState } from 'react';

const RADAR_ITEMS = [
  { label: 'CBN:', text: 'New Tier 3 KYC Requirements for Fintechs Effective Immediately' },
  { label: 'FATF:', text: 'Nigeria progress report on Grey List exit strategies' },
  { label: 'NFIU:', text: 'Enhanced Reporting Standards for IMTO Transactions' },
  { label: 'sep', text: '|' },
  { label: 'SEC:', text: 'Digital Asset Custody framework updates' },
];

const FILTERS = ['All Insights', 'AML/CFT', 'Sanctions', 'Governance', 'Fintech Regulation'] as const;
type FilterKey = (typeof FILTERS)[number];

const FEATURED = {
  tag: 'Special Report',
  title: 'The Future of Neo-Banking Compliance in Sub-Saharan Africa',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4gTv-QTuHrCJP3cBrf_xa6lo7p_L37lMoOXM7M22C57jQDOlvu6MpgtwunhlKMHRpmc6F8SaV1jpO-T5HoCB0l-MsPI56PB5MRbRpBVoxlrFhQ_YG_gw7qot2IqgVFz3V3_17aZvsDUZJxyOeo6fG6AsTgVdTg_YMXKAaYatdu4v9m8jfnnuWoUQw1aDE3WfHMWItOt_Jqg96vyzqLhT3e-T8efnluD4po7kqGZ-lJVC9M97dnub0Luma02O-RPQfA2sAvqTpg',
  alt: 'Modern high-rise office building reflection',
  readTime: '12 min read',
  author: 'Dr. Sarah Okonjo',
};

const ARTICLES = [
  {
    tag: 'AML/CFT',
    title: 'Combating Illicit Financial Flows: New NFIU Directives Explained',
    excerpt: 'Understanding the technical nuances of the latest anti-money laundering reporting requirements for commercial banks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_sPpI9uXYbaHaLRf4ynXElrNKp7Wxeo7g8e6cjQ-oAe8oz7sZQLP-4p5bzQOetG4qOhSixLlT-k2yLABdpUqczIDujhAiZYXw0mf66tSHbDr4Z6bPjLJqvLau9-jbFFDJxNyCHPa2A_Pj1-ZjSBkjw1lGcLmdYyCGmHzdt-QJ8WNQYHRskNKAIL5bApD146noVV-n6h-Ei3uo8sBhCpjeTaVN7i0JXG2asNcF9PEvs5c73ZgFW2qHaCJCDz0DoRlDRBPFFQWlnQ',
    alt: 'Data visualization graphs on a screen',
    date: 'Mar 24, 2024',
    readTime: '8 min read',
    category: 'AML/CFT' as FilterKey,
  },
  {
    tag: 'Sanctions',
    title: 'Navigating International Sanctions in Cross-Border IMTO Operations',
    excerpt: 'How remittance providers can build resilient sanction screening systems amid global geopolitical shifts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0wmOAeP7cWT_Bo23gFN6bth4eCrbvCtmKEKK6TltjOxeKvZrClOIZ56z7RwvuxmYg9zzWS_ZSGijoYoV8p6CzeDJ77fqAIy2CTV_lKc0vBvC704UzYuaLa8ADwUCW0u0UaOV8v-VVkxJzI74NZiNmBlh3gJT5GD78s4NWCvWnNoIU5Su4zR0h2WXR7mvQ7bYcrRkHHB0jvMo9uxg2a_RDRrSirfoQKMW9_wc5dUZO8DgGWmWFHGxhmMt_40jj-DybuxLz-9Db0w',
    alt: 'Close up of fountain pen on legal documents',
    date: 'Mar 20, 2024',
    readTime: '6 min read',
    category: 'Sanctions' as FilterKey,
  },
];

const TRENDING = [
  { num: '01', title: 'FATF Grey List: What it means for Nigerian Banks', reads: '1.2k reads' },
  { num: '02', title: 'Effective Sanctions Screening for FinTech Startups', reads: '940 reads' },
  { num: '03', title: 'Governance standards in the Digital Age', reads: '812 reads' },
];

export function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All Insights');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  const filteredArticles =
    activeFilter === 'All Insights'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeFilter);

  return (
    <main className="flex-1">
      {/* Hero - new design */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Insights & Intelligence
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Insights & <span className="text-primary">strategic intelligence</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Expert analysis on the shifting landscape of African financial regulation, AML/CFT frameworks, and governance excellence.
          </p>
        </div>
      </section>

      {/* Regulatory Radar strip */}
      <div className="bg-charcoal dark:bg-slate-800 text-white py-4 overflow-hidden border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Regulatory Radar
          </div>
          <div className="ticker-scroll gap-12 text-sm font-medium flex flex-1 min-w-0 overflow-hidden">
            {[...RADAR_ITEMS, ...RADAR_ITEMS].map((item, i) =>
              item.label === 'sep' ? (
                <span key={`${i}-sep`} className="flex items-center gap-2 text-slate-400 px-6">
                  |
                </span>
              ) : (
                <span key={`${item.label}-${i}`} className="flex items-center gap-2 flex-shrink-0 px-6 text-white/90">
                  <b className="text-primary">{item.label}</b> {item.text}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={
                    activeFilter === filter
                      ? 'bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-5 py-2 rounded-full text-sm font-semibold transition-colors'
                  }
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Featured Article - show when All Insights or matches first article's theme */}
              <article className="md:col-span-2 group">
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                  <img
                    alt={FEATURED.alt}
                    src={FEATURED.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
                      {FEATURED.tag}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-3 group-hover:underline leading-tight">
                      {FEATURED.title}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {FEATURED.readTime}
                      </span>
                      <span>•</span>
                      <span>By {FEATURED.author}</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Regular Articles */}
              {filteredArticles.map((article) => (
                <article key={article.title} className="group">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <img
                      alt={article.alt}
                      src={article.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold uppercase px-2 py-1 rounded backdrop-blur-sm">
                        {article.tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <button
                type="button"
                className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Explore More Insights
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            {/* Subscribe */}
            <div id="subscribe" className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 text-slate-900 dark:text-white relative overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">mail</span>
              </div>
              <h4 className="text-xl font-bold mb-4 relative z-10">Compliance Brief</h4>
              {subscribed ? (
                <p className="text-slate-600 dark:text-slate-300 text-sm relative z-10">Thanks for subscribing. Check your inbox for the next digest.</p>
              ) : (
                <>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
                    Get our weekly digest of regulatory changes and expert analysis delivered directly to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors text-sm"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-500 mt-4 italic">Join 5,000+ compliance professionals across Africa.</p>
                </>
              )}
            </div>

            {/* White Paper */}
            <div className="bg-background-light dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h4 className="text-lg font-bold mb-4">Latest White Paper</h4>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-4">menu_book</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Technical Guide
                    </span>
                    <span className="font-serif text-lg leading-tight">
                      Regulatory Compliance for Digital Assets 2024
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 bg-white text-primary rounded-full p-3 shadow-xl transition-opacity"
                      aria-label="Download PDF"
                    >
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary">Download Technical Paper (PDF)</p>
              </div>
            </div>

            {/* Trending */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                Trending
                <span className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              </h4>
              <ul className="space-y-4">
                {TRENDING.map(({ num, title, reads }) => (
                  <li key={num} className="flex items-start gap-4 group cursor-pointer">
                    <span className="text-2xl font-black text-slate-400 dark:text-slate-800">{num}</span>
                    <div>
                      <h5 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                        {title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">{reads}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Get the latest compliance insights in your inbox
          </h2>
          <p className="text-white/90 leading-relaxed">
            Subscribe to our Compliance Brief for weekly regulatory updates and expert analysis.
          </p>
          <a
            href="#subscribe"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-transform shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Scroll to subscribe <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>
    </main>
  );
}
