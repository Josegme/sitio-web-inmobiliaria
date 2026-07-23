"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginFormSchema, type LoginFormData } from "@/features/clients/schemas";
import { ROUTES } from "@/lib/constants";

/**
 * Formulario de login del portal de clientes.
 *
 * TODO: [AUTH] — implementar autenticación real.
 * Hoy: valida email + password, simula 500ms de latencia y navega
 * directamente al panel. Sin sesión, cookies ni JWT.
 *
 * Cuando se implemente auth (por ej. NextAuth/Auth.js, Supabase Auth,
 * Clerk, Better-Auth), reemplazar el stub del `onSubmit` por la llamada
 * real. La UI y validación quedan intactas.
 */
export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async () => {
    setServerError(null);
    // TODO: [AUTH] — reemplazar por autenticación real.
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(ROUTES.clientsPanel);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        id="login-email"
        label="Email"
        required
        error={errors.email?.message}
      >
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="login-password"
        label="Contraseña"
        required
        error={errors.password?.message}
      >
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      {serverError ? (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Ingresando...
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden />
            Ingresar
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Portal exclusivo para clientes con contrato vigente. Si tenés
        problemas de acceso, contactanos por WhatsApp.
      </p>
    </form>
  );
}
