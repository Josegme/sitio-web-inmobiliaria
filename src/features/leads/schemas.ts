import { z } from "zod";

/**
 * Schema del formulario de captación de leads.
 * Fuente única de verdad: se usa en el cliente para validación en tiempo
 * real (react-hook-form + zodResolver) y en el server action para
 * validar antes de persistir/enviar a la automatización.
 */
export const subscribeFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo (mínimo 2 caracteres).")
    .max(80, "El nombre no puede superar 80 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresá un email válido."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?\d[\d\s-]{7,}$/,
      "Ingresá un teléfono válido (mínimo 8 dígitos, se aceptan +, espacios y guiones).",
    ),
  interest: z.enum(["comprar", "vender", "alquilar", "tasar", "informacion"], {
    message: "Elegí un tipo de interés.",
  }),
  acceptsMarketing: z
    .boolean()
    .refine((value) => value === true, {
      message: "Necesitamos tu consentimiento para enviarte novedades.",
    })
    .optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

/**
 * Opciones de "tipo de interés" — se usa tanto para renderizar el select
 * como para tipar el enum. Mantener sincronizado con el enum del schema.
 */
export const INTEREST_OPTIONS = [
  { value: "comprar", label: "Comprar una propiedad" },
  { value: "vender", label: "Vender una propiedad" },
  { value: "alquilar", label: "Alquilar" },
  { value: "tasar", label: "Solicitar una tasación" },
  { value: "informacion", label: "Recibir información general" },
] as const satisfies ReadonlyArray<{
  value: SubscribeFormData["interest"];
  label: string;
}>;
