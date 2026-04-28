import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE;

const missingEnvError =
  "Supabase env variables are missing. Configure SUPABASE URL, anon key, and service role key in your runtime environment and restart Docker.";

async function requireUser(request) {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return { error: Response.json({ error: missingEnvError }, { status: 500 }) };
  }

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey);
  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(token);

  if (userError || !user) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { user };
}

export async function GET(request) {
  const auth = await requireUser(request);
  if (auth.error) return auth.error;

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data, error } = await adminClient
    .from("contact_offices")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ offices: data || [] });
}

export async function PUT(request) {
  const auth = await requireUser(request);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const office = body?.office;
  if (!office || typeof office !== "object") {
    return Response.json({ error: "Office payload is required." }, { status: 400 });
  }

  const officeKey = String(office.office_key || "").trim();
  const title = String(office.title || "").trim();
  const address = String(office.address || "").trim();
  const phone = String(office.phone || "").trim();
  const fax = String(office.fax || "").trim();
  const email = String(office.email || "").trim();
  const mapUrl = String(office.map_url || "").trim();
  const whatsappUrl = String(office.whatsapp_url || "").trim();
  const orderIndex = Number.isFinite(Number(office.order_index)) ? Number(office.order_index) : 0;

  if (!officeKey || !title) {
    return Response.json({ error: "office_key and title are required." }, { status: 400 });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data, error } = await adminClient
    .from("contact_offices")
    .upsert(
      [
        {
          office_key: officeKey,
          title,
          address,
          phone,
          fax,
          email,
          map_url: mapUrl,
          whatsapp_url: whatsappUrl,
          order_index: orderIndex,
        },
      ],
      { onConflict: "office_key" }
    )
    .select("*")
    .single();

  if (error) {
    return Response.json({ error: error.message, details: error.details, hint: error.hint, code: error.code }, { status: 400 });
  }

  // Revalidate all pages so Footer fetches updated contact info
  revalidatePath('/', 'layout');

  return Response.json({ office: data }, { status: 200 });
}