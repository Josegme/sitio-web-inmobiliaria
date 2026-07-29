import { Building2, MessageSquareText, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminModuleCardProps {
  title: string;
  description: string;
  icon: "users" | "building" | "chat";
  status?: "activo" | "próximamente";
  children?: ReactNode;
  className?: string;
}

const ICONS = {
  users: Users,
  building: Building2,
  chat: MessageSquareText,
} as const;

/**
 * Tarjeta de módulo del panel admin. Sirve como contenedor de UI
 * (ej. chat) o como placeholder de features aún no cableadas.
 */
export function AdminModuleCard({
  title,
  description,
  icon,
  status = "activo",
  children,
  className,
}: AdminModuleCardProps) {
  const Icon = ICONS[icon];

  return (
    <Card className={cn("p-0", className)}>
      <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-heading text-lg">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              status === "activo"
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {status === "activo" ? "Activo" : "Próximamente"}
          </span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
