"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

/**
 * Hook para saber si estamos ya montados en cliente. Usa
 * `useSyncExternalStore` porque devuelve `false` durante SSR y `true`
 * al hidratar, sin necesidad de `useEffect + setState`.
 */
const emptySubscribe = () => () => {};
function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Botón de toggle claro/oscuro. Espera al montaje para evitar mismatch
 * de hidratación cuando next-themes lee la preferencia del sistema.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? `Cambiar a modo ${nextTheme === "dark" ? "oscuro" : "claro"}` : "Cambiar tema"}
      onClick={() => setTheme(nextTheme)}
    >
      {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
