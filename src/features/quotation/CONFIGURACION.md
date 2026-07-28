# Configuración del Cotizador de Inmuebles

Este documento explica cómo configurar y mantener el cotizador de propiedades, incluyendo la carga de imágenes, actualización de valores y gestión de inmuebles.

## 📁 Estructura de Archivos

El cotizador se encuentra en `src/features/quotation/` y se integra con los datos de propiedades en `src/features/properties/`.

```
src/features/
├── quotation/
│   ├── calculator.ts          # Lógica de cálculo de cotizaciones
│   ├── schemas.ts             # Validación de formularios con Zod
│   ├── types.ts               # Tipos TypeScript del cotizador
│   ├── components/
│   │   ├── QuotationForm.tsx  # Formulario de cotización
│   │   └── QuotationResult.tsx # Visualización de resultados
│   └── CONFIGURACION.md       # Este documento
└── properties/
    ├── mock-data.ts           # Datos de propiedades (incluye imágenes)
    ├── types.ts               # Tipos de propiedades
    └── components/
```

## 🖼️ Cómo se Cargan las Imágenes

Las imágenes de los inmuebles se cargan desde el archivo `src/features/properties/mock-data.ts`.

### Formato de una Propiedad

Cada propiedad en `mock-data.ts` tiene la siguiente estructura:

```typescript
{
  id: "prop-001",
  title: "Departamento moderno en Palermo",
  slug: "departamento-moderno-palermo",
  operation: "venta",              // "venta" o "alquiler"
  type: "departamento",           // tipo de propiedad
  price: 185000,
  currency: "USD",
  location: {
    neighborhood: "Palermo",
    city: "CABA"
  },
  features: {
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 78
  },
  imageUrl: "/depto.jpg",  // URL de la imagen
  imageAlt: "Living moderno con grandes ventanales",  // Texto alternativo
  featured: true,
  description: "Descripción de la propiedad..."
}
```

### Tipos de Imágenes Soportados

1. **URLs externas (Unsplash, etc.)**: Las URLs deben estar configuradas en `next.config.ts` bajo `images.remotePatterns`.
2. **Imágenes locales**: Si usás imágenes locales, colocalas en `public/` y referencialas con rutas relativas (ej: `/imagenes/casa.jpg`).

### Configuración de Next.js para Imágenes Externas

