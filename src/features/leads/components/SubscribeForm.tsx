"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLeadAction } from "@/features/leads/actions";
import {
  INTEREST_OPTIONS,
  subscribeFormSchema,
  type SubscribeFormData,
} from "@/features/leads/schemas";

/**
 * Formulario de captación de leads (Suscriptores).
 * Cliente-only por la UX (validación en vivo + estado de submit).
 * El envío llama al Server Action `submitLeadAction`, que hoy es un
 * stub — la integración real se engancha ahí (ver `actions.ts`).
 */
export function SubscribeForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interest: undefined,
      acceptsMarketing: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);
    const result = await submitLeadAction(data);
    if (!result.ok) {
      setServerError(result.error);
      return;
    }
    setIsSubmitted(true);
    reset();
  });

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h3 className="font-heading text-2xl">¡Suscripción registrada!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Te vamos a contactar por email con las próximas oportunidades que
          coincidan con tu interés.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Cargar otra suscripción
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="lead-fullName"
        label="Nombre completo"
        required
        error={errors.fullName?.message}
      >
        <Input
          id="lead-fullName"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
      </FormField>

      <FormField
        id="lead-email"
        label="Email"
        required
        error={errors.email?.message}
      >
        <Input
          id="lead-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="lead-phone"
        label="Teléfono"
        hint="Ej.: +54 11 5555 1234"
        required
        error={errors.phone?.message}
      >
        <Input
          id="lead-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
      </FormField>

      <FormField
        id="lead-interest"
        label="Tipo de interés"
        required
        error={errors.interest?.message}
      >
        <Controller
          control={control}
          name="interest"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="lead-interest"
                aria-invalid={Boolean(errors.interest)}
              >
                <SelectValue placeholder="Elegí una opción" />
              </SelectTrigger>
              <SelectContent>
                {INTEREST_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border text-primary focus-visible:ring-ring"
          aria-invalid={Boolean(errors.acceptsMarketing)}
          {...register("acceptsMarketing")}
        />
        <span>
          Acepto recibir novedades y oportunidades por email. Podés cancelar
          la suscripción en cualquier momento.
        </span>
      </label>
      {errors.acceptsMarketing?.message ? (
        <p role="alert" className="text-xs text-destructive">
          {errors.acceptsMarketing.message}
        </p>
      ) : null}

      {serverError ? (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          "Suscribirme"
        )}
      </Button>
    </form>
  );
}
