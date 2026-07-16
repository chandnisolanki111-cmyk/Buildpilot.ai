-- ============================================================
-- BuildPilot AI — Core Schema (Supabase / Postgres)
-- Multi-tenant: every table scoped by site_id so one instance
-- can run unlimited construction sites / project offices.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- SITES (tenants) ----------
create table sites (
  id uuid primary key default uuid_generate_v4(),
  name text not null,                -- e.g. "DS Group - Rohini Site"
  slug text unique not null,         -- used in webhook URLs
  city text,
  owner_email text,
  created_at timestamptz default now()
);

-- ---------- TEAM / USERS ----------
create table team_members (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid references sites(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  role text check (role in ('ceo','sales_manager','sales_rep','site_engineer')) default 'sales_rep',
  created_at timestamptz default now()
);

-- ---------- LEADS ----------
create type lead_source as enum ('website','whatsapp','meta','google','referral');
create type lead_stage  as enum ('new','contacted','qualified','site_visit','quoted','negotiation','won','lost');

create table leads (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid references sites(id) on delete cascade,
  source lead_source not null,
  stage lead_stage default 'new',
  full_name text,
  phone text,
  email text,
  project_type text,             -- e.g. "Villa Interior", "Commercial Fitout"
  budget_range text,
  message text,
  raw_payload jsonb,              -- original webhook payload, for audit/debug
  assigned_to uuid references team_members(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_leads_site on leads(site_id);
create index idx_leads_stage on leads(stage);
create index idx_leads_source on leads(source);

-- ---------- FOLLOW-UPS ----------
create table follow_ups (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  due_at timestamptz not null,
  note text,
  done boolean default false,
  created_by uuid references team_members(id),
  created_at timestamptz default now()
);

-- ---------- QUOTATIONS ----------
create table quotations (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  amount numeric(12,2),
  scope text,
  status text check (status in ('draft','sent','accepted','rejected')) default 'draft',
  pdf_url text,
  created_at timestamptz default now()
);

-- ---------- CLIENT HISTORY / ACTIVITY LOG ----------
create table activity_log (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  actor text,                    -- team member name or 'system'
  action text,                   -- 'stage_changed', 'note_added', 'quote_sent'...
  detail text,
  created_at timestamptz default now()
);

-- ---------- DAILY REPORT SNAPSHOTS (for fast dashboard reads) ----------
create table daily_reports (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid references sites(id) on delete cascade,
  report_date date default current_date,
  total_leads int default 0,
  new_leads int default 0,
  leads_won int default 0,
  leads_lost int default 0,
  revenue_closed numeric(14,2) default 0,
  ai_summary text,               -- generated insight text
  created_at timestamptz default now(),
  unique(site_id, report_date)
);
