import { z } from "zod";

export const quotationFormSchema = z.object({
  operation: z.enum(["venta", "alquiler"], { message: "Elegí una operación." }),
  propertyType: z.enum(
    ["departamento", "casa", "ph", "local", "oficina", "terreno"],
    { message: "Elegí un tipo de propiedad." },
  ),
  neighborhood: z
    .string()
    .trim()
    .min(2, "Ingresá el barrio o localidad.")
    .max(60, "Máximo 60 caracteres."),
  areaM2: z.coerce
    .number({ message: "Ingresá los metros cuadrados." })
    .int("Los m² deben ser un número entero.")
    .positive("Los m² deben ser mayores a cero.")
    .max(10000, "Valor demasiado grande."),
  bedrooms: z.coerce
    .number({ message: "Ingresá la cantidad de dormitorios." })
    .int("Debe ser un número entero.")
    .min(0, "No puede ser negativo.")
    .max(20, "Valor demasiado grande."),
  condition: z.enum(["a-estrenar", "excelente", "muy-bueno", "a-reciclar"], {
    message: "Elegí el estado de la propiedad.",
  }),
});

/**
 * Tipo de INPUT del formulario (lo que teclea el usuario, antes de coerción).
 * Los campos numéricos son `unknown` porque `z.coerce.number()` acepta
 * cualquier valor y lo intenta convertir.
 */
export type QuotationFormInput = z.input<typeof quotationFormSchema>;

/**
 * Tipo de DATOS ya validados y coercionados (lo que recibe el handler
 * de submit). Es el que usa el resto de la app (`calculator.ts`, etc.).
 */
export type QuotationFormData = z.output<typeof quotationFormSchema>;
