import { supabaseAdmin } from "./supabase";
import type { LeadIntakePayload, LeadSource } from "@/types";

/**
 * Central function every source webhook (website/whatsapp/meta/google/referral)
 * calls to normalize + insert a lead. Keeps all 5 intake routes tiny and consistent.
 */
export async function ingestLead(source: LeadSource, payload: LeadIntakePayload) {
  const { site_slug, full_name, phone, email, project_type, budget_range, message, ...rest } =
    payload;

  if (!site_slug) {
    throw new Error("site_slug is required so we know which construction site this lead is for");
  }

  const { data: site, error: siteError } = await supabaseAdmin
    .from("sites")
    .select("id")
    .eq("slug", site_slug)
    .single();

  if (siteError || !site) {
    throw new Error(`Unknown site_slug "${site_slug}"`);
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({
      site_id: site.id,
      source,
      full_name,
      phone,
      email,
      project_type,
      budget_range,
      message,
      raw_payload: rest,
    })
    .select()
    .single();

  if (error) throw error;

  // Log it for the activity trail
  await supabaseAdmin.from("activity_log").insert({
    lead_id: data.id,
    actor: "system",
    action: "lead_created",
    detail: `New lead via ${source}`,
  });

  return data;
}
