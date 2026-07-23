import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SocialIcons } from "@/components/common/SocialIcons";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { EmbeddedMap } from "@/features/contact/components/EmbeddedMap";
import {
  COMPANY_INFO,
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos, llamanos o visitá nuestras oficinas. Estamos disponibles para responder tus consultas.",
};

export default function ContactPage() {
  const whatsappHref = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);
  const phoneHref = `tel:${COMPANY_INFO.phoneDisplay.replace(/\s|-/g, "")}`;
  const mailHref = `mailto:${COMPANY_INFO.email}`;

  return (
    <section className="py-16 sm:py-20" aria-labelledby="contact-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos"
          description="Elegí el canal que más te acomode. Te respondemos en el mismo día hábil."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <ContactInfoRow
              icon={<MapPin className="h-5 w-5" aria-hidden />}
              title="Nuestra oficina"
              value={COMPANY_INFO.address}
            />
            <ContactInfoRow
              icon={<Phone className="h-5 w-5" aria-hidden />}
              title="Teléfono"
              value={COMPANY_INFO.phoneDisplay}
              href={phoneHref}
            />
            <ContactInfoRow
              icon={<Mail className="h-5 w-5" aria-hidden />}
              title="Email"
              value={COMPANY_INFO.email}
              href={mailHref}
            />
            <ContactInfoRow
              icon={<MessageCircle className="h-5 w-5" aria-hidden />}
              title="WhatsApp"
              value="Escribinos directo — respuesta rápida"
              href={whatsappHref}
              external
            />

            <div className="flex flex-col gap-3 pt-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Redes sociales
              </p>
              <SocialIcons />
            </div>

            <EmbeddedMap />
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="mb-4 font-heading text-xl">Envianos un mensaje</h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ContactInfoRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactInfoRow({ icon, title, value, href, external }: ContactInfoRowProps) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-block transition-opacity hover:opacity-80"
    >
      {content}
    </a>
  );
}
