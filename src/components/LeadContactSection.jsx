import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PROJECT_CONFIG, buildWhatsAppUrl } from '../data/projectConfig';

const COUNTRY_CODES = [
  { code: '+57', label: 'CO +57' },
  { code: '+1', label: 'US +1' },
  { code: '+34', label: 'ES +34' },
  { code: '+507', label: 'PA +507' },
  { code: '+52', label: 'MX +52' },
  { code: '+56', label: 'CL +56' },
  { code: '+58', label: 'VE +58' },
];

const FAQS = [
  {
    q: '¿Cuáles son las opciones de financiación directa en El Recreo Condominio?',
    a: 'Contamos con dos modalidades flexibles: Opción 1 con 20% de cuota inicial y saldo hasta en 60 cuotas (para lograr la cuota mensual más cómoda), u Opción 2 sin cuota inicial, separando tu lote con $2.000.000 COP y dividiendo el saldo restante hasta en 60 cuotas.',
  },
  {
    q: '¿Puedo elegir menos de 60 cuotas si quiero pagar más rápido?',
    a: 'Sí. El plazo máximo es de 60 cuotas, pero puedes ajustar tu plan a 12, 24, 36, 48 o el número exacto de cuotas que mejor se adapte a tu flujo de caja.',
  },
  {
    q: '¿Dónde exactamente está ubicado el condominio?',
    a: 'Está ubicado en Turbaco, sobre la Vía a Turbana, Bolívar, con acceso directo desde carretera pavimentada y a pocos minutos del casco urbano de Turbaco y de Cartagena.',
  },
  {
    q: '¿Cómo puedo agendar una visita presencial o videollamada?',
    a: 'Solo déjanos tus datos en el formulario o escríbenos por WhatsApp. Un asesor comercial coordina tu recorrido en terreno o una presentación virtual si te encuentras fuera de la ciudad o en el exterior.',
  },
  {
    q: '¿Mis datos personales están protegidos al registrarme?',
    a: 'Sí. Cumplimos con la Ley 1581 de 2012 (Habeas Data en Colombia). Tu información se usa exclusivamente para enviarte cotizaciones y acompañamiento comercial del proyecto.',
  },
];