Para usar URLs externas, verificá que `next.config.ts` incluya el dominio:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Agregá otros dominios aquí si es necesario
    ],
  },
};
```

## 🔧 Configuración del Cotizador

### Actualizar Valores de Cotización

Los valores base del cotizador se configuran en `src/features/quotation/calculator.ts`:

#### 1. Precios Base por m²

```typescript
const BASE_PRICE_USD_PER_M2: Record<QuotationFormData["propertyType"], number> = {
  departamento: 2400,  // Precio base por m² para departamentos
  casa: 2100,           // Precio base por m² para casas
  ph: 1900,             // Precio base por m² para PHs
  local: 2800,          // Precio base por m² para locales
  oficina: 3200,        // Precio base por m² para oficinas
  terreno: 900,         // Precio base por m² para terrenos
};
```

**Cómo actualizar**: Modificá los valores numéricos según el mercado actual.

#### 2. Multiplicadores por Barrio

```typescript
const NEIGHBORHOOD_MULTIPLIERS: Record<string, number> = {
  "puerto madero": 1.6,    // 60% más caro que el base
  recoleta: 1.35,          // 35% más caro
  palermo: 1.3,            // 30% más caro
  belgrano: 1.2,           // 20% más caro
  "villa crespo": 1.05,    // 5% más caro
  "san isidro": 1.25,      // 25% más caro
  pilar: 0.9,              // 10% más barato
  caseros: 0.8,            // 20% más barato
  tigre: 1.0,              //Precio base     
};
```

**Cómo actualizar**:
- Agregá nuevos barrios con su multiplicador
- Modificá los valores existentes según cambios del mercado
- Los barrios no listados usan multiplicador 1 (precio base)

#### 3. Multiplicadores por Estado

```typescript
const CONDITION_MULTIPLIERS: Record<QuotationFormData["condition"], number> = {
  "a-estrenar": 1.15,    // 15% más caro
  excelente: 1.05,       // 5% más caro
  "muy-bueno": 1,        // Precio base
  "a-reciclar": 0.8,     // 20% más barato
};
```

#### 4. Rendimiento de Alquiler

```typescript
const RENT_MONTHLY_YIELD = 0.005; // ~6% anual
```

Este valor se usa para calcular el alquiler mensual aproximado desde el precio de venta.

#### 5. Porcentaje de Confianza

```typescript
const CONFIDENCE_PERCENT = 12; // ±12% de margen
```

Define el rango de confianza mostrado en la cotización.

## ➕ Agregar Nuevos Inmuebles

Para agregar un nuevo inmueble al sistema:

1. **Abrí** `src/features/properties/mock-data.ts`
2. **Agregá** una nueva propiedad al array `MOCK_PROPERTIES`:

```typescript
{
  id: "prop-009",                    // ID único
  title: "Nuevo departamento en Belgrano",
  slug: "nuevo-departamento-belgrano",
  operation: "venta",
  type: "departamento",
  price: 220000,
  currency: "USD",
  location: {
    neighborhood: "Belgrano",
    city: "CABA"
  },
  features: {
    bedrooms: 3,
    bathrooms: 2,
    areaM2: 95
  },
  imageUrl: "https://tu-url-de-imagen.com/photo.jpg",
  imageAlt: "Descripción de la imagen para accesibilidad",
  featured: true,                    // true si querés que aparezca en destacados
  description: "Descripción completa de la propiedad..."
}
```

3. **Verificá** que la URL de la imagen esté configurada en `next.config.ts` si es externa
4. **Guardá** el archivo - el cotizador automáticamente encontrará esta propiedad cuando coincida con los criterios

## ❌ Eliminar Inmuebles

Para eliminar un inmueble:

1. **Abrí** `src/features/properties/mock-data.ts`
2. **Eliminá** la entrada correspondiente del array `MOCK_PROPERTIES`
3. **Guardá** el archivo

El cotizador dejará de mostrar esa propiedad y buscará la siguiente coincidencia más cercana.

## 🔍 Cómo el Cotizador Busca Propiedades

El cotizador usa una lógica de coincidencia en cascada en `calculator.ts`:

1. **Coincidencia exacta**: Busca propiedad que coincida en tipo, operación Y barrio
2. **Coincidencia parcial**: Si no encuentra exacta, busca por tipo y operación (cualquier barrio)
3. **Coincidencia por tipo**: Si no encuentra parcial, busca solo por tipo (cualquier operación)
4. **Fallback**: Si no encuentra ninguna, usa una imagen genérica

Esto asegura que siempre se muestre una imagen relevante, incluso si no hay una coincidencia perfecta.

## 📝 Validación de Formularios

Los campos del formulario se validan en `src/features/quotation/schemas.ts` usando Zod.

Para agregar o modificar campos:

1. **Modificá** el schema `quotationFormSchema`
2. **Actualizá** el tipo `QuotationFormData` (se genera automáticamente)
3. **Agregá** el campo correspondiente en `QuotationForm.tsx`
4. **Actualizá** `QUOTATION_OPTIONS` en `calculator.ts` si es un campo select

## 🚀 Próximos Pasos (Futuro)

El código está preparado para migrar a una versión con IA:

- La función `calculateQuotation` puede volverse async
- Los componentes ya usan `await` para el cálculo
- Solo hay que reemplazar la lógica mock por llamadas a un modelo de IA o endpoint

## 🆘 Troubleshooting

### Las imágenes no se muestran

- **Verificá** que la URL sea accesible públicamente
- **Revisá** `next.config.ts` para asegurar que el dominio esté en `remotePatterns`
- **Mirá** la consola del navegador para errores de carga

### La cotización parece incorrecta

- **Revisá** los valores en `BASE_PRICE_USD_PER_M2`
- **Verificá** los multiplicadores de barrio
- **Asegurate** de que el estado de la propiedad esté correctamente configurado

### No encuentra la propiedad esperada

- **Verificá** que el barrio esté escrito igual en `mock-data.ts` y en el formulario (la búsqueda es case-insensitive pero sensible a espacios)
- **Revisá** que el tipo de propiedad coincida exactamente
- **Mirá** la consola para ver qué propiedad se está usando

## 📞 Soporte

Para más información sobre la arquitectura del proyecto, revisá `ARCHITECTURE.md` en la raíz del repositorio.
