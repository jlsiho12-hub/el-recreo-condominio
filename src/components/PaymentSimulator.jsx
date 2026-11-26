import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { PROJECT_CONFIG, formatCOP, buildWhatsAppUrl } from '../data/projectConfig';

export default function PaymentSimulator({ onSelectSimulation }) {
  const {
    lotTiers,
    downPaymentPercent,
    separationFee,
    minInstallments,
    maxInstallments,
    installmentPresets,
  } = PROJECT_CONFIG.financing;

  const startingPrice = Math.min(...lotTiers.map((l) => l.price));
  const maxSliderPrice = Math.max(...lotTiers.map((l) => l.price), 120000000);

  const [mode, setMode] = useState('no_downpayment'); // 'no_downpayment' | 'with_downpayment'
  const [lotPrice, setLotPrice] = useState(startingPrice);
  const [months, setMonths] = useState(60);

  const calc = useMemo(() => {
    const safePrice = Math.max(lotPrice || startingPrice, 5000000);

    if (mode === 'with_downpayment') {
      const upfront = Math.round(safePrice * (downPaymentPercent / 100));
      const balance = Math.max(0, safePrice - upfront);
      const monthly = Math.round(balance / months);
      return {
        planLabel: `Con cuota inicial (${downPaymentPercent}%)`,
        upfrontLabel: `Cuota inicial (${downPaymentPercent}%)`,
        upfront,
        balance,
        monthly,
      };
    }

    const upfront = Math.min(separationFee, safePrice);
    const balance = Math.max(0, safePrice - upfront);
    const monthly = Math.round(balance / months);
    return {
      planLabel: `Sin cuota inicial · Separación ${formatCOP(upfront)}`,
      upfrontLabel: 'Separación (sin cuota inicial)',
      upfront,
      balance,
      monthly,
    };
  }, [lotPrice, months, mode, downPaymentPercent, separationFee, startingPrice]);

  const simulationSummaryText = `${calc.planLabel} | Valor lote: ${formatCOP(
    lotPrice
  )} | ${calc.upfrontLabel}: ${formatCOP(calc.upfront)} | Plazo: ${months} cuotas | Cuota estimada: ${formatCOP(
    calc.monthly
  )}/mes`;

  const whatsappUrl = buildWhatsAppUrl(
    `¡Hola ${PROJECT_CONFIG.brand.name}! Simulé mi lote en la web:\n` +
      `• Modalidad: ${calc.planLabel}\n` +
      `• Valor del lote: ${formatCOP(lotPrice)}\n` +
      `• ${calc.upfrontLabel}: ${formatCOP(calc.upfront)}\n` +
      `• Saldo a financiar: ${formatCOP(calc.balance)}\n` +
      `• Plazo: ${months} cuotas\n` +
      `• Cuota mensual estimada: ${formatCOP(calc.monthly)}\n\n` +
      `Quiero recibir disponibilidad y mi plan personalizado.`
  );

  const handleLockSimulation = () => {
    if (onSelectSimulation) {
      onSelectSimulation({
        summary: simulationSummaryText,
        planLabel: calc.planLabel,
        monthlyFormatted: formatCOP(calc.monthly),
        lotLabel: `Lote ${formatCOP(lotPrice)}`,
        months,
      });
    }
    const contactEl = document.getElementById('contacto');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="simulador" className="relative py-20 sm:py-28 bg-sand-50 topo-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Clean Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.24em] text-bronze-600 mb-3">
            <Calculator size={14} />
            Simulador de Cuotas
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 leading-tight">
            Calcula tu cuota en{' '}
            <span className="italic text-bronze-600">segundos</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-palm-900/70">
            Lotes desde <strong className="text-palm-900">{formatCOP(startingPrice)}*</strong>. Elige tu
            modalidad de pago y el número de cuotas hasta {maxInstallments} meses.
          </p>
        </motion.div>

        {/* Simplified 2-Column Clean Card */}
        <div className="rounded-[2rem] bg-white border border-sand-200 shadow-luxury p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: 3 Simple Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* 1. Mode Pill Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-palm-900/60 mb-2.5">
                  1. ¿Cómo quieres pagarlo?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-sand-100 border border-sand-200">
                  <button
                    type="button"
                    onClick={() => setMode('no_downpayment')}
                    className={`rounded-xl py-3 px-4 text-left transition-all ${
                      mode === 'no_downpayment'
                        ? 'bg-white text-palm-900 shadow-sm ring-1 ring-bronze-500/30'
                        : 'text-palm-900/65 hover:text-palm-900'
                    }`}
                  >
                    <span className="block text-sm font-bold">Sin cuota inicial</span>
                    <span className="block text-xs text-bronze-700 mt-0.5">
                      Separa con {formatCOP(separationFee)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('with_downpayment')}
                    className={`rounded-xl py-3 px-4 text-left transition-all ${
                      mode === 'with_downpayment'
                        ? 'bg-white text-palm-900 shadow-sm ring-1 ring-bronze-500/30'
                        : 'text-palm-900/65 hover:text-palm-900'
                    }`}
                  >
                    <span className="block text-sm font-bold">
                      Con cuota inicial ({downPaymentPercent}%)
                    </span>
                    <span className="block text-xs text-bronze-700 mt-0.5">
                      Cuota mensual más baja
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Lot Value (Simple Slider + Quick Prices) */}
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-2.5">
                  <label
                    htmlFor="lot-price-slider"
                    className="text-xs font-bold uppercase tracking-[0.18em] text-palm-900/60"
                  >
                    2. Valor del lote
                  </label>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-bronze-700 tabular-nums">
                    {formatCOP(lotPrice)}
                  </span>
                </div>

                <input
                  id="lot-price-slider"
                  type="range"
                  min={startingPrice}
                  max={maxSliderPrice}
                  step={1000000}
                  value={Math.min(Math.max(lotPrice, startingPrice), maxSliderPrice)}
                  onChange={(e) => setLotPrice(Number(e.target.value))}
                  className="w-full bronze-slider"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {lotTiers.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setLotPrice(tier.price)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all tabular-nums ${
                          lotPrice === tier.price
                            ? 'bg-bronze-600 text-white shadow-sm'
                            : 'bg-sand-100 text-palm-900/75 hover:bg-sand-200'
                        }`}
                      >
                        {tier.areaM2} m² · {formatCOP(tier.price)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Plazo (Simple Pills up to 60 cuotas) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-palm-900/60">
                    3. Número de cuotas (hasta {maxInstallments})
                  </label>
                  <span className="text-sm font-bold text-palm-900 tabular-nums">
                    {months} cuotas
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {installmentPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonths(preset)}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all tabular-nums ${
                        months === preset
                          ? 'bg-palm-900 text-bronze-300 shadow-md'
                          : 'bg-sand-100 text-palm-900/80 hover:bg-sand-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={minInstallments}
                  max={maxInstallments}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  aria-label="Ajustar número de cuotas"
                  className="w-full bronze-slider mt-3.5"
                />
              </div>
            </div>

            {/* RIGHT: Warm Espresso-Bronze Result Card (Clean, Zero Clutter) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-palm-900 via-palm-950 to-bronze-800/90 text-white p-6 sm:p-7 border border-bronze-400/25 shadow-glass">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-bronze-300">
                  Tu cuota mensual estimada
                </p>

                <motion.p
                  key={`${calc.monthly}-${mode}-${months}`}
                  initial={{ opacity: 0.45, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2 tracking-tight tabular-nums"
                >
                  {formatCOP(calc.monthly)}
                  <span className="font-sans text-sm font-normal text-white/60"> / mes</span>
                </motion.p>

                <div className="mt-6 space-y-3 border-t border-white/12 pt-5 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-white/65">Valor del lote</span>
                    <span className="font-semibold tabular-nums">{formatCOP(lotPrice)}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/65">{calc.upfrontLabel}</span>
                    <span className="font-semibold text-bronze-300 tabular-nums">
                      {formatCOP(calc.upfront)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/65">Saldo en {months} cuotas</span>
                    <span className="font-semibold tabular-nums">{formatCOP(calc.balance)}</span>
                  </div>
                </div>

                <div className="mt-7 space-y-2.5">
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-bronze-600 via-bronze-500 to-bronze-400 text-white font-semibold text-sm shadow-bronze hover:brightness-110 transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Quiero este plan por WhatsApp</span>
                  </motion.a>

                  <button
                    type="button"
                    onClick={handleLockSimulation}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-sand-200 hover:text-white transition-colors"
                  >
                    <Send size={13} />
                    <span>O enviar al formulario de contacto</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <p className="text-[11px] text-white/45 text-center mt-3">
                  *Estimación referencial sujeta a disponibilidad y condiciones en sala de ventas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
