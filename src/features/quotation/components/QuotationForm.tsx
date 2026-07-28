"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

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
import { QuotationResult } from "@/features/quotation/components/QuotationResult";
import { calculateQuotation, createPropertyByType, findMatchingProperty, QUOTATION_OPTIONS } from "@/features/quotation/calculator";
import {
  quotationFormSchema,
  type QuotationFormData,
  type QuotationFormInput,
} from "@/features/quotation/schemas";
import type { QuotationResult as QuotationResultType } from "@/features/quotation/types";
import type { Property } from "@/features/properties/types";
import Image from "next/image";

/**
 * Formulario de cotización. Valida con Zod y usa el calculador mock
 * para obtener el resultado. Cuando la lógica pase a async (versión IA),
 * el cambio se hace en `calculator.ts` — este componente ya usa `await`.
 *
 * Los tres genéricos de `useForm` diferencian el shape crudo del input
 * (con m² y dorm. como `unknown` por `z.coerce`) del shape validado
 * (`QuotationFormData`, con números). Así el handler recibe datos ya coercionados.
 */
export function QuotationForm() {
  const [result, setResult] = useState<QuotationResultType | null>(null);
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuotationFormInput, unknown, QuotationFormData>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: {
      operation: undefined,
      propertyType: undefined,
      neighborhood: "",
      areaM2: undefined,
      bedrooms: undefined,
      condition: undefined,
    },
  });

  // Observar cambios en los campos del formulario para actualizar la vista previa
  const formData = useWatch({
    control,
  });

  // Actualizar la propiedad de vista previa cuando cambian los datos del formulario
  useEffect(() => {
    // Solo buscar si tenemos datos suficientes (tipo de propiedad es obligatorio)
    if (formData?.propertyType) {
      const matching = findMatchingProperty(formData as QuotationFormData);
      // Si no hay coincidencia, crear una basada en el tipo para mostrar la imagen correcta
      setPreviewProperty(matching || createPropertyByType(formData.propertyType));
    } else {
      setPreviewProperty(null);
    }
  }, [formData]);

  const onSubmit = handleSubmit(async (data) => {
    const computed = await Promise.resolve(calculateQuotation(data));
    setResult(computed);
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="q-operation"
            label="Operación"
            required
            error={errors.operation?.message}
          >
            <Controller
              control={control}
              name="operation"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="q-operation" aria-invalid={Boolean(errors.operation)}>
                    <SelectValue placeholder="Venta o alquiler" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUOTATION_OPTIONS.operations.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            id="q-type"
            label="Tipo de propiedad"
            required
            error={errors.propertyType?.message}
          >
            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="q-type" aria-invalid={Boolean(errors.propertyType)}>
                    <SelectValue placeholder="Elegí una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUOTATION_OPTIONS.propertyTypes.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>

        <FormField
          id="q-neighborhood"
          label="Barrio o localidad"
          hint="Ej.: Palermo, San Isidro, Pilar"
          required
          error={errors.neighborhood?.message}
        >
          <Input
            id="q-neighborhood"
            type="text"
            aria-invalid={Boolean(errors.neighborhood)}
            {...register("neighborhood")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="q-area"
            label="Metros cuadrados"
            required
            error={errors.areaM2?.message}
          >
            <Input
              id="q-area"
              type="number"
              inputMode="numeric"
              min={1}
              aria-invalid={Boolean(errors.areaM2)}
              {...register("areaM2")}
            />
          </FormField>

          <FormField
            id="q-bedrooms"
            label="Dormitorios"
            required
            error={errors.bedrooms?.message}
          >
            <Input
              id="q-bedrooms"
              type="number"
              inputMode="numeric"
              min={0}
              aria-invalid={Boolean(errors.bedrooms)}
              {...register("bedrooms")}
            />
          </FormField>
        </div>

        <FormField
          id="q-condition"
          label="Estado"
          required
          error={errors.condition?.message}
        >
          <Controller
            control={control}
            name="condition"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="q-condition" aria-invalid={Boolean(errors.condition)}>
                  <SelectValue placeholder="Elegí una opción" />
                </SelectTrigger>
                <SelectContent>
                  {QUOTATION_OPTIONS.conditions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Calculando...
            </>
          ) : (
            "Cotizar"
          )}
        </Button>
      </form>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        {result ? (
          <QuotationResult result={result} />
        ) : previewProperty ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Vista previa de propiedad similar
            </p>
            <div className="overflow-hidden rounded-lg border shadow-sm">
              <Image
                src={previewProperty.imageUrl}
                alt={previewProperty.imageAlt}
                width={600}
                height={300}
                className="h-48 w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">{previewProperty.title}</p>
              <p className="text-sm text-muted-foreground">
                {previewProperty.location.neighborhood}, {previewProperty.location.city}
              </p>
              <p className="text-xs text-muted-foreground">
                {previewProperty.features.areaM2} m² • {previewProperty.features.bedrooms} dormitorios
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Esta es una propiedad similar a la que estás cotizando. Completá el formulario para obtener el valor estimado.
            </p>
          </div>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="font-heading text-lg">Tu cotización aparecerá acá</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Completá el formulario y verás propiedades similares mientras escribís.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}