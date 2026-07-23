"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * Hook para detectar si el viewport está en tamaño mobile.
 * Devuelve `undefined` durante SSR / primera hidratación, y `boolean`
 * después. Evitar renderizar UI dependiente en el primer paint para no
 * romper la hidratación.
 */
export function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}
