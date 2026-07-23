import {
  Award,
  Clock,
  Handshake,
  Shield,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { DIFFERENTIALS } from "@/features/team/mock-data";
import type { Differential } from "@/features/team/types";

const ICON_MAP: Record<Differential["icon"], LucideIcon> = {
  Shield,
  Handshake,
  Award,
  TrendingUp,
  Users,
  Clock,
};

export function Differentials() {
  return (
    <section
      className="bg-muted/40 py-16 sm:py-20"
      aria-labelledby="differentials-heading"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Diferenciales"
          title="Por qué nos eligen"
          align="center"
          className="mx-auto"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIALS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <Card key={item.id} className="p-0">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
