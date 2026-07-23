import type { ComponentType, SVGProps } from "react";

import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SocialName = (typeof SOCIAL_LINKS)[number]["name"];

/**
 * Íconos de marcas embebidos como SVG. `lucide-react` los retiró de su
 * set por razones de trademark, así que los definimos localmente para
 * evitar sumar otra dependencia solo para 3 íconos.
 */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ICONS: Record<SocialName, ComponentType<SVGProps<SVGSVGElement>>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
};

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Grilla de íconos de redes sociales. Cada ícono es un link real; si el
 * enlace todavía no fue confirmado por la empresa se marca con
 * `isPlaceholder: true` en `SOCIAL_LINKS` y se renderiza deshabilitado
 * y visualmente atenuado — nunca `href="#"`.
 */
export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map(({ name, href, isPlaceholder }) => {
        const Icon = ICONS[name];
        const label = isPlaceholder ? `${name} (próximamente)` : name;

        return (
          <li key={name}>
            <a
              href={href}
              aria-label={label}
              aria-disabled={isPlaceholder || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                isPlaceholder && "pointer-events-none opacity-50",
              )}
              title={label}
            >
              <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
