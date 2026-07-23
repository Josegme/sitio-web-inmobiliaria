/**
 * Tipos de dominio del módulo de propiedades.
 * Cualquier componente que trabaje con inmuebles debe importar
 * `Property` desde acá para mantener el contrato consistente.
 */

export type OperationType = "venta" | "alquiler";

export type PropertyType =
  | "departamento"
  | "casa"
  | "ph"
  | "local"
  | "oficina"
  | "terreno";

export type CurrencyCode = "ARS" | "USD";

export interface Property {
  id: string;
  title: string;
  slug: string;
  operation: OperationType;
  type: PropertyType;
  price: number;
  currency: CurrencyCode;
  location: {
    neighborhood: string;
    city: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    areaM2: number;
  };
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  description: string;
}
