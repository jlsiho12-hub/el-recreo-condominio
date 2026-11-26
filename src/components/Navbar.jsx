import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator, MessageCircle } from 'lucide-react';
import { PROJECT_CONFIG, buildWhatsAppUrl } from '../data/projectConfig';

const NAV_LINKS = [
  { label: 'Proyecto', href: '#proyecto' },
  { label: 'Infraestructura', href: '#infraestructura' },
  { label: 'Simulador', href: '#simulador' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHeaderUrl = buildWhatsAppUrl(
    `Hola, visité la página de ${PROJECT_CONFIG.brand.name} y quiero recibir información y disponibilidad de lotes.`
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto mx-auto max-w-6xl rounded-full px-3 sm:px-5 py-2 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'glass-light shadow-luxury border-olive-500/25'
            : 'glass-pill text-white'
        }`}
      >
        {/* Prominent Brand Identity Pill (High Contrast Logo + Bigger Typography) */}
        <a
          href="#inicio"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Inicio El Recreo Condominio"
        >
          <div
            className={`flex items-center gap-3 rounded-full px-3.5 py-1.5 transition-all ${
              scrolled
                ? 'bg-sand-100 border border-beige-300/60'
                : 'bg-white shadow-md'
            }`}
          >
            <img
              src="/images/logo-el-recreo.png"
              alt="Logo El Recreo Condominio"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="hidden xs:block sm:block border-l border-beige-300/70 pl-3 leading-none">
              <span className="block font-serif font-bold tracking-[0.12em] text-base sm:text-lg text-bronze-600">
                EL RECREO
              </span>
              <span className="block text-[10px] tracking-[0.26em] uppercase font-bold text-olive-500 mt-0.5">
                Condominio
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                  scrolled
                    ? 'text-palm-900/85 hover:text-bronze-600 hover:bg-sand-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#simulador"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              scrolled
                ? 'bg-sand-100 text-bronze-600 hover:bg-beige-200/70 border border-beige-300/60'
                : 'bg-white/15 text-white hover:bg-white/25 border border-beige-300/35'
            }`}
          >
            <Calculator size={15} />
            <span>Simulador</span>
          </a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappHeaderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-bronze-600 to-olive-500 text-white shadow-bronze hover:brightness-110 transition-all"
          >
            <MessageCircle size={15} />
            <span>Hablemos</span>
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled
                ? 'text-palm-900 hover:bg-sand-100'
                : 'text-white hover:bg-white/15'
            }`}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto lg:hidden mt-2.5 mx-auto max-w-6xl rounded-3xl glass-dark p-4 text-white"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-2xl text-sm font-semibold text-center bg-gradient-to-r from-bronze-600 to-olive-500 text-white"
              >
                Solicitar asesoría personalizada
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
