import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    import.meta.env.ZE_PUBLIC_SUPABASE_URL,
    import.meta.env.ZE_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export const supabaseClient = createClient();
