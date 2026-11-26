import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { PROJECT_CONFIG } from '../data/projectConfig';

export default function LegalModal({ activeTab, onClose, onSwitchTab }) {
  const { legal, brand } = PROJECT_CONFIG;

  return (
    <AnimatePresence>
      {activeTab && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-palm-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[86vh] flex flex-col overflow-hidden shadow-2xl border border-sand-200"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-palm-900 text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bronze-500/25 border border-bronze-300/25 flex items-center justify-center text-bronze-300">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                    Marco Legal y Protección de Datos
                  </h3>
                  <p className="text-xs text-white/65">
                    {brand.name} · Ley 1581 de 2012 (Colombia)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana legal"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4 bg-sand-50 border-b border-sand-200 flex gap-2">
              <button
                type="button"
                onClick={() => onSwitchTab('policy')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                  activeTab === 'policy'
                    ? 'bg-white text-bronze-700 border-t border-x border-sand-200'
                    : 'text-palm-900/65 hover:text-palm-900'
                }`}
              >
                <FileText size={15} />
                <span>Política de Tratamiento de Datos</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchTab('notice')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
                  activeTab === 'notice'
                    ? 'bg-white text-bronze-700 border-t border-x border-sand-200'
                    : 'text-palm-900/65 hover:text-palm-900'
                }`}
              >
                <ShieldCheck size={15} />
                <span>Aviso de Privacidad</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-palm-900/80 leading-relaxed">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-700" />
                <p>
                  <strong>Nota para la empresa:</strong> Este borrador sigue los lineamientos de la
                  Ley 1581 de 2012 y el Decreto 1377 de 2013. Actualiza razón social, NIT y correo en{' '}
                  <code>src/data/projectConfig.js</code> y valídalo con tu asesor jurídico antes del
                  lanzamiento definitivo.
                </p>
              </div>

              {activeTab === 'policy' ? (
                <>
                  <h4 className="font-serif text-xl font-bold text-palm-900">
                    1. Responsable del Tratamiento
                  </h4>
                  <p>
                    <strong>{legal.companyName}</strong> (NIT: {legal.nit}), domiciliada en{' '}
                    <strong>{legal.city}</strong>, en adelante el Responsable, adopta la presente
                    Política de Tratamiento de Datos Personales en cumplimiento de la Ley Estatutaria
                    1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes de la República
                    de Colombia, respecto de la información recolectada a través del sitio web del
                    proyecto <strong>{brand.name}</strong> y sus plataformas CRM (incluyendo
                    SmartHome).
                  </p>

                  <h4 className="font-serif text-xl font-bold text-palm-900">
                    2. Finalidades del Tratamiento
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Gestionar solicitudes de información, cotizaciones, simulaciones de pago y
                      agendamiento de visitas para <strong>{brand.name}</strong>.
                    </li>
                    <li>
                      Contactar al titular a través de WhatsApp, llamada telefónica o correo
                      electrónico para brindar acompañamiento comercial e informar disponibilidad,
                      precios y promociones del proyecto.
                    </li>
                    <li>
                      Registrar y hacer seguimiento comercial a los prospectos en el sistema de
                      gestión de clientes (CRM SmartHome) y dar cumplimiento a obligaciones legales y
                      contractuales.
                    </li>
                  </ul>

                  <h4 className="font-serif text-xl font-bold text-palm-900">
                    3. Derechos del Titular (Derechos ARCO)
                  </h4>
                  <p>
                    Como titular de los datos personales tienes derecho a: (a) conocer, actualizar y
                    rectificar tus datos; (b) solicitar prueba de la autorización otorgada; (c) ser
                    informado sobre el uso dado a tus datos; (d) revocar la autorización y/o
                    solicitar la supresión de los datos cuando no exista deber legal o contractual
                    que lo impida; y (e) presentar quejas ante la Superintendencia de Industria y
                    Comercio (SIC).
                  </p>

                  <h4 className="font-serif text-xl font-bold text-palm-900">
                    4. Canal de Atención de Consultas y Reclamos
                  </h4>
                  <p>
                    Puedes ejercer tus derechos escribiendo al correo electrónico{' '}
                    <strong>{legal.privacyEmail}</strong> indicando en el asunto{' '}
                    <em>&ldquo;Protección de Datos – {brand.name}&rdquo;</em>. Las consultas serán
                    atendidas en un término máximo de diez (10) días hábiles y los reclamos en quince
                    (15) días hábiles conforme a la ley.
                  </p>
                  <p className="text-xs text-palm-900/55 pt-2">
                    Última actualización: {legal.lastUpdated}.
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-serif text-xl font-bold text-palm-900">
                    Aviso de Privacidad — {brand.name}
                  </h4>
                  <p>
                    <strong>{legal.companyName}</strong> informa a los visitantes y usuarios del
                    sitio web de <strong>{brand.name}</strong> que los datos personales suministrados
                    mediante formularios web, simulador de cuotas o canales de WhatsApp serán
                    incorporados en nuestras bases de datos comerciales (incluyendo la plataforma CRM
                    SmartHome) con el único fin de atender consultas, enviar planes de financiación,
                    coordinar visitas y remitir información comercial relacionada con el proyecto
                    inmobiliario.
                  </p>
                  <p>
                    El suministro de datos sensibles es estrictamente facultativo. El titular podrá
                    consultar, actualizar, rectificar o solicitar la eliminación de su información en
                    cualquier momento escribiendo a <strong>{legal.privacyEmail}</strong>.
                  </p>
                  <p className="text-xs text-palm-900/55 pt-2">
                    Domicilio: {legal.city} · Vigencia desde {legal.lastUpdated}.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-sand-50 border-t border-sand-200 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-palm-900 text-white text-sm font-semibold hover:bg-palm-800 transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
