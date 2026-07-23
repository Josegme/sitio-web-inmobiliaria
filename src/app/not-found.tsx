import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-muted/40">
      <Container className="text-center">
        <p className="font-heading text-6xl text-primary sm:text-7xl">404</p>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          La página que estás buscando no existe o fue movida. Volvé al inicio
          o explorá nuestra galería de propiedades.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href={ROUTES.home}>Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.gallery}>Ver galería</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
