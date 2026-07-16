import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

// GET /api/leads?site_slug=rohini-site&stage=new&source=whatsapp
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const site_slug = searchParams.get("site_slug");
  const stage = searchParams.get("stage");
  const source = searchParams.get("source");

  if (!site_slug) {
    return NextResponse.json({ ok: false, error: "site_slug is required" }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    const demoLeads = [
      { id: "demo-1", full_name: "Aarav Sharma", source: "website", stage: "new" },
      { id: "demo-2", full_name: "Meera Gupta", source: "whatsapp", stage: "qualified" },
      { id: "demo-3", full_name: "Rohan Verma", source: "referral", stage: "quoted" },
      { id: "demo-4", full_name: "Ishita Singh", source: "meta", stage: "won" },
    ];
    return NextResponse.json({ ok: true, demo: true, leads: demoLeads });
  }

  const { data: site } = await supabaseAdmin
    .from("sites")
    .select("id")
    .eq("slug", site_slug)
    .single();

  if (!site) {
    return NextResponse.json({ ok: false, error: "site not found" }, { status: 404 });
  }

  let query = supabaseAdmin
    .from("leads")
    .select("*")
    .eq("site_id", site.id)
    .order("created_at", { ascending: false });

  if (stage) query = query.eq("stage", stage);
  if (source) query = query.eq("source", source);

  const { data, error } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, leads: data });
}