export default function LeadContactSection({ simulationContext, onOpenLegal }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    countryCode: '+57',
    phone: '',
    financingPreference: 'Sin cuota inicial (Separación $2.000.000)',
    message: '',
    habeasData: false,
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  // Auto-populate form when user clicks "Enviar simulación al formulario"
  useEffect(() => {
    if (!simulationContext) return;
    setForm((prev) => ({
      ...prev,
      financingPreference: simulationContext.planLabel,
      message: `Me interesa esta simulación: ${simulationContext.summary}`,
    }));
  }, [simulationContext]);

  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || 'web_directa',
      utm_medium: params.get('utm_medium') || 'landing',
      utm_campaign: params.get('utm_campaign') || 'el_recreo_lanzamiento',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.fullName.trim() || !form.phone.trim()) {
      setErrorMsg('Por favor completa tu nombre y número de WhatsApp.');
      return;
    }
    if (!form.habeasData) {
      setErrorMsg('Debes autorizar la política de tratamiento de datos (Habeas Data) para continuar.');
      return;
    }

    setStatus('submitting');

    const payload = {
      project: PROJECT_CONFIG.smartHome.projectCode,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: `${form.countryCode}${form.phone.replace(/\D/g, '')}`,
      financingPreference: form.financingPreference,
      message: form.message.trim(),
      habeasDataAccepted: true,
      habeasDataTimestamp: new Date().toISOString(),
      sourceUrl: window.location.href,
      ...getUtmParams(),
    };

    try {
      // Ready for direct SmartHome Webhook / API connection at $0 extra cost
      if (PROJECT_CONFIG.smartHome.enabled && PROJECT_CONFIG.smartHome.webhookUrl) {
        const headers = { 'Content-Type': 'application/json' };
        if (PROJECT_CONFIG.smartHome.apiKey) {
          headers.Authorization = `Bearer ${PROJECT_CONFIG.smartHome.apiKey}`;
        }
        const res = await fetch(PROJECT_CONFIG.smartHome.webhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Error enviando datos al CRM');
      } else {
        // Clean local confirmation while SmartHome webhook URL is being added
        await new Promise((r) => setTimeout(r, 450));
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(
        'No pudimos conectar con el servidor en este instante, pero puedes enviarnos tu solicitud directo por WhatsApp con un clic.'
      );
    }
  };

  const directWhatsAppFromForm = buildWhatsAppUrl(
    `Hola ${PROJECT_CONFIG.brand.name}, soy ${form.fullName || 'un interesado'}.\n` +
      `• Teléfono: ${form.countryCode} ${form.phone}\n` +
      `• Correo: ${form.email || 'No indicado'}\n` +
      `• Modalidad de interés: ${form.financingPreference}\n` +
      `${form.message ? `• Detalle: ${form.message}\n` : ''}` +
      `Acepto la política de Habeas Data y deseo recibir asesoría.`
  );

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-sand-50 topo-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* LEAD FORM BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Pitch & Direct Info */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.26em] text-bronze-600">
              Asesoría Personalizada
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 mt-2 leading-tight">
              Prepárate, <span className="italic text-bronze-600">lo mejor está por llegar</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-palm-900/75 leading-relaxed">
              Déjanos tus datos y recibe la lista actualizada de lotes, planos y proyección de
              cuotas directo con nuestro equipo comercial.
            </p>

            {/* Launch Poster Preview Accent */}
            <div className="mt-7 rounded-3xl bg-palm-900 text-white p-6 border border-bronze-400/20 shadow-luxury space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bronze-500/25 border border-bronze-300/25 flex items-center justify-center text-bronze-300 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/55">WhatsApp & Ventas</p>
                  <p className="font-semibold text-sm sm:text-base mt-0.5">
                    {PROJECT_CONFIG.contact.whatsappDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bronze-500/25 border border-bronze-300/25 flex items-center justify-center text-bronze-300 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/55">Correo comercial</p>
                  <p className="font-semibold text-sm sm:text-base mt-0.5 break-all">
                    {PROJECT_CONFIG.contact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bronze-500/25 border border-bronze-300/25 flex items-center justify-center text-bronze-300 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/55">Horario de atención</p>
                  <p className="font-semibold text-sm mt-0.5">{PROJECT_CONFIG.contact.schedule}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-beige-300/15 flex items-center gap-2 text-xs text-beige-300">
                <ShieldCheck size={16} />
                <span>Formulario preparado para integración directa con SmartHome CRM</span>
              </div>
            </div>
          </div>

          {/* Right Form Card (Supports SmartHome Embed or Native Custom Form) */}
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] bg-white border border-sand-200 shadow-luxury p-6 sm:p-8 lg:p-10">
              {PROJECT_CONFIG.smartHome.embedIframeUrl ? (
                <iframe
                  title="Formulario oficial SmartHome - El Recreo Condominio"
                  src={PROJECT_CONFIG.smartHome.embedIframeUrl}
                  className="w-full min-h-[520px] rounded-2xl border-0"
                />
              ) : status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-olive-500/15 text-olive-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={34} />
                  </div>
                  <h3 className="font-serif text-3xl font-semibold text-palm-900">
                    ¡Solicitud registrada!
                  </h3>
                  <p className="text-sm sm:text-base text-palm-900/75 mt-2 max-w-md mx-auto">
                    Gracias, <strong>{form.fullName}</strong>. Un asesor de{' '}
                    <strong>El Recreo Condominio</strong> te contactará muy pronto. Si quieres
                    atención inmediata ahora mismo, continúa por WhatsApp:
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={directWhatsAppFromForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-bronze-600 to-olive-500 text-white font-semibold text-sm shadow-bronze hover:brightness-110 transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>Continuar por WhatsApp ahora</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3.5 rounded-full bg-sand-100 text-palm-900 font-semibold text-sm hover:bg-sand-200 transition-colors"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-palm-900">
                      Recibe precios y disponibilidad
                    </h3>
                    <p className="text-xs sm:text-sm text-palm-900/65 mt-1">
                      Completa estos 3 datos básicos y te enviaremos el brochure y plan de pagos.
                    </p>
                  </div>

                  {simulationContext && (
                    <div className="rounded-2xl bg-sand-50 border border-bronze-400/40 p-3.5 flex items-start gap-2.5 text-xs text-palm-900">
                      <Sparkles size={16} className="text-bronze-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-bronze-700">Simulación adjunta automáticamente</p>
                        <p className="text-palm-900/80 mt-0.5">
                          {simulationContext.planLabel} · {simulationContext.lotLabel} ·{' '}
                          <strong>{simulationContext.monthlyFormatted}/mes</strong> ({simulationContext.months} cuotas)
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-semibold text-palm-900/85 mb-1.5">
                        Nombre completo *
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Ej: Carlos Mendoza"
                        className="w-full rounded-xl border border-sand-200 bg-sand-100/75 px-4 py-3 text-sm text-palm-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-semibold text-palm-900/85 mb-1.5">
                        Correo electrónico
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@correo.com"
                        className="w-full rounded-xl border border-sand-200 bg-sand-100/75 px-4 py-3 text-sm text-palm-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-semibold text-palm-900/85 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <div className="flex gap-2">
                        <select
                          aria-label="Indicativo de país"
                          value={form.countryCode}
                          onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                          className="rounded-xl border border-sand-200 bg-sand-100 px-2.5 py-3 text-xs sm:text-sm font-semibold text-palm-900 focus:outline-none focus:ring-2 focus:ring-olive-500"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          id="lead-phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="300 123 4567"
                          className="w-full rounded-xl border border-sand-200 bg-sand-100/75 px-4 py-3 text-sm text-palm-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lead-plan" className="block text-xs font-semibold text-palm-900/85 mb-1.5">
                        Modalidad de pago de interés
                      </label>
                      <select
                        id="lead-plan"
                        value={form.financingPreference}
                        onChange={(e) => setForm({ ...form, financingPreference: e.target.value })}
                        className="w-full rounded-xl border border-sand-200 bg-sand-100/75 px-3.5 py-3 text-sm text-palm-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                      >
                        <option value="Sin cuota inicial (Separación $2.000.000)">
                          Sin cuota inicial · Separación $2M (60 cuotas)
                        </option>
                        <option value="Con cuota inicial (20%)">
                          Con cuota inicial del 20% (hasta 60 cuotas)
                        </option>
                        <option value="Quiero asesoría para elegir plan">
                          Quiero asesoría para elegir el mejor plan
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-msg" className="block text-xs font-semibold text-palm-900/85 mb-1.5">
                      Mensaje o consulta (opcional)
                    </label>
                    <textarea
                      id="lead-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ej: Quiero agendar visita este fin de semana o conocer lotes disponibles."
                      className="w-full rounded-xl border border-sand-200 bg-sand-100/75 px-4 py-3 text-sm text-palm-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                    />
                  </div>

                  {/* Mandatory Colombian Habeas Data Checkbox */}
                  <div className="rounded-2xl bg-sand-100 border border-sand-200 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.habeasData}
                        onChange={(e) => setForm({ ...form, habeasData: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-sand-300 text-bronze-600 focus:ring-olive-500 accent-[#7B5832]"
                      />
                      <span className="text-xs text-palm-900/80 leading-relaxed">
                        Autorizo de manera previa, expresa e informada el tratamiento de mis datos
                        personales conforme a la{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal('policy')}
                          className="font-semibold text-bronze-600 underline hover:text-bronze-700"
                        >
                          Política de Tratamiento de Datos (Ley 1581 de 2012)
                        </button>{' '}
                        y el{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal('notice')}
                          className="font-semibold text-bronze-600 underline hover:text-bronze-700"
                        >
                          Aviso de Privacidad
                        </button>{' '}
                        de {PROJECT_CONFIG.brand.name}. *
                      </span>
                    </label>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-bronze-600 to-olive-500 text-white font-semibold text-sm sm:text-base shadow-bronze hover:brightness-110 disabled:opacity-60 transition-all"
                    >
                      <Send size={17} />
                      <span>
                        {status === 'submitting'
                          ? 'Enviando solicitud...'
                          : 'Quiero más información'}
                      </span>
                    </motion.button>

                    <a
                      href={directWhatsAppFromForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-palm-900 text-white font-semibold text-sm hover:bg-palm-800 transition-colors"
                    >
                      <MessageCircle size={17} className="text-beige-300" />
                      <span>WhatsApp directo</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.26em] text-bronze-600">
              Preguntas Frecuentes
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-palm-900 mt-2">
              Resolvemos tus dudas antes de invertir
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white border border-sand-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-palm-900 hover:bg-sand-50/70 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-bronze-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 text-sm text-palm-900/75 leading-relaxed border-t border-sand-100 pt-3">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
