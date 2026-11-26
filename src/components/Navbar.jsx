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
        className={`pointer-events-auto mx-auto max-w-6xl rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'glass-light shadow-luxury border-bronze-600/20'
            : 'glass-pill text-white'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 pl-1 group focus:outline-none"
          aria-label="Inicio El Recreo Condominio"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden p-1 transition-colors ${
              scrolled ? 'bg-sand-100 border border-bronze-600/20' : 'bg-white/95 shadow-md'
            }`}
          >
            <img
              src="/images/logo-el-recreo.png"
              alt="Logo El Recreo Condominio"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <span
              className={`block font-serif font-bold tracking-[0.14em] text-sm sm:text-base transition-colors ${
                scrolled ? 'text-palm-900' : 'text-white'
              }`}
            >
              EL RECREO
            </span>
            <span
              className={`block text-[9px] tracking-[0.28em] uppercase font-semibold transition-colors ${
                scrolled ? 'text-bronze-600' : 'text-bronze-300'
              }`}
            >
              Condominio
            </span>
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
                    ? 'text-palm-900/80 hover:text-bronze-700 hover:bg-bronze-600/10'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
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
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              scrolled
                ? 'bg-sand-100 text-palm-900 hover:bg-sand-200 border border-bronze-600/15'
                : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
            }`}
          >
            <Calculator size={15} />
            <span>Simular cuota</span>
          </a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappHeaderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-bronze-600 to-bronze-500 text-white shadow-bronze hover:brightness-110 transition-all"
          >
            <MessageCircle size={15} />
            <span className="hidden xs:inline">Cotizar</span>
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled
                ? 'text-palm-900 hover:bg-sand-200'
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
                className="mt-2 px-4 py-3 rounded-2xl text-sm font-semibold text-center bg-gradient-to-r from-bronze-600 to-bronze-500 text-white"
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
