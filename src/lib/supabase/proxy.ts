import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/lib/constants";

/**
 * Refresca la sesión de Auth en cada request y protege `/clientes/panel`.
 *
 * TODO: [AUTH] — resuelto: sin sesión válida, cualquier request a
 * `/clientes/panel` se redirige a `/clientes/login`.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Importante: no ejecutar lógica entre createServerClient y getClaims().
  const { data } = await supabase.auth.getClaims();

  const isPanelRoute = request.nextUrl.pathname.startsWith(ROUTES.clientsPanel);
  if (isPanelRoute && !data?.claims) {
    const loginUrl = new URL(ROUTES.clientsLogin, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}
