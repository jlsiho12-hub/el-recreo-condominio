import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  TrendingUp,
  Handshake,
  Users,
  Trees,
  ShieldCheck,
  Store,
  Sun,
  Waves,
  Car,
  Compass,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { PROJECT_CONFIG, buildWhatsAppUrl } from '../data/projectConfig';

const OFFICIAL_PILLARS = [
  {
    icon: MapPin,
    title: 'Ubicación Estratégica',
    desc: 'Sobre la Vía a Turbana en Turbaco, Bolívar, con conectividad directa hacia Cartagena y corredor de expansión.',
  },
  {
    icon: TrendingUp,
    title: 'Alto Potencial de Valorización',
    desc: 'Invertir en lanzamiento en una zona con desarrollo vial y comercial propio multiplica tu patrimonio.',
  },
  {
    icon: Handshake,
    title: 'Facilidades de Pago',
    desc: 'Elige entre 20% inicial o sin cuota inicial separando con $2.000.000 y financia hasta 60 cuotas.',
  },
  {
    icon: Users,
    title: 'Un Proyecto que Impacta',
    desc: 'Arquitectura contemporánea, bulevar de servicios y diseño pensado para elevar la vida campestre.',
  },
];

const DIFFERENTIALS = [
  {
    num: '01',
    tag: 'Acceso Monumental',
    title: 'Portería arquitectónica en travertino y bronce',
    desc: 'Una entrada imponente con control de acceso, senderos peatonales arborizados y paisajismo caribeño que transmite respaldo y exclusividad desde el primer segundo.',
    image: '/images/porteria-recreo.jpg',
    highlights: ['Control de acceso y seguridad', 'Senderos peatonales amplios', 'Paisajismo tropical'],
  },
  {
    num: '02',
    tag: 'Infraestructura Diferencial',
    title: 'Bulevar comercial y estación de servicios en la entrada',
    desc: 'A diferencia de loteos aislados, El Recreo integra una plaza comercial moderna con locales, cafés, pabellón de atención y servicios justo en el frente vial.',
    image: '/images/plaza-comercial.jpg',
    highlights: ['Locales y comercio de conveniencia', 'Estación de servicios integrada', 'Plusvalía acelerada'],
  },
  {
    num: '03',
    tag: 'Terreno y Trazado Real',
    title: 'Urbanismo visible sobre vía principal en Turbaco',
    desc: 'Lotes amplios en un entorno verde natural con trazado vial planificado, acceso directo desde carretera pavimentada y cercanía inmediata al casco urbano de Turbaco.',
    image: '/images/vista-aerea.jpg',
    highlights: ['Acceso directo a vía pavimentada', 'Trazado vial organizado', 'Entorno natural y fresco'],
  },
];

const AMENITIES = [
  { icon: ShieldCheck, title: 'Portería Monumental', desc: 'Acceso controlado y vigilancia.' },
  { icon: Store, title: 'Plaza Comercial', desc: 'Locales y conveniencia en entrada.' },
  { icon: Car, title: 'Vías Internas Amplias', desc: 'Circulación cómoda y señalizada.' },
  { icon: Trees, title: 'Zonas Verdes y Palma', desc: 'Paisajismo campestre caribeño.' },
  { icon: Sun, title: 'Clima Fresco de Turbaco', desc: 'Brisa natural lejos del ruido urbano.' },
  { icon: Waves, title: 'Espacios para tu Casa', desc: 'Lotes pensados para piscina y terraza.' },
  { icon: Compass, title: 'Conectividad Vial', desc: 'Sobre Vía a Turbana, cerca de Cartagena.' },
  { icon: Sparkles, title: 'Alta Proyección', desc: 'Etapa inicial con precios de lanzamiento.' },
];

function AnimatedStat({ target, prefix = '', suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1100;
    const stepTime = 20;
    const increment = target / (duration / stepTime);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center px-3 py-4">
      <p className="font-serif text-4xl sm:text-5xl font-bold text-bronze-600 tabular-nums">
        {prefix}
        {val}
        {suffix}
      </p>
      <p className="text-xs sm:text-sm text-palm-900/75 font-medium mt-1.5">{label}</p>
    </div>
  );
}

