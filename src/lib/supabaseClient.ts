import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ProjectInterestInsert = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  project_name?: string;
  project_id?: string;
  message?: string;
  source_page?: string;
};

let client: SupabaseClient | null | undefined;

function getSupabaseAnonKey(): string | undefined {
  return (
    import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && getSupabaseAnonKey());
}

function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (client === undefined) {
    client = createClient(import.meta.env.VITE_SUPABASE_URL as string, getSupabaseAnonKey() as string);
  }

  return client;
}

const unavailableMessage =
  "Form submission is temporarily unavailable. Please call or WhatsApp us instead.";

export async function submitProjectInterest(
  payload: ProjectInterestInsert,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { ok: false, message: unavailableMessage };
  }

  const { error } = await supabase.from("project_interests").insert(payload);

  if (error) {
    return { ok: false, message: error.message || unavailableMessage };
  }

  return { ok: true };
}
