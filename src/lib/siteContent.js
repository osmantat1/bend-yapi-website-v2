import { supabase } from "@/lib/supabase";

async function runQuery(query) {
  try {
    const { data, error } = await query;
    if (error) {
      return [];
    }

    return data || [];
  } catch (error) {
    return [];
  }
}

export async function getLatestNews(limit = 3) {
  return runQuery(
    supabase
      .from("news_items")
      .select("id, title, summary, category, published_at, created_at")
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit)
  );
}

export async function getAllNews() {
  return runQuery(
    supabase
      .from("news_items")
      .select("id, title, summary, category, published_at, created_at")
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false })
  );
}

export async function getContactOffices() {
  return runQuery(
    supabase
      .from("contact_offices")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true })
  );
}