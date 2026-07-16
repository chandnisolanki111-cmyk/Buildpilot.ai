# BuildPilot AI — Skeleton

Multi-tenant lead → CRM → dashboard system. One deployment runs unlimited
construction sites; each site is a row in `sites`, and every lead/quote/report
is scoped by `site_id`.

## Structure

```
app/api/leads/{website,whatsapp,meta,google,referral}/route.ts   → Lead Engine (5 intake webhooks)
app/api/leads/route.ts                                            → list/filter leads
app/api/crm/leads/[id]/route.ts                                   → move pipeline stage, get full history
app/api/crm/followups/route.ts                                    → schedule/list follow-ups
app/api/crm/quotations/route.ts                                   → create/list quotations
app/api/dashboard/overview/route.ts                                → Business Overview
app/api/dashboard/report/route.ts                                  → Daily Report
app/api/dashboard/team/route.ts                                    → Team Performance
app/api/dashboard/forecast/route.ts                                 → Revenue Forecast
app/api/dashboard/insights/route.ts                                 → AI Insights (Claude)
app/dashboard/page.tsx                                              → CEO Dashboard UI
app/crm/page.tsx                                                    → Sales Pipeline UI (Kanban)
db/schema.sql                                                       → full Postgres/Supabase schema
```

## 1. Setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase URL + service role key
```

In Supabase: SQL editor → paste `db/schema.sql` → run.
Then insert your first site:

```sql
insert into sites (name, slug, city) values ('Rohini Site', 'demo-site', 'Delhi');
```

```bash
npm run dev
```

## 2. How each lead source connects

Each source is a separate webhook so you can wire them independently:

| Source    | Endpoint                  | Who calls it |
|-----------|----------------------------|--------------|
| Website   | `POST /api/leads/website`  | Your site's contact form (fetch on submit) |
| WhatsApp  | `POST /api/leads/whatsapp` | WhatsApp Business API webhook |
| Meta      | `POST /api/leads/meta`     | Meta Lead Ads webhook (Facebook/Instagram) |
| Google    | `POST /api/leads/google`   | Google Lead Form Extensions webhook |
| Referral  | `POST /api/leads/referral` | Manual entry form or partner portal |

All 5 POST the same shape:

```json
{
  "site_slug": "demo-site",
  "full_name": "Rohan Mehta",
  "phone": "+91...",
  "email": "...",
  "project_type": "Villa Interior",
  "budget_range": "10-15L",
  "message": "..."
}
```

They all funnel into `lib/leadIntake.ts`, which normalizes and inserts into
`leads`, tagging the `source` automatically — so the CRM never needs to know
which channel a lead came from to treat it consistently.

## 3. What's a skeleton vs. what's real

**Fully working:** DB schema, all API routes (CRUD + pipeline movement +
forecast math), basic Kanban CRM UI, basic dashboard UI, AI insight generation
via Claude.

**Stubbed / to build next:**
- Auth (currently no login — add Supabase Auth + row-level security per site)
- WhatsApp/Meta/Google webhook signature verification (each platform requires
  a verify token — add before going live)
- Quotation PDF generation
- Nightly cron to populate `daily_reports` (currently computed live)
- Site switcher UI (currently hardcoded to `demo-site`)

## 4. Deploy

Same pattern as DAKTRON: push to GitHub, deploy on Replit or Vercel, connect
custom domain, add the env vars in the host's secrets panel.
