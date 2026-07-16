export type LeadSource = "website" | "whatsapp" | "meta" | "google" | "referral";
export type LeadStage =
  | "new"
  | "contacted"
  | "qualified"
  | "site_visit"
  | "quoted"
  | "negotiation"
  | "won"
  | "lost";

export interface Lead {
  id: string;
  site_id: string;
  source: LeadSource;
  stage: LeadStage;
  full_name?: string;
  phone?: string;
  email?: string;
  project_type?: string;
  budget_range?: string;
  message?: string;
  raw_payload?: Record<string, unknown>;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadIntakePayload {
  site_slug: string;         // which construction site this lead belongs to
  full_name?: string;
  phone?: string;
  email?: string;
  project_type?: string;
  budget_range?: string;
  message?: string;
  [key: string]: unknown;    // allow raw fields from each channel
}
