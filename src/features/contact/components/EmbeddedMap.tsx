import { COMPANY_INFO } from "@/lib/constants";

/**
 * Mapa embebido con `<iframe>` de OpenStreetMap.
 * Usamos OSM en vez de Google Maps para no requerir API key y evitar
 * scripts de terceros — se ve profesional y es 100% funcional.
 * El bbox se genera alrededor de las coordenadas configuradas en
 * `COMPANY_INFO.location`.
 */
export function EmbeddedMap() {
  const { lat, lng } = COMPANY_INFO.location;
  const delta = 0.005;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const linkOut = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-muted">
      <iframe
        title={`Mapa con la ubicación de ${COMPANY_INFO.name}`}
        src={src}
        loading="lazy"
        className="h-72 w-full sm:h-80"
      />
      <figcaption className="border-t border-border bg-card p-3 text-xs text-muted-foreground">
        {COMPANY_INFO.address} —{" "}
        <a
          href={linkOut}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Ver en OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}
