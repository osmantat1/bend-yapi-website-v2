import { createClient } from "@supabase/supabase-js";

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
    .from("news_items")
    .select("id, title, summary, category, published_at, created_at")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ news: data || [] });
}

export async function POST(request) {
  const auth = await requireUser(request);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const news = body?.news;
  if (!news || typeof news !== "object") {
    return Response.json({ error: "News payload is required." }, { status: 400 });
  }

  const title = String(news.title || "").trim();
  const summary = String(news.summary || "").trim();
  const category = String(news.category || "Duyuru").trim() || "Duyuru";
  const publishedAt = String(news.published_at || "").trim() || new Date().toISOString().slice(0, 10);

  if (!title || !summary) {
    return Response.json({ error: "Title and summary are required." }, { status: 400 });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data, error } = await adminClient
    .from("news_items")
    .insert([
      {
        title,
        summary,
        category,
        published_at: publishedAt,
      },
    ])
    .select("id, title, summary, category, published_at, created_at")
    .single();

  if (error) {
    return Response.json({ error: error.message, details: error.details, hint: error.hint, code: error.code }, { status: 400 });
  }

  return Response.json({ news: data }, { status: 201 });
}

export async function DELETE(request) {
  const auth = await requireUser(request);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const id = String(body?.id || "").trim();
  if (!id) {
    return Response.json({ error: "News id is required." }, { status: 400 });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { error } = await adminClient.from("news_items").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message, details: error.details, hint: error.hint, code: error.code }, { status: 400 });
  }

  return Response.json({ ok: true });
}