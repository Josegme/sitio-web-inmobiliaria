import type { QuotationFormData } from "@/features/quotation/schemas";

export interface QuotationResult {
  /** Precio estimado (redondeado). */
  estimatedPrice: number;
  /** Moneda del precio estimado. */
  currency: "ARS" | "USD";
  /** Rango de confianza (± porcentaje). */
  confidencePercent: number;
  /** Precio por m² usado como referencia. */
  pricePerM2: number;
  /** Snapshot de los inputs originales, para mostrar resumen. */
  input: QuotationFormData;
}
