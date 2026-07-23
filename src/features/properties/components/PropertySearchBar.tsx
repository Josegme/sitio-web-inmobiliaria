"use client";

import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertySearchBarProps {
  /** Callback disparado al ejecutar la búsqueda. Recibe el texto crudo del input. */
  onSearch?: (query: string) => void;
}

/**
 * Barra de búsqueda de la galería.
 *
 * TODO: [SEARCH] — punto de extensión para búsqueda inteligente con IA.
 * Hoy: input controlado + botón que dispara `onSearch(query)`. La página
 * Galería consume este componente y por ahora filtra localmente (o
 * simplemente ignora la query hasta que el módulo real se implemente).
 *
 * Cómo enganchar el módulo de IA:
 * 1. Convertir el handler `onSearch` en una llamada a un Server Action
 *    o Route Handler que ejecute búsqueda semántica sobre las propiedades.
 * 2. El resultado debe seguir siendo `Property[]` para que `PropertyGrid`
 *    no requiera cambios.
 */
export function PropertySearchBar({ onSearch }: PropertySearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
      role="search"
      aria-label="Buscar propiedades"
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej.: 2 ambientes en Palermo, con balcón..."
          className="pl-9"
          aria-label="Texto de búsqueda"
        />
      </div>
      <Button type="submit" className="sm:w-auto">
        <Sparkles className="h-4 w-4" aria-hidden />
        Buscar
      </Button>
    </form>
  );
}
