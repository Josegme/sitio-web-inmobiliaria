/**
 * Mapeo de tipos de propiedad a sus imágenes correspondientes.
 * Las imágenes deben estar guardadas en public/images/properties/
 * con los nombres especificados aquí.
 */

export const PROPERTY_IMAGES: Record<string, string> = {
  departamento: "/images/properties/departamento.jpg",
  casa: "/images/properties/casa.jpg",
  ph: "/images/properties/ph.jpg",
  local: "/images/properties/local.jpg",
  oficina: "/images/properties/oficina.jpg",
  terreno: "/images/properties/terreno.jpg",
};

/**
 * Obtiene la URL de la imagen para un tipo de propiedad.
 * Si no encuentra una específica, devuelve una imagen genérica.
 */
export function getPropertyImageByType(propertyType: string): string {
  return PROPERTY_IMAGES[propertyType] || "/images/properties/departamento.jpg";
}
