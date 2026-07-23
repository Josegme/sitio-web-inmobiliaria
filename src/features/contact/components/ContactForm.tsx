"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/features/contact/schemas";

/**
 * Formulario de contacto general.
 *
 * TODO: [CONTACT] — enganchar envío real (email transaccional, ticket,
 * webhook a CRM, etc.). Hoy simula el envío con un timeout y muestra
 * confirmación visual — la validación con Zod ya está lista.
 */
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });

  const onSubmit = handleSubmit(async () => {
    // TODO: [CONTACT] — reemplazar por llamada al server action real.
    await new Promise((resolve) => setTimeout(resolve, 400));
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
        <h3 className="font-heading text-2xl">Mensaje enviado</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Recibimos tu consulta. Un asesor se va a contactar en las próximas
          horas hábiles.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Enviar otra consulta
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="contact-fullName"
        label="Nombre completo"
        required
        error={errors.fullName?.message}
      >
        <Input
          id="contact-fullName"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-email"
          label="Email"
          required
          error={errors.email?.message}
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </FormField>

        <FormField
          id="contact-phone"
          label="Teléfono (opcional)"
          error={errors.phone?.message}
        >
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField
        id="contact-message"
        label="Mensaje"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Contanos en qué te podemos ayudar..."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </Button>
    </form>
  );
}
