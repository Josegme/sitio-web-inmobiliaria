export function processUserMessage(message: string): string {
  const text = message.toLowerCase();

  // 1. Hablar con un asesor (ÚNICO MOMENTO DONDE VA EL LINK DE WHATSAPP)
  if (text.includes('asesor') || text.includes('comunicarme') || text.includes('hablar con alguien') || text.includes('si, por favor') || text.includes('si me gustaria')) {
    return '📲 ¡Excelente! Te comunico directamente con nuestro equipo de atención comercial por WhatsApp para agendar tu visita o resolver dudas al instante:\n\n👉 [Abrir Chat de WhatsApp con un Asesor](https://wa.me/5491100000000?text=Hola,%20estoy%20en%20la%20web%20de%20Horizonte%20Propiedades%20y%20quiero%20hablar%20con%20un%20asesor)';
  }

  // 2. Combinación específica: PH en San Isidro
  if ((text.includes('ph') || text.includes('departamento')) && text.includes('san isidro')) {
    return '🏡 Actualmente en **San Isidro** tenemos disponible principalmente nuestra destacada **Casa Familiar**, pero podemos revisar opciones de PH en la zona.\n\n¿Te gustaría que te comunique con un asesor para buscar PHs específicos allí?';
  }

  // 3. Búsqueda de PHs (Villa Crespo u general) - SIN LINK DE WPP
  if (text.includes('ph') || text.includes('departamento') || text.includes('crespo')) {
    return '🔍 ¡Búsqueda inteligente activada!\n\n• **PH Luminoso en Villa Crespo**\n• Precio: US$ 145.000\n• 2 Dormitorios | 1 Baño | 88 m²\n\n¿Deseas alquilar o comprar esta propiedad?\n\n👉 [Ver Fotos del PH en la Galería](#galeria)';
  } 
  
  // 4. Búsqueda de casas (San Isidro) - SIN LINK DE WPP
  if (text.includes('casa') || text.includes('san isidro') || text.includes('familiar') || text.includes('link') || text.includes('ver la casa')) {
    return '🏡 ¡Búsqueda inteligente activada!\n\n• **Casa Familiar en San Isidro**\n• Precio: US$ 495.000\n• 4 Dormitorios | 3 Baños | 290 m²\n\nAquí tienes el enlace directo para ver todas las fotos y detalles en la galería:\n\n👉 [Ver Casa en San Isidro en la Galería](#galeria)\n\n¿Te gustaría que un asesor te contacte por esta propiedad?';
  } 

  // 5. Detectar intención de Alquiler - SIN LINK DE WPP
  if (text.includes('alquilar') || text.includes('alquiler')) {
    return '🏠 ¡Perfecto! Filtrando opciones de **alquiler** en nuestra base de datos...\n\nTenemos un hermoso PH disponible para habitar. Puedes ver todas las imágenes y detalles haciendo clic aquí:\n\n👉 [Ver PH en Alquiler en la Galería](#galeria)\n\n¿Te gustaría que te comunique con un asesor para coordinar una visita?';
  } 

  // 6. Detectar intención de Venta / Comprar - SIN LINK DE WPP
  if (text.includes('comprar') || text.includes('venta')) {
    return '💰 ¡Excelente! Buscando propiedades en **venta**...\n\nContamos con opciones destacadas en Capital Federal y GBA. Explora el catálogo completo con fotos en alta definición aquí:\n\n👉 [Ir a la Galería de Ventas](#galeria)\n\n¿Quieres que un asesor te contacte por alguna de estas opciones?';
  }
  
  // 7. Política de Mascotas - SIN LINK DE WPP
  if (text.includes('perro') || text.includes('gato') || text.includes('mascota') || text.includes('animales')) {
    return '🐾 **Política de Mascotas:**\n¡Entendemos que son parte de la familia! La aceptación de mascotas depende de cada reglamento de copropiedad del PH o edificio.\n\nPara este caso, se permiten mascotas pequeñas previa autorización. ¿Te gustaría que te comunique con un asesor para confirmarlo con el propietario?';
  }

  // 8. Medios de pago y financiación - SIN LINK DE WPP
  if (text.includes('pago') || text.includes('efectivo') || text.includes('transferencia') || text.includes('cuenta') || text.includes('credito') || text.includes('créditos')) {
    return '💳 **Medios de Pago y Financiación:**\nEn Horizonte Propiedades aceptamos transferencias bancarias, depósitos y ofrecemos asesoramiento para créditos hipotecarios.\n\n¿Deseas que un asesor financiero se comunique contigo para darte los detalles?';
  }

  // 9. Tasaciones - SIN LINK DE WPP
  if (text.includes('cotizar') || text.includes('tasación')) {
    return '📊 **Asistente de Tasación IA:**\nPuedes usar nuestro cotizador automático en la parte superior de la página o pedir que un tasador oficial se comunique contigo.';
  }

  // 10. Respuesta por defecto - SIN LINK DE WPP
  return '💡 Entendido. Para darte la mejor atención, dime: ¿Estás buscando **comprar** o **alquilar**, o prefieres que te comunique directamente con un asesor?';
}