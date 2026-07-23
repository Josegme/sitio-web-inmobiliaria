import type { Property } from "@/features/properties/types";

/**
 * Set de propiedades de ejemplo (mock).
 * Cuando exista backend o CMS real, reemplazar este archivo por una
 * función `fetchProperties()` que devuelva `Promise<Property[]>` y
 * actualizar los consumidores. Ningún componente conoce la fuente:
 * todos importan desde acá.
 *
 * NOTA: las imágenes son URLs públicas de Unsplash. Están habilitadas
 * en `next.config.ts` bajo `images.remotePatterns`.
 */
export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-001",
    title: "Departamento moderno en Palermo",
    slug: "departamento-moderno-palermo",
    operation: "venta",
    type: "departamento",
    price: 185000,
    currency: "USD",
    location: { neighborhood: "Palermo", city: "CABA" },
    features: { bedrooms: 2, bathrooms: 2, areaM2: 78 },
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Living moderno con grandes ventanales y luz natural",
    featured: true,
    description:
      "Departamento de 2 ambientes recientemente reciclado, con balcón corrido y vista abierta.",
  },
  {
    id: "prop-002",
    title: "Casa familiar en San Isidro",
    slug: "casa-familiar-san-isidro",
    operation: "venta",
    type: "casa",
    price: 495000,
    currency: "USD",
    location: { neighborhood: "San Isidro", city: "Buenos Aires" },
    features: { bedrooms: 4, bathrooms: 3, areaM2: 220 },
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Fachada de casa moderna con jardín delantero",
    featured: true,
    description:
      "Casa de 4 dormitorios en barrio residencial, con jardín, cochera doble y quincho.",
  },
  {
    id: "prop-003",
    title: "PH luminoso en Villa Crespo",
    slug: "ph-luminoso-villa-crespo",
    operation: "venta",
    type: "ph",
    price: 145000,
    currency: "USD",
    location: { neighborhood: "Villa Crespo", city: "CABA" },
    features: { bedrooms: 2, bathrooms: 1, areaM2: 65 },
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "PH luminoso con patio interno",
    featured: true,
    description:
      "PH al frente con patio, ideal para primera vivienda. Excelente ubicación cerca de subte.",
  },
  {
    id: "prop-004",
    title: "Alquiler amoblado en Recoleta",
    slug: "alquiler-amoblado-recoleta",
    operation: "alquiler",
    type: "departamento",
    price: 950000,
    currency: "ARS",
    location: { neighborhood: "Recoleta", city: "CABA" },
    features: { bedrooms: 1, bathrooms: 1, areaM2: 45 },
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Departamento amoblado con estilo minimalista",
    featured: true,
    description:
      "Monoambiente premium totalmente amoblado, listo para habitar. Amenities completos.",
  },
  {
    id: "prop-005",
    title: "Local comercial en Belgrano",
    slug: "local-comercial-belgrano",
    operation: "alquiler",
    type: "local",
    price: 1350000,
    currency: "ARS",
    location: { neighborhood: "Belgrano", city: "CABA" },
    features: { bedrooms: 0, bathrooms: 1, areaM2: 120 },
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Local comercial a la calle con vidriera amplia",
    featured: false,
    description:
      "Local a la calle sobre avenida comercial, con vidriera amplia y depósito trasero.",
  },
  {
    id: "prop-006",
    title: "Casa quinta en Pilar",
    slug: "casa-quinta-pilar",
    operation: "venta",
    type: "casa",
    price: 320000,
    currency: "USD",
    location: { neighborhood: "Pilar", city: "Buenos Aires" },
    features: { bedrooms: 3, bathrooms: 2, areaM2: 180 },
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Casa quinta con pileta y parque arbolado",
    featured: false,
    description:
      "Casa quinta en barrio cerrado, con pileta, parque y quincho. Excelente inversión.",
  },
  {
    id: "prop-007",
    title: "Oficina premium en Puerto Madero",
    slug: "oficina-premium-puerto-madero",
    operation: "alquiler",
    type: "oficina",
    price: 2100000,
    currency: "ARS",
    location: { neighborhood: "Puerto Madero", city: "CABA" },
    features: { bedrooms: 0, bathrooms: 2, areaM2: 150 },
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Oficina moderna con vista panorámica",
    featured: false,
    description:
      "Oficina premium en torre corporativa, con vista al río y amenities de nivel internacional.",
  },
  {
    id: "prop-008",
    title: "Terreno en La Plata",
    slug: "terreno-la-plata",
    operation: "venta",
    type: "terreno",
    price: 85000,
    currency: "USD",
    location: { neighborhood: "City Bell", city: "La Plata" },
    features: { bedrooms: 0, bathrooms: 0, areaM2: 600 },
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Terreno amplio con arboleda al fondo",
    featured: false,
    description:
      "Lote apto para construcción de vivienda unifamiliar en zona residencial consolidada.",
  },
];

/**
 * Devuelve las propiedades marcadas como destacadas.
 * Se usa en Home para el bloque "Propiedades destacadas".
 */
export function getFeaturedProperties(limit = 4): Property[] {
  return MOCK_PROPERTIES.filter((property) => property.featured).slice(0, limit);
}
