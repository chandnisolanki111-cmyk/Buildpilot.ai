import Link from "next/link";

const features = [
  {
    title: "Lead Capture Engine",
    text: "Collect website, WhatsApp, Meta, Google and referral leads in one structured pipeline.",
  },
  {
    title: "Sales CRM",
    text: "Move every enquiry from new lead to site visit, quotation, negotiation and final closure.",
  },
  {
    title: "CEO Dashboard",
    text: "See lead volume, pipeline health, closed revenue and action-focused business insights.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <nav className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xl font-semibold tracking-tight">BuildPilot AI</p>
            <p className="text-xs text-slate-400">Construction Lead & Growth OS</p>
          </div>
          <div className="flex gap-3">
            <Link href="/crm" className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/5">
              CRM
            </Link>
            <Link href="/dashboard" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950">
              Open Dashboard
            </Link>
          </div>
        </nav>

        <section className="grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
              Built for construction companies
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Turn scattered enquiries into a clear, measurable sales pipeline.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              BuildPilot AI brings lead capture, follow-ups, quotations, sales stages and CEO reporting into one focused operating system.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-xl bg-amber-300 px-5 py-3 font-medium text-slate-950 hover:bg-amber-200">
                View CEO Dashboard
              </Link>
              <Link href="/crm" className="rounded-xl border border-white/15 px-5 py-3 font-medium hover:bg-white/5">
                Open Sales Pipeline
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Pipeline overview</p>
                  <p className="mt-1 text-2xl font-semibold">Business at a glance</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Live system</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  ["New leads", "24"],
                  ["Qualified", "11"],
                  ["Site visits", "7"],
                  ["Won projects", "4"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-slate-950 p-4">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-200">Today’s priority</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Follow up with qualified leads awaiting a site visit and review quotations older than three days.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 pb-20 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
