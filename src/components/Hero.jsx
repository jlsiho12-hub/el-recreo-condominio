import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Calculator,
  MessageCircle,
  Sparkles,
  CalendarClock,
  ShieldCheck,
  Store,
  ChevronDown,
} from 'lucide-react';
import { PROJECT_CONFIG, formatCOP, buildWhatsAppUrl } from '../data/projectConfig';

const MARQUEE_ITEMS = [
  'TURBACO • VÍA A TURBANA',
  'PORTERÍA MONUMENTAL',
  'ZONA COMERCIAL EN ACCESO',
  'SEPARA CON $2.000.000',
  'FINANCIACIÓN DIRECTA HASTA 60 CUOTAS',
  'ALTO POTENCIAL DE VALORIZACIÓN',
  'CONDOMINIO CAMPESTRE EN BOLÍVAR',
];

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  const lowestPrice = Math.min(...PROJECT_CONFIG.financing.lotTiers.map((l) => l.price));
  const whatsappHeroUrl = buildWhatsAppUrl(
    `¡Hola! Vi la portada de ${PROJECT_CONFIG.brand.name} (Turbaco, Vía a Turbana) y quiero conocer los lotes disponibles y planes de financiación hasta 60 cuotas.`
  );

  const heroStats = [
    {
      icon: Sparkles,
      label: 'Sin cuota inicial',
      value: `Separa con ${formatCOP(PROJECT_CONFIG.financing.separationFee)}`,
      sub: 'Saldo directo hasta 60 cuotas',
    },
    {
      icon: CalendarClock,
      label: 'O con inicial del 20%',
      value: 'Hasta 60 meses',
      sub: 'Cuota mensual más cómoda',
    },
    {
      icon: Store,
      label: 'Acceso comercial',
      value: 'Bulevar propio',
      sub: 'Locales y servicios en entrada',
    },
    {
      icon: ShieldCheck,
      label: 'Ubicación real',
      value: 'Vía a Turbana',
      sub: `Lotes desde ${formatCOP(lowestPrice)}*`,
    },
  ];

  return (
    <section id="inicio" ref={heroRef} className="relative overflow-hidden bg-palm-950">
      {/* Parallax Full-Bleed Architectural Hero */}
      <div className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-12">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img
            src="/images/porteria-recreo.jpg"
            alt="Portería monumental de El Recreo Condominio en Turbaco, Vía a Turbana"
            className="w-full h-full object-cover object-center"
          />
          {/* Rich editorial dark scrim for guaranteed readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-palm-950/75 via-palm-950/50 to-palm-950/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-palm-950/75 via-palm-950/25 to-transparent" />
        </motion.div>

        {/* Main Center Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 my-auto py-8 sm:py-12">
          <div className="max-w-3xl">
            {/* Location Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-sand-100 tracking-wide mb-6"
            >
              <MapPin size={15} className="text-bronze-300 shrink-0" />
              <span>{PROJECT_CONFIG.brand.locationBadge}</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-semibold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.03] tracking-tight"
            >
              Aquí comienza{' '}
              <span className="italic text-bronze-300 font-medium">
                lo que soñaste
              </span>
            </motion.h1>

            {/* Handwritten Script Accent from Official Brand Poster */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="font-script text-3xl sm:text-4xl text-sand-200 mt-2 sm:mt-3"
            >
              {PROJECT_CONFIG.brand.subtitle}
            </motion.p>

            {/* Value Proposition Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed"
            >
              Un condominio campestre de nueva generación sobre la{' '}
              <strong className="text-white font-semibold">Vía a Turbana</strong> que reúne
              portería monumental, bulevar comercial en entrada y{' '}
              <strong className="text-bronze-300 font-semibold">
                dos opciones de financiación directa hasta 60 cuotas
              </strong>
              .
            </motion.p>

            {/* Primary Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#simulador"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-bronze-600 via-bronze-500 to-bronze-400 text-white font-semibold text-sm sm:text-base shadow-bronze hover:brightness-110 transition-all"
              >
                <Calculator size={18} />
                <span>Simular mi plan de pago</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full glass-pill text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-all"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span>Hablar con un asesor</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Glassy Metrics Dock (visionOS / Glassy Dashboard V2 pattern) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="glass-dark rounded-3xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {heroStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bronze-400/35 to-bronze-700/20 border border-bronze-300/30 flex items-center justify-center text-bronze-300 shrink-0">
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/60 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white tracking-tight truncate mt-0.5 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/65 mt-0.5">{stat.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Subtle scroll cue */}
          <div className="hidden sm:flex justify-center mt-5">
            <a
              href="#proyecto"
              className="inline-flex flex-col items-center text-white/55 hover:text-bronze-300 transition-colors text-[11px] tracking-[0.2em] uppercase"
            >
              <span>Descubrir</span>
              <ChevronDown size={16} className="animate-bounce mt-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Marquee Strip */}
      <div className="bg-palm-900 border-y border-white/10 py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-6 mx-6 text-xs sm:text-sm tracking-[0.22em] font-semibold text-sand-200/85 uppercase"
            >
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
