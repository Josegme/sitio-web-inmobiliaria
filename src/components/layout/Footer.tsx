import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SocialIcons } from "@/components/common/SocialIcons";
import { COMPANY_INFO, NAV_ITEMS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/format";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/lib/constants";

/**
 * Pie de página global. Se renderiza dentro del layout de marketing.
 * Datos vienen de `COMPANY_INFO` — actualizarlos en un solo lugar.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-lg font-semibold">{COMPANY_INFO.name}</p>
          <p className="text-sm text-muted-foreground">{COMPANY_INFO.tagline}</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider">Navegación</p>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider">Contacto</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{COMPANY_INFO.address}</span>
            </li>
            <li>
              <a
                href={`tel:${COMPANY_INFO.phoneDisplay.replace(/\s|-/g, "")}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {COMPANY_INFO.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {COMPANY_INFO.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                WhatsApp directo
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider">Seguinos</p>
          <SocialIcons />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} {COMPANY_INFO.legalName}. Todos los derechos reservados.
          </p>
          <p>Sitio desarrollado como Trabajo Final — Taller de Desarrollo.</p>
        </Container>
      </div>
    </footer>
  );
}
