import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE;

const missingEnvError =
  'Supabase env variables are missing. Configure SUPABASE URL, anon key, and service role key in your runtime environment and restart Docker.';

export async function POST(request) {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return Response.json({ error: missingEnvError }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey);
  const {
    data: { user },
    error: userError
  } = await authClient.auth.getUser(token);

  if (userError || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const project = body?.project;
  if (!project || typeof project !== 'object') {
    return Response.json({ error: 'Project payload is required.' }, { status: 400 });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data, error } = await adminClient
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('Database Error:', error);
    return Response.json({ 
      error: error.message, 
      details: error.details, 
      hint: error.hint,
      code: error.code 
    }, { status: 400 });
  }

  return Response.json({ project: data }, { status: 201 });
}
