import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE;

const bucketName = 'bend-yapi-assets';

export async function POST(request) {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return Response.json({ error: 'Supabase env variables are missing.' }, { status: 500 });
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

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const file = formData.get('file');
  const folder = String(formData.get('folder') || 'uploads').replace(/[^a-zA-Z0-9/_-]/g, '');

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'File is required.' }, { status: 400 });
  }

  const extension = file.name?.split('.').pop() || 'bin';
  const safeFolder = folder || 'uploads';
  const safeName = `${safeFolder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${extension}`;

  const storageClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { error } = await storageClient.storage
    .from(bucketName)
    .upload(safeName, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false
    });

  if (error) {
    return Response.json({ error: error.message, details: error.details, hint: error.hint }, { status: 400 });
  }

  const { data } = storageClient.storage.from(bucketName).getPublicUrl(safeName);
  return Response.json({ path: safeName, publicUrl: data.publicUrl }, { status: 201 });
}