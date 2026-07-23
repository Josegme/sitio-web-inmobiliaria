import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ClientService } from "@/features/clients/types";

interface ServiceCardProps {
  service: ClientService;
}

/**
 * Card de servicio disponible dentro del panel del cliente.
 * El `href` puede ser una ancla interna (mock, ej. `#pagos`) o una
 * ruta real cuando la funcionalidad se implemente.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col gap-3 p-5">
        <h3 className="font-heading text-lg">{service.title}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
        <a
          href={service.href}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {service.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </CardContent>
    </Card>
  );
}
