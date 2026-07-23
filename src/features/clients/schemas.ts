import { z } from "zod";

/**
 * Schema del formulario de login del portal de clientes.
 * TODO: [AUTH] — cuando se implemente auth real, este schema puede
 * quedar tal cual (solo cambia el consumer, que hoy es un stub).
 */
export const loginFormSchema = z.object({
  email: z.string().trim().toLowerCase().email("Ingresá un email válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .max(72, "Máximo 72 caracteres."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
