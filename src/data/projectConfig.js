/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA — EL RECREO CONDOMINIO
 * ============================================================================
 * Edita este único archivo para actualizar precios, áreas, WhatsApp, conexión
 * con SmartHome, razón social (Habeas Data) o enlaces sin tocar los componentes.
 */

export const PROJECT_CONFIG = {
  brand: {
    name: 'El Recreo Condominio',
    shortName: 'El Recreo',
    tagline: 'Aquí comienza lo que soñaste',
    subtitle: 'Tu lugar. Tu historia. Tu futuro.',
    launchTagline: 'Tu próximo proyecto se acerca y tú puedes ser parte',
    locationBadge: 'TURBACO • VÍA A TURBANA, BOLÍVAR',
    locationShort: 'Turbaco, Vía a Turbana',
    proximityHighlight: 'A minutos de Cartagena',
  },

  /**
   * CONTACTO Y WHATSAPP
   * Reemplaza `whatsappNumber` con el número oficial (código país 57 + 10 dígitos, sin + ni espacios).
   */
  contact: {
    whatsappNumber: '573000000000', // <-- EDITAR: Número oficial de WhatsApp de El Recreo
    whatsappDisplay: '+57 300 000 0000',
    email: 'ventas@elrecreocondominio.com', // <-- EDITAR: Correo oficial
    schedule: 'Lunes a Domingo · 8:00 a.m. – 6:00 p.m.',
    salesRoomAddress: 'Turbaco, Vía a Turbana, Bolívar, Colombia',
    instagramUrl: 'https://instagram.com/',
    facebookUrl: 'https://facebook.com/',
    mapsUrl: 'https://maps.app.goo.gl/RnFb21Sk155QBmo3A',
    // Iframe gratuito de Google Maps apuntando exactamente al pin real del proyecto (10.321868, -75.4262723)
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=10.321868,-75.4262723&t=k&z=16&ie=UTF8&iwloc=&output=embed',
  },

  /**
   * INTEGRACIÓN CON SMARTHOME CRM (O FORMULARIO EXTERNO)
   * Cuando el cliente entregue la URL de Webhook/API de SmartHome, pégala en `webhookUrl`.
   * Si prefieren el iframe oficial de SmartHome (+Lead), pégalo en `embedIframeUrl`.
   * Mientras ambos estén vacíos, el formulario valida, registra el lead localmente en sesión
   * y ofrece envío directo inmediato a WhatsApp con todos los datos listos.
   */
  smartHome: {
    enabled: false,
    webhookUrl: '', // Ej: 'https://api.smart-home.com.co/v1/leads'
    apiKey: '', // Opcional si SmartHome solicita header de autorización
    projectCode: 'EL_RECREO_CONDOMINIO',
    embedIframeUrl: '', // Opcional: si SmartHome entrega URL embebible (+Lead)
  },

  /**
   * FINANCIACIÓN Y LOTES (PARA EL SIMULADOR DE CUOTAS)
   * Reglas reales del proyecto:
   * - Modalidad 1: Cuota inicial del 20% + saldo hasta 60 cuotas (0% interés).
   * - Modalidad 2: Sin cuota inicial, solo separación de $2.000.000 + saldo en hasta 60 cuotas.
   */
  financing: {
    downPaymentPercent: 20,
    separationFee: 2000000,
    maxInstallments: 60,
    minInstallments: 12,
    installmentPresets: [12, 24, 36, 48, 60],
    interestRateMonthly: 0, // 0% financiación directa
    // Lotes referenciales (ajusta valores y áreas reales cuando los confirme el cliente)
    lotTiers: [
      {
        id: 'estandar',
        name: 'Lote Campestre',
        badge: 'Más elegido',
        areaM2: 200,
        price: 55000000,
        description: 'Ideal para tu primera casa campestre con zonas verdes y acceso rápido.',
      },
      {
        id: 'esquinero',
        name: 'Lote Familiar Plus',
        badge: 'Alta valorización',
        areaM2: 250,
        price: 68000000,
        description: 'Mayor frente y amplitud para piscina privada, terraza y jardín.',
      },
      {
        id: 'premium',
        name: 'Lote Premium Bulevar',
        badge: 'Exclusivo',
        areaM2: 320,
        price: 88000000,
        description: 'Ubicación privilegiada cerca del acceso principal y área comercial.',
      },
    ],
  },

  /**
   * DATOS LEGALES — HABEAS DATA (LEY 1581 DE 2012 - COLOMBIA)
   * Borrador listo para revisión legal final por parte del cliente.
   */
  legal: {
    companyName: 'PROMOTORA EL RECREO S.A.S. (Por confirmar)',
    nit: 'Por definir',
    city: 'Turbaco, Bolívar, Colombia',
    privacyEmail: 'datos@elrecreocondominio.com',
    lastUpdated: 'Noviembre 2026',
  },

  /**
   * CRÉDITOS DE DESARROLLO
   */
  developer: {
    label: 'Desarrollado por',
    name: 'JK Soluciones Digitales',
    logo: '/images/logo-jk.jpg',
    url: 'https://wa.me/573000000000?text=Hola%20JK%20Soluciones%20Digitales%2C%20vi%20la%20web%20de%20El%20Recreo%20Condominio%20y%20quiero%20cotizar%20un%20proyecto.', // <-- EDITAR con tu WhatsApp/web
  },
};

export const formatCOP = (amount) => {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(safe);
};

export const buildWhatsAppUrl = (message, customNumber) => {
  const phone = (customNumber || PROJECT_CONFIG.contact.whatsappNumber).replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
