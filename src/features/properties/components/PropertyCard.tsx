import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Property } from "@/features/properties/types";
import { formatCurrency } from "@/lib/format";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

/**
 * Card de propiedad reutilizable. Se usa en Home (destacadas) y en
 * Galería. Muestra imagen (con `next/image`), badge de operación,
 * precio, ubicación y features principales.
 *
 * `priority` habilita la carga eager para propiedades above-the-fold
 * (típicamente las primeras 2-3 del Hero de la galería) para mejorar LCP.
 */
export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const operationLabel = property.operation === "venta" ? "Venta" : "Alquiler";

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        <Badge
          variant={property.operation === "venta" ? "default" : "secondary"}
          className="absolute left-3 top-3"
        >
          {operationLabel}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xl font-semibold text-foreground">
            {formatCurrency(property.price, property.currency)}
            {property.operation === "alquiler" ? (
              <span className="ml-1 text-sm font-normal text-muted-foreground">/mes</span>
            ) : null}
          </p>
        </div>

        <h3 className="font-heading text-lg leading-snug">{property.title}</h3>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          {property.location.neighborhood}, {property.location.city}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4 border-t border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <PropertyFeature icon={<BedDouble className="h-4 w-4" />} value={property.features.bedrooms} label="dorm." />
        <PropertyFeature icon={<Bath className="h-4 w-4" />} value={property.features.bathrooms} label="baños" />
        <PropertyFeature icon={<Ruler className="h-4 w-4" />} value={`${property.features.areaM2} m²`} />
      </CardFooter>
    </Card>
  );
}

interface PropertyFeatureProps {
  icon: React.ReactNode;
  value: number | string;
  label?: string;
}

function PropertyFeature({ icon, value, label }: PropertyFeatureProps) {
  return (
    <span className="flex items-center gap-1.5">
      {icon}
      <span className="font-medium text-foreground">{value}</span>
      {label ? <span>{label}</span> : null}
    </span>
  );
}