export default function ProjectHighlights() {
  const whatsappVisitUrl = buildWhatsAppUrl(
    `Hola, quiero conocer más sobre la infraestructura y agendar una visita a ${PROJECT_CONFIG.brand.name} en Turbaco.`
  );

  return (
    <>
      {/* SECTION 1: 4 OFFICIAL PILLARS + ANIMATED METRICS */}
      <section id="proyecto" className="relative py-20 sm:py-28 topo-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.26em] text-bronze-600 mb-3">
              El Proyecto
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 leading-tight">
              Un proyecto que reúne{' '}
              <span className="italic text-bronze-600">ubicación, infraestructura</span> y gran
              potencial
            </h2>
            <p className="mt-4 text-palm-900/75 text-base sm:text-lg leading-relaxed">
              Diseñado para familias e inversionistas que buscan libertad campestre en Turbaco con
              la comodidad de servicios reales en la puerta de su condominio.
            </p>
          </motion.div>

          {/* 4 Official Pillars */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICIAL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-3xl bg-white p-6 sm:p-7 border border-sand-200 shadow-luxury hover:border-bronze-400/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sand-100 border border-bronze-600/15 flex items-center justify-center text-bronze-600 group-hover:bg-bronze-600 group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-palm-900 mt-5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-palm-900/70 leading-relaxed mt-2.5">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Animated Key Figures Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 rounded-3xl bg-sand-100/90 border border-sand-200 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-sand-300/70"
          >
            <AnimatedStat target={60} suffix=" cuotas" label="Plazo máximo directo" />
            <AnimatedStat target={2} prefix="$" suffix="M" label="Separación sin cuota inicial" />
            <AnimatedStat target={20} suffix="%" label="Opción cuota inicial fija" />
            <AnimatedStat target={15} suffix=" min" label="Proximidad a Cartagena" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: EDITORIAL NUMBERED INFRASTRUCTURE SHOWCASE (01-03) */}
      <section id="infraestructura" className="py-20 sm:py-28 bg-palm-950 text-white relative overflow-hidden">
        {/* Soft golden ambient glow */}
        <div className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-bronze-600/15 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.26em] text-bronze-300 mb-3">
                Infraestructura & Diferenciales
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                Más que lotes: un{' '}
                <span className="italic text-bronze-300">ecosistema arquitectónico</span> listo para
                valorizarse
              </h2>
            </div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={whatsappVisitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start lg:self-auto px-6 py-3.5 rounded-full glass-pill text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              <span>Agendar visita al terreno</span>
              <ArrowUpRight size={16} className="text-bronze-300" />
            </motion.a>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {DIFFERENTIALS.map((item, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center"
                >
                  {/* Image Card */}
                  <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                    <div className="group relative rounded-3xl overflow-hidden border border-white/15 shadow-glass aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-palm-950/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wider uppercase text-bronze-300">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Narrative Card */}
                  <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                    <span className="font-serif text-5xl sm:text-6xl font-bold text-beige-300/75 leading-none">
                      {item.num}.
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-white mt-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm text-beige-100">
                          <span className="w-2 h-2 rounded-full bg-olive-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Amenities Glassy Grid */}
          <div className="mt-20 pt-16 border-t border-beige-300/15">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-beige-300">
                Calidad de Vida
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-2">
                Espacios pensados para disfrutar y crecer
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {AMENITIES.map((am, idx) => {
                const Icon = am.icon;
                return (
                  <motion.div
                    key={am.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24, delay: idx * 0.04 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="rounded-2xl bg-white/[0.08] border border-beige-300/20 p-4 sm:p-5 hover:border-beige-300/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-olive-500/25 border border-beige-300/30 flex items-center justify-center text-beige-300 mb-3">
                      <Icon size={19} />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-white">{am.title}</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">{am.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
