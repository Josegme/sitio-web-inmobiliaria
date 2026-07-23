import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  /** ID único usado para asociar <label htmlFor> y control (input, select, etc.). */
  id: string;
  label: string;
  /** Mensaje de error de validación (viene de react-hook-form). Si existe, marca el field como inválido. */
  error?: string;
  /** Ayuda opcional debajo del label (ej. "Sin espacios ni guiones"). */
  hint?: string;
  /** El control real (Input / Textarea / Select) como children. */
  children: ReactNode;
  className?: string;
  /** Requiere marcar el label con un asterisco visual. */
  required?: boolean;
}

/**
 * Wrapper genérico para campos de formulario.
 * Estandariza label + hint + mensaje de error para todos los formularios
 * del sitio (Suscriptores, Contacto, Cotizar, Login). Cero lógica de RHF
 * acá — el control se pasa como children y el consumidor decide cómo
 * registrarlo. Mantiene el componente DRY y con una única responsabilidad.
 */
export function FormField({
  id,
  label,
  error,
  hint,
  children,
  className,
  required,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
