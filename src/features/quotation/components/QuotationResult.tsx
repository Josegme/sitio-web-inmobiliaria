import { Sparkles, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { QuotationResult as QuotationResultType } from "@/features/quotation/types";
import { formatCurrency } from "@/lib/format";

interface QuotationResultProps {
  result: QuotationResultType;
}

/**
 * Muestra el resultado de la cotización estimada.
 * Recibe únicamente el resultado ya calculado — la lógica vive en
 * `features/quotation/calculator.ts`.
 */
export function QuotationResult({ result }: QuotationResultProps) {
  const { estimatedPrice, currency, confidencePercent, pricePerM2, input } = result;
  const lowerBound = Math.round(estimatedPrice * (1 - confidencePercent / 100));
  const upperBound = Math.round(estimatedPrice * (1 + confidencePercent / 100));
  const isSale = input.operation === "venta";

  return (
    <Card className="border-primary/30 bg-primary/5 p-0">
      <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Cotización estimada
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl">
              {formatCurrency(estimatedPrice, currency)}
              {!isSale ? (
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  /mes
                </span>
              ) : null}
            </h3>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatBlock
            label="Rango estimado"
            value={`${formatCurrency(lowerBound, currency)} — ${formatCurrency(upperBound, currency)}`}
          />
          <StatBlock
            label="Precio por m² (referencia)"
            value={formatCurrency(pricePerM2, "USD")}
          />
          <StatBlock label="Confianza" value={`± ${confidencePercent}%`} />
        </div>

        <Separator />

        <div className="rounded-md bg-background/60 p-4 text-sm text-muted-foreground">
          <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
            <TrendingUp className="h-4 w-4" aria-hidden />
            Cotización orientativa
          </p>
          <p>
            Este valor es una <strong>estimación mock</strong> calculada con
            comparables promedio. Para una tasación oficial, uno de nuestros
            asesores puede realizar una visita y análisis detallado.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
