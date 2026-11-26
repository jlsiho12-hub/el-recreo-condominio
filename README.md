# El Recreo Condominio — Landing Page & Embudo de Ventas

Landing page inmobiliaria interactiva, *mobile-first* y de costo **$0/mes** en hosting para **El Recreo Condominio** (Turbaco, Vía a Turbana, Bolívar).

**Desarrollado por JK Soluciones Digitales.**

## Características principales
- **Identidad visual oficial:** Paleta Bronce Dorado, Travertino y Verde Palma Oscuro, logo oficial y renders en alta calidad.
- **Simulador de Financiación Propio (2 modalidades en vivo):**
  1. **Con cuota inicial del 20%** + saldo financiado hasta **60 cuotas**.
  2. **Sin cuota inicial**, separando con **$2.000.000 COP** + saldo financiado hasta **60 cuotas**.
  - Incluye comparación en tiempo real entre ambas opciones, barra visual de distribución y envío directo del plan a **WhatsApp** o al formulario de ventas.
- **Integración lista para SmartHome CRM:** Captura UTMs de pauta (`utm_source`, `utm_medium`, `utm_campaign`), selector de indicativo de país y casilla obligatoria de **Habeas Data (Ley 1581 de 2012)**.
- **Galería inmersiva con Lightbox**, mapa interactivo de **Turbaco, Vía a Turbana**, preguntas frecuentes (FAQ), **Política de Tratamiento de Datos** + **Aviso de Privacidad** y barra fija de conversión móvil.

## Personalización rápida (1 solo archivo)
Edita [`src/data/projectConfig.js`](./src/data/projectConfig.js) para actualizar:
- Número oficial de **WhatsApp** y correo de ventas.
- **Precios y áreas (`m²`)** de los lotes.
- URL de Webhook/API o iframe de **SmartHome** (`smartHome.webhookUrl` o `smartHome.embedIframeUrl`).
- **Razón social, NIT y correo** de Habeas Data.
- Enlace de **JK Soluciones Digitales** en el footer.

## Instalación y ejecución local
```bash
npm install
npm run dev
```

## Publicación gratuita ($0/mes)
1. Sube este repositorio a **GitHub**.
2. Conéctalo en **Vercel** o **Cloudflare Pages** (Framework Preset: `Vite`, Output Directory: `dist`).
3. Cuando compres tu dominio (`.com`), conéctalo en el panel del hosting con SSL automático gratuito.
