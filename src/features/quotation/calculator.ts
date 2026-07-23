import type { QuotationFormData } from "@/features/quotation/schemas";
import type { QuotationResult } from "@/features/quotation/types";

/**
 * TODO: [QUOTATION] — reemplazar por lógica de cotización inteligente (IA).
 *
 * Este archivo es el ÚNICO punto de contacto con la lógica de cotización.
 * Todo el resto del feature (form, result view, página) consume
 * `calculateQuotation()` sin conocer implementación interna.
 *
 * Cuando se implemente la versión con IA:
 * 1. Mantener la misma firma: `(input: QuotationFormData) => QuotationResult`.
 * 2. Reemplazar el cálculo mock por llamada a modelo (Vertex/OpenAI/etc.)
 *    o a un endpoint interno que use comparables reales.
 * 3. Si la operación pasa a ser async, actualizar la firma a `Promise<QuotationResult>`
 *    y ajustar el componente `QuotationForm` (ya está preparado para async).
 *
 * IMPLEMENTACIÓN MOCK ACTUAL:
 * Multiplica un precio base por m² (por tipo de propiedad) por el area,
 * aplica ajustes por barrio (según lista), estado y cantidad de dormitorios.
 * Redondea a un múltiplo "presentable" para que se vea plausible.
 */

const BASE_PRICE_USD_PER_M2: Record<QuotationFormData["propertyType"], number> = {
  departamento: 2400,
  casa: 2100,
  ph: 1900,
  local: 2800,
  oficina: 3200,
  terreno: 900,
};

const NEIGHBORHOOD_MULTIPLIERS: Record<string, number> = {
  "puerto madero": 1.6,
  recoleta: 1.35,
  palermo: 1.3,
  belgrano: 1.2,
  "villa crespo": 1.05,
  "san isidro": 1.25,
  pilar: 0.9,
};

const CONDITION_MULTIPLIERS: Record<QuotationFormData["condition"], number> = {
  "a-estrenar": 1.15,
  excelente: 1.05,
  "muy-bueno": 1,
  "a-reciclar": 0.8,
};

const RENT_MONTHLY_YIELD = 0.005; // ~6% anual
const CONFIDENCE_PERCENT = 12;

function getNeighborhoodMultiplier(neighborhood: string): number {
  const key = neighborhood.trim().toLowerCase();
  return NEIGHBORHOOD_MULTIPLIERS[key] ?? 1;
}

function roundToPresentable(amount: number): number {
  if (amount >= 100_000) return Math.round(amount / 1000) * 1000;
  if (amount >= 10_000) return Math.round(amount / 100) * 100;
  return Math.round(amount);
}

export function calculateQuotation(input: QuotationFormData): QuotationResult {
  const basePerM2 = BASE_PRICE_USD_PER_M2[input.propertyType];
  const neighborhoodFactor = getNeighborhoodMultiplier(input.neighborhood);
  const conditionFactor = CONDITION_MULTIPLIERS[input.condition];

  // Ajuste leve por cantidad de dormitorios (más dormitorios → precio total mayor
  // pero por m² casi neutro; usamos un pequeño bonus para reflejar layout).
  const bedroomBonus = 1 + Math.min(input.bedrooms, 4) * 0.015;

  const pricePerM2 = basePerM2 * neighborhoodFactor * conditionFactor * bedroomBonus;
  const totalSalePrice = pricePerM2 * input.areaM2;

  const isSale = input.operation === "venta";
  const estimatedPrice = isSale
    ? roundToPresentable(totalSalePrice)
    : roundToPresentable(totalSalePrice * RENT_MONTHLY_YIELD * 1_100); // ARS/mes aprox

  return {
    estimatedPrice,
    currency: isSale ? "USD" : "ARS",
    confidencePercent: CONFIDENCE_PERCENT,
    pricePerM2: roundToPresentable(pricePerM2),
    input,
  };
}

/** Opciones para renderizar en el form — sincronizadas con el schema. */
export const QUOTATION_OPTIONS = {
  operations: [
    { value: "venta", label: "Venta" },
    { value: "alquiler", label: "Alquiler" },
  ],
  propertyTypes: [
    { value: "departamento", label: "Departamento" },
    { value: "casa", label: "Casa" },
    { value: "ph", label: "PH" },
    { value: "local", label: "Local comercial" },
    { value: "oficina", label: "Oficina" },
    { value: "terreno", label: "Terreno" },
  ],
  conditions: [
    { value: "a-estrenar", label: "A estrenar" },
    { value: "excelente", label: "Excelente" },
    { value: "muy-bueno", label: "Muy bueno" },
    { value: "a-reciclar", label: "A reciclar" },
  ],
} as const;
