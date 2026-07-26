import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para Client Components (navegador).
 * Usa singleton interno de `@supabase/ssr` — seguro llamar múltiples veces.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
