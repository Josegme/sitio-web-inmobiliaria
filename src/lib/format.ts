/**
 * Formateadores compartidos por el proyecto.
 *
 * Locale fijo en `es-AR` para consistencia visual (pesos argentinos,
 * separadores de miles con punto y decimales con coma).
 */

const CURRENCY_FORMATTERS: Record<string, Intl.NumberFormat> = {
  ARS: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
};

export type CurrencyCode = keyof typeof CURRENCY_FORMATTERS;

export function formatCurrency(amount: number, currency: CurrencyCode = "ARS"): string {
  const formatter = CURRENCY_FORMATTERS[currency];
  return formatter.format(amount);
}

/**
 * Formatea un número de teléfono argentino en formato humano legible.
 * Espera un string tipo `+5491155551234` y devuelve `+54 9 11 5555-1234`.
 * Si el input no matchea el patrón esperado, lo devuelve sin cambios.
 */
export function formatPhoneAR(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  const match = digits.match(/^54(9)?(\d{2,4})(\d{4})(\d{4})$/);
  if (!match) return rawPhone;
  const [, mobile, area, first, second] = match;
  const mobilePart = mobile ? " 9" : "";
  return `+54${mobilePart} ${area} ${first}-${second}`;
}

/**
 * Construye la URL de WhatsApp lista para abrir un chat prellenado.
 * Se usa desde botones flotantes, footer y CTAs.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
