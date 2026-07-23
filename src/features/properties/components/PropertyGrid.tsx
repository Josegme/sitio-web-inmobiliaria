import { PropertyCard } from "@/features/properties/components/PropertyCard";
import type { Property } from "@/features/properties/types";

interface PropertyGridProps {
  properties: Property[];
  /** Cantidad de tarjetas que reciben priority (LCP). Default 2. */
  priorityCount?: number;
}

/**
 * Grilla responsive de propiedades. Consume `Property[]` — no conoce
 * de dónde vienen los datos (mock hoy, API/CMS mañana). Renderiza
 * un mensaje vacío accesible si el array llega vacío (útil cuando la
 * futura búsqueda inteligente filtre sin resultados).
 */
export function PropertyGrid({ properties, priorityCount = 2 }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div
        role="status"
        className="rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground"
      >
        No encontramos propiedades que coincidan con tu búsqueda.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
