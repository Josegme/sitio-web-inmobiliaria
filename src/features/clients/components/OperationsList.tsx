import { CalendarClock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ClientOperation,
  OperationStatus,
} from "@/features/clients/types";

interface OperationsListProps {
  operations: ClientOperation[];
}

const STATUS_LABELS: Record<OperationStatus, string> = {
  activa: "Activa",
  "en-proceso": "En proceso",
  finalizada: "Finalizada",
};

const STATUS_STYLES: Record<OperationStatus, string> = {
  activa: "bg-primary/15 text-primary",
  "en-proceso": "bg-accent text-accent-foreground",
  finalizada: "bg-muted text-muted-foreground",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function OperationsList({ operations }: OperationsListProps) {
  if (operations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        Todavía no registrás operaciones con nosotros.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {operations.map((operation) => (
        <li key={operation.id}>
          <Card className="p-0">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg">{operation.title}</h3>
                  <Badge className={STATUS_STYLES[operation.status]}>
                    {STATUS_LABELS[operation.status]}
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {operation.propertyAddress}
                </p>
                {operation.nextStep ? (
                  <p className="flex items-center gap-1.5 text-sm text-foreground">
                    <CalendarClock className="h-4 w-4 text-primary" aria-hidden />
                    Próximo paso: {operation.nextStep}
                  </p>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                Última actualización:{" "}
                {DATE_FORMATTER.format(new Date(operation.updatedAt))}
              </p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
