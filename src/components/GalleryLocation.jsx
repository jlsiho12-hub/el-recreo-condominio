import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Navigation,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { PROJECT_CONFIG } from '../data/projectConfig';

const GALLERY_ITEMS = [
  {
    src: '/images/porteria-recreo.jpg',
    title: 'Portería Monumental RECREO',
    category: 'Acceso',
    desc: 'Entrada principal en piedra travertino y bronce con seguridad y senderos peatonales.',
  },
  {
    src: '/images/bulevar-acceso.jpg',
    title: 'Bulevar Principal Arborizado',
    category: 'Acceso',
    desc: 'Amplia avenida rodeada de palmas que conecta la zona comercial con el condominio.',
  },
  {
    src: '/images/plaza-comercial.jpg',
    title: 'Plaza y Locales Comerciales',
    category: 'Comercio',
    desc: 'Comercio de conveniencia, cafés y servicios diarios integrados frente al condominio.',
  },
  {
    src: '/images/estacion-servicio.jpg',
    title: 'Estación de Servicios y Comercio',
    category: 'Comercio',
    desc: 'Infraestructura de servicios moderna pensada para residentes y visitantes.',
  },
  {
    src: '/images/pabellon-comercial.jpg',
    title: 'Pabellón Arquitectónico de Entrada',
    category: 'Comercio',
    desc: 'Diseño icónico de bienvenida que da carácter y recordación al proyecto.',
  },
  {
    src: '/images/vista-aerea.jpg',
    title: 'Vista Aérea Real · Turbaco',
    category: 'Terreno',
    desc: 'Trazado real del proyecto sobre la Vía a Turbana junto al corredor urbano de Turbaco.',
  },
];

const CATEGORIES = ['Todos', 'Acceso', 'Comercio', 'Terreno'];

const PROXIMITY_POINTS = [
  { time: 'Acceso directo', place: 'Sobre la Vía a Turbana (carretera pavimentada)' },
  { time: '5 min', place: 'Casco urbano de Turbaco, bancos y supermercados' },
  { time: '15 min', place: 'Entrada sur / Terminal de Transporte de Cartagena' },
  { time: '20 min', place: 'Zona industrial y corredores estratégicos de Bolívar' },
];

export default function GalleryLocation() {
  const [filter, setFilter] = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleItems =
    filter === 'Todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight')
        setLightboxIndex((prev) => (prev + 1) % visibleItems.length);
      if (e.key === 'ArrowLeft')
        setLightboxIndex((prev) => (prev - 1 + visibleItems.length) % visibleItems.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  return (
    <>
      {/* GALLERY SECTION */}
      <section id="galeria" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-bronze-600">
                Recorrido Visual
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 mt-2">
                Conoce cada espacio de{' '}
                <span className="italic text-bronze-600">El Recreo</span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    filter === cat
                      ? 'bg-palm-900 text-white shadow-md'
                      : 'bg-sand-100 text-palm-900/75 hover:bg-sand-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => (
                <motion.button
                  layout
                  key={item.src}
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative text-left rounded-3xl overflow-hidden aspect-[4/3] bg-palm-950 shadow-luxury focus:outline-none focus:ring-2 focus:ring-bronze-500"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-palm-950/85 via-palm-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full glass-pill text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={15} />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bronze-300">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold mt-0.5">{item.title}</h3>
                    <p className="text-xs text-white/75 mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && visibleItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-[80] bg-palm-950/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Cerrar galería"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/20"
              >
                <X size={20} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + visibleItems.length) % visibleItems.length);
                }}
                aria-label="Imagen anterior"
                className="absolute left-3 sm:left-6 w-11 h-11 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/20"
              >
                <ChevronLeft size={22} />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full flex flex-col items-center"
              >
                <motion.img
                  key={visibleItems[lightboxIndex].src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={visibleItems[lightboxIndex].src}
                  alt={visibleItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl border border-white/15"
                />
                <div className="text-center text-white mt-4 max-w-xl">
                  <h3 className="font-serif text-2xl font-semibold">
                    {visibleItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-white/75 mt-1">
                    {visibleItems[lightboxIndex].desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
                }}
                aria-label="Imagen siguiente"
                className="absolute right-3 sm:right-6 w-11 h-11 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/20"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* LOCATION & INTERACTIVE MAP SECTION */}
      <section id="ubicacion" className="py-20 sm:py-28 bg-sand-100/75 border-y border-sand-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.26em] text-bronze-600 mb-3">
                <MapPin size={14} />
                Ubicación Estratégica
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 leading-tight">
                Turbaco,{' '}
                <span className="italic text-bronze-600">Vía a Turbana</span>, Bolívar
              </h2>
              <p className="mt-4 text-sm sm:text-base text-palm-900/75 leading-relaxed">
                En uno de los corredores con mayor crecimiento residencial y valorización del área
                metropolitana de Cartagena: aire fresco, naturaleza y conexión vial inmediata.
              </p>

              <div className="mt-7 space-y-3">
                {PROXIMITY_POINTS.map((pt) => (
                  <div
                    key={pt.place}
                    className="flex items-center gap-3.5 rounded-2xl bg-white p-3.5 border border-sand-200 shadow-sm"
                  >
                    <div className="px-3 py-1.5 rounded-xl bg-palm-900 text-bronze-300 text-xs font-bold shrink-0 inline-flex items-center gap-1.5">
                      <Clock size={13} />
                      <span>{pt.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-palm-900">{pt.place}</p>
                  </div>
                ))}
              </div>

              <a
                href={PROJECT_CONFIG.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-palm-900 text-white text-sm font-semibold hover:bg-palm-800 transition-colors shadow-md"
              >
                <Navigation size={16} className="text-bronze-300" />
                <span>Abrir ubicación en Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-sand-300 shadow-luxury bg-white p-2">
                <iframe
                  title="Mapa de ubicación El Recreo Condominio - Turbaco, Vía a Turbana"
                  src={PROJECT_CONFIG.contact.mapsEmbedUrl}
                  className="w-full h-[380px] sm:h-[440px] rounded-2xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
