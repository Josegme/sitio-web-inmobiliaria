import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo.")
    .max(80, "Máximo 80 caracteres."),
  email: z.string().trim().toLowerCase().email("Ingresá un email válido."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?\d[\d\s-]{7,}$/,
      "Ingresá un teléfono válido (mínimo 8 dígitos).",
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poco más (mínimo 10 caracteres).")
    .max(1000, "Máximo 1000 caracteres."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
