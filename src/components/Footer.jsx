import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Calculator, ArrowUp } from 'lucide-react';
import { PROJECT_CONFIG, buildWhatsAppUrl } from '../data/projectConfig';

export default function Footer({ onOpenLegal }) {
  const floatingWaUrl = buildWhatsAppUrl(
    `Hola ${PROJECT_CONFIG.brand.name}, quiero recibir información de lotes disponibles y financiación.`
  );

  return (
    <>
      <footer className="bg-palm-950 text-white pt-16 pb-24 sm:pb-12 border-t border-beige-300/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-lg">
                <img
                  src="/images/logo-el-recreo.png"
                  alt="Logo El Recreo Condominio"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <p className="font-serif italic text-xl text-beige-300 mt-5">
                {PROJECT_CONFIG.brand.subtitle}
              </p>
              <p className="text-sm text-white/70 mt-2 max-w-sm leading-relaxed">
                Condominio campestre con zona comercial en acceso principal ubicado en Turbaco, Vía
                a Turbana, Bolívar.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-beige-300 mb-4">
                Navegación
              </h4>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <a href="#proyecto" className="hover:text-beige-300 transition-colors">
                    El Proyecto
                  </a>
                </li>
                <li>
                  <a href="#infraestructura" className="hover:text-beige-300 transition-colors">
                    Infraestructura
                  </a>
                </li>
                <li>
                  <a href="#simulador" className="hover:text-beige-300 transition-colors">
                    Simulador de Cuotas
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-beige-300 transition-colors">
                    Galería de Renders
                  </a>
                </li>
                <li>
                  <a href="#ubicacion" className="hover:text-beige-300 transition-colors">
                    Ubicación
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-beige-300 mb-4">
                Contacto y Legal
              </h4>
              <ul className="space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-beige-300 shrink-0 mt-0.5" />
                  <span>{PROJECT_CONFIG.contact.salesRoomAddress}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-beige-300 shrink-0" />
                  <span>{PROJECT_CONFIG.contact.whatsappDisplay}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-beige-300 shrink-0" />
                  <span className="break-all">{PROJECT_CONFIG.contact.email}</span>
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => onOpenLegal('policy')}
                  className="text-white/70 hover:text-beige-300 underline underline-offset-4 transition-colors"
                >
                  Política de Habeas Data
                </button>
                <span className="text-white/25">•</span>
                <button
                  type="button"
                  onClick={() => onOpenLegal('notice')}
                  className="text-white/70 hover:text-beige-300 underline underline-offset-4 transition-colors"
                >
                  Aviso de Privacidad
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar + JK Soluciones Digitales Attribution */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} {PROJECT_CONFIG.brand.name}. Todos los derechos
              reservados.
            </p>

            {/* Official Developer Credit: JK Soluciones Digitales */}
            <a
              href={PROJECT_CONFIG.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-beige-300/20 transition-all"
            >
              <span className="text-white/70 group-hover:text-white transition-colors">
                {PROJECT_CONFIG.developer.label}{' '}
                <strong className="text-white font-semibold">
                  {PROJECT_CONFIG.developer.name}
                </strong>
              </span>
              <span className="h-6 px-1.5 rounded-md bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={PROJECT_CONFIG.developer.logo}
                  alt="Logo JK Soluciones Digitales"
                  className="h-5 w-auto object-contain"
                />
              </span>
            </a>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp + Back to Top */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        <a
          href="#inicio"
          aria-label="Volver arriba"
          className="w-10 h-10 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ArrowUp size={16} />
        </a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href={floatingWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-bronze-600 to-olive-500 text-white font-semibold text-sm shadow-bronze hover:brightness-110 transition-all"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </motion.a>
      </div>

      {/* Mobile Sticky Bottom Conversion Dock (Glassy visionOS pill) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="glass-pill rounded-full p-1.5 flex items-center gap-1.5 shadow-2xl">
          <a
            href="#simulador"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-white text-palm-900 font-bold text-xs shadow"
          >
            <Calculator size={15} className="text-bronze-600" />
            <span>Simular cuota</span>
          </a>
          <a
            href={floatingWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-bronze-600 to-olive-500 text-white font-bold text-xs shadow"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
