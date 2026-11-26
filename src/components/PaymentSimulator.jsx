import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Sparkles,
  Percent,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { PROJECT_CONFIG, formatCOP, buildWhatsAppUrl } from '../data/projectConfig';

export default function PaymentSimulator({ onSelectSimulation }) {
  const { lotTiers, downPaymentPercent, separationFee, minInstallments, maxInstallments, installmentPresets } =
    PROJECT_CONFIG.financing;

  const [selectedLotId, setSelectedLotId] = useState(lotTiers[0].id);
  const [customPriceRaw, setCustomPriceRaw] = useState('60000000');
  const [mode, setMode] = useState('no_downpayment'); // 'with_downpayment' | 'no_downpayment'
  const [months, setMonths] = useState(60);

  const activeLot = lotTiers.find((l) => l.id === selectedLotId);

  const lotPrice = useMemo(() => {
    if (selectedLotId === 'custom') {
      const parsed = Number(String(customPriceRaw).replace(/\D/g, ''));
      return Math.max(parsed || 0, 5000000);
    }
    return activeLot ? activeLot.price : lotTiers[0].price;
  }, [selectedLotId, customPriceRaw, activeLot, lotTiers]);

  // Calculate BOTH plans simultaneously so the buyer can compare live
  const calculations = useMemo(() => {
    // Plan 1: 20% cuota inicial + saldo hasta 60 cuotas
    const downPayment20 = Math.round(lotPrice * (downPaymentPercent / 100));
    const balanceWithDown = Math.max(0, lotPrice - downPayment20);
    const monthlyWithDown = Math.round(balanceWithDown / months);

    // Plan 2: Sin cuota inicial, solo separación de $2.000.000 + saldo en hasta 60 cuotas
    const effectiveSeparation = Math.min(separationFee, lotPrice);
    const balanceNoDown = Math.max(0, lotPrice - effectiveSeparation);
    const monthlyNoDown = Math.round(balanceNoDown / months);

    const active =
      mode === 'with_downpayment'
        ? {
            planLabel: `Con cuota inicial (${downPaymentPercent}%)`,
            upfrontLabel: `Cuota inicial (${downPaymentPercent}%)`,
            upfrontAmount: downPayment20,
            balance: balanceWithDown,
            monthly: monthlyWithDown,
            upfrontPercent: downPaymentPercent,
          }
        : {
            planLabel: `Sin cuota inicial · Separación ${formatCOP(effectiveSeparation)}`,
            upfrontLabel: 'Separación única (sin cuota inicial)',
            upfrontAmount: effectiveSeparation,
            balance: balanceNoDown,
            monthly: monthlyNoDown,
            upfrontPercent: Math.min(100, Math.max(4, Math.round((effectiveSeparation / lotPrice) * 100))),
          };

    return {
      withDown: { upfront: downPayment20, balance: balanceWithDown, monthly: monthlyWithDown },
      noDown: { upfront: effectiveSeparation, balance: balanceNoDown, monthly: monthlyNoDown },
      active,
      monthlyDifference: Math.abs(monthlyNoDown - monthlyWithDown),
    };
  }, [lotPrice, months, mode, downPaymentPercent, separationFee]);

  const lotLabel =
    selectedLotId === 'custom'
      ? `Lote valor personalizado (${formatCOP(lotPrice)})`
      : `${activeLot.name} (${activeLot.areaM2} m²)`;

  const simulationSummaryText = `Modalidad: ${calculations.active.planLabel} | ${lotLabel} | Valor: ${formatCOP(
    lotPrice
  )} | ${calculations.active.upfrontLabel}: ${formatCOP(
    calculations.active.upfrontAmount
  )} | Saldo: ${formatCOP(calculations.active.balance)} | Plazo: ${months} cuotas | Cuota estimada: ${formatCOP(
    calculations.active.monthly
  )}/mes`;

  const whatsappUrl = buildWhatsAppUrl(
    `¡Hola ${PROJECT_CONFIG.brand.name}! Hice una simulación en la página web:\n` +
      `• Opción: ${calculations.active.planLabel}\n` +
      `• Lote: ${lotLabel}\n` +
      `• Valor del lote: ${formatCOP(lotPrice)}\n` +
      `• ${calculations.active.upfrontLabel}: ${formatCOP(calculations.active.upfrontAmount)}\n` +
      `• Saldo a financiar: ${formatCOP(calculations.active.balance)}\n` +
      `• Plazo elegido: ${months} cuotas\n` +
      `• Cuota mensual estimada: ${formatCOP(calculations.active.monthly)}\n\n` +
      `Quiero confirmar disponibilidad y recibir mi plan oficial.`
  );

  const handleLockSimulation = () => {
    if (onSelectSimulation) {
      onSelectSimulation({
        summary: simulationSummaryText,
        planLabel: calculations.active.planLabel,
        monthlyFormatted: formatCOP(calculations.active.monthly),
        lotLabel,
        months,
      });
    }
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="simulador" className="relative py-20 sm:py-28 bg-sand-50 topo-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.26em] text-bronze-600 mb-3">
              <Calculator size={14} />
              Simulador de Financiación Directa
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-palm-900 leading-tight">
              Calcula tu lote en{' '}
              <span className="italic text-bronze-600">dos modalidades claras</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-palm-900/70 max-w-md">
            Sin registro previo ni letra pequeña. Compara en vivo entre pagar{' '}
            <strong className="text-palm-900">20% de inicial</strong> o arrancar{' '}
            <strong className="text-palm-900">sin cuota inicial separando con $2.000.000</strong>.
          </p>
        </motion.div>

        {/* Main Interactive Simulator Card */}
        <div className="rounded-[2rem] bg-white border border-sand-200 shadow-luxury p-4 sm:p-7 lg:p-9">
          {/* STEP 1: Visual Mode Switcher (Signature 2-Plan Cards) */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-palm-900/55 mb-3">
              Paso 1 · Elige cómo quieres empezar
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Plan B: Sin Cuota Inicial */}
              <button
                type="button"
                onClick={() => setMode('no_downpayment')}
                className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
                  mode === 'no_downpayment'
                    ? 'border-bronze-600 bg-sand-50 shadow-md'
                    : 'border-sand-200 bg-white hover:border-bronze-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        mode === 'no_downpayment'
                          ? 'bg-bronze-600 text-white'
                          : 'bg-sand-100 text-bronze-600'
                      }`}
                    >
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1">
                        Menor capital inicial
                      </span>
                      <h3 className="font-bold text-palm-900 text-base sm:text-lg">
                        Sin Cuota Inicial · Separa con $2M
                      </h3>
                    </div>
                  </div>
                  <CheckCircle2
                    size={22}
                    className={
                      mode === 'no_downpayment' ? 'text-bronze-600 shrink-0' : 'text-sand-300 shrink-0'
                    }
                  />
                </div>
                <p className="text-xs sm:text-sm text-palm-900/70 mt-3 leading-relaxed">
                  Separas con <strong>{formatCOP(separationFee)}</strong> y el saldo restante del lote se
                  divide hasta en <strong>{maxInstallments} cuotas</strong>.
                </p>
                <p className="mt-3 pt-3 border-t border-sand-200 text-xs font-semibold text-bronze-700 tabular-nums">
                  Estimado actual: {formatCOP(calculations.noDown.monthly)} / mes ({months} cuotas)
                </p>
              </button>

              {/* Plan A: Con 20% Cuota Inicial */}
              <button
                type="button"
                onClick={() => setMode('with_downpayment')}
                className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
                  mode === 'with_downpayment'
                    ? 'border-bronze-600 bg-sand-50 shadow-md'
                    : 'border-sand-200 bg-white hover:border-bronze-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        mode === 'with_downpayment'
                          ? 'bg-bronze-600 text-white'
                          : 'bg-sand-100 text-bronze-600'
                      }`}
                    >
                      <Percent size={20} />
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bronze-300/35 text-bronze-800 mb-1">
                        Cuota mensual más baja
                      </span>
                      <h3 className="font-bold text-palm-900 text-base sm:text-lg">
                        Con Cuota Inicial del {downPaymentPercent}%
                      </h3>
                    </div>
                  </div>
                  <CheckCircle2
                    size={22}
                    className={
                      mode === 'with_downpayment' ? 'text-bronze-600 shrink-0' : 'text-sand-300 shrink-0'
                    }
                  />
                </div>
                <p className="text-xs sm:text-sm text-palm-900/70 mt-3 leading-relaxed">
                  Aportas el <strong>{downPaymentPercent}%</strong> de cuota inicial y financias el{' '}
                  <strong>80%</strong> restante hasta en <strong>{maxInstallments} cuotas</strong>.
                </p>
                <p className="mt-3 pt-3 border-t border-sand-200 text-xs font-semibold text-bronze-700 tabular-nums">
                  Estimado actual: {formatCOP(calculations.withDown.monthly)} / mes ({months} cuotas)
                </p>
              </button>
            </div>
          </div>

          {/* STEP 2 & 3 Split: Controls Left | Imponente Dark Result Card Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* Controls Column */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-7">
              {/* Lot Cards */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-palm-900/55 mb-3">
                  Paso 2 · Selecciona el tipo de lote o escribe tu valor
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lotTiers.map((lot) => {
                    const active = selectedLotId === lot.id;
                    return (
                      <button
                        key={lot.id}
                        type="button"
                        onClick={() => setSelectedLotId(lot.id)}
                        className={`text-left rounded-2xl p-4 border transition-all ${
                          active
                            ? 'border-palm-900 bg-palm-900 text-white shadow-lg'
                            : 'border-sand-200 bg-sand-50/70 text-palm-900 hover:border-bronze-400'
                        }`}
                      >
                        <span
                          className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            active
                              ? 'bg-bronze-500/30 text-bronze-300'
                              : 'bg-sand-200 text-bronze-700'
                          }`}
                        >
                          {lot.badge}
                        </span>
                        <p className="font-bold text-sm mt-2">{lot.name}</p>
                        <p
                          className={`text-xs mt-0.5 ${
                            active ? 'text-white/70' : 'text-palm-900/60'
                          }`}
                        >
                          Área ref. {lot.areaM2} m²
                        </p>
                        <p
                          className={`font-serif text-xl font-bold mt-2 tabular-nums ${
                            active ? 'text-bronze-300' : 'text-bronze-700'
                          }`}
                        >
                          {formatCOP(lot.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Value Trigger */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLotId('custom')}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 border text-sm font-medium transition-all ${
                      selectedLotId === 'custom'
                        ? 'border-bronze-600 bg-sand-100 text-palm-900'
                        : 'border-dashed border-sand-300 text-palm-900/70 hover:border-bronze-500'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-bronze-600" />
                      <span>¿Tienes otro valor de lote? Escríbelo aquí</span>
                    </span>
                    <span className="text-xs font-bold text-bronze-700">
                      {selectedLotId === 'custom' ? 'Activo' : 'Personalizar'}
                    </span>
                  </button>

                  {selectedLotId === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 rounded-2xl bg-sand-50 border border-sand-200 p-4"
                    >
                      <label
                        htmlFor="custom-lot-price"
                        className="block text-xs font-semibold uppercase tracking-wider text-palm-900/70 mb-1.5"
                      >
                        Valor del lote en pesos (COP)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          id="custom-lot-price"
                          type="text"
                          inputMode="numeric"
                          value={customPriceRaw}
                          onChange={(e) => setCustomPriceRaw(e.target.value.replace(/\D/g, ''))}
                          placeholder="Ej: 65000000"
                          className="w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-palm-900 font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-bronze-500"
                        />
                        <span className="text-sm font-bold text-bronze-700 shrink-0 tabular-nums">
                          {formatCOP(lotPrice)}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Step 3: Plazo Selector (Presets + Slider up to 60 cuotas) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-palm-900/55">
                    Paso 3 · Número de cuotas (hasta {maxInstallments})
                  </p>
                  <span className="px-3 py-1 rounded-full bg-palm-900 text-bronze-300 text-xs font-bold tabular-nums">
                    {months} meses
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {installmentPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonths(preset)}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all tabular-nums ${
                        months === preset
                          ? 'bg-bronze-600 text-white shadow-bronze'
                          : 'bg-sand-100 text-palm-900 hover:bg-sand-200'
                      }`}
                    >
                      {preset}m
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
                  aria-label="Seleccionar plazo en cuotas"
                  className="w-full bronze-slider"
                />
                <div className="flex justify-between text-[11px] text-palm-900/55 mt-1.5 font-medium tabular-nums">
                  <span>{minInstallments} cuotas (1 año)</span>
                  <span>36 cuotas (3 años)</span>
                  <span>{maxInstallments} cuotas (5 años)</span>
                </div>
              </div>

              {/* Visual Proportional Payment Bar (Unique El Recreo UX) */}
              <div className="rounded-2xl bg-sand-50 border border-sand-200 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-palm-900/75 mb-2">
                  <span>Distribución visual de tu inversión</span>
                  <span className="tabular-nums text-bronze-700">{formatCOP(lotPrice)}</span>
                </div>
                <div className="h-3.5 w-full rounded-full bg-sand-200 overflow-hidden flex">
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    style={{ width: `${calculations.active.upfrontPercent}%` }}
                    className="h-full bg-gradient-to-r from-bronze-600 to-bronze-400"
                    title={calculations.active.upfrontLabel}
                  />
                  <div className="h-full flex-1 bg-palm-800" title="Saldo en cuotas" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-bronze-500 shrink-0" />
                    <span className="text-palm-900/75 truncate">
                      Inicio: <strong className="text-palm-900 tabular-nums">{formatCOP(calculations.active.upfrontAmount)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="w-2.5 h-2.5 rounded-full bg-palm-800 shrink-0" />
                    <span className="text-palm-900/75 truncate">
                      Saldo: <strong className="text-palm-900 tabular-nums">{formatCOP(calculations.active.balance)}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Glassy Output Card */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-3xl bg-gradient-to-br from-palm-900 via-palm-950 to-palm-900 text-white p-6 sm:p-7 flex flex-col justify-between border border-bronze-400/25 shadow-glass relative overflow-hidden">
                <div className="pointer-events-none absolute -right-14 -top-14 w-48 h-48 rounded-full bg-bronze-500/20 blur-2xl" />

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-bronze-300">
                    {calculations.active.planLabel}
                  </span>

                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 mt-5 font-semibold">
                    Tu cuota mensual estimada
                  </p>

                  <motion.p
                    key={`${calculations.active.monthly}-${mode}-${months}`}
                    initial={{ opacity: 0.4, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-serif text-4xl sm:text-5xl font-bold text-white mt-1 tracking-tight tabular-nums"
                  >
                    {formatCOP(calculations.active.monthly)}
                    <span className="font-sans text-sm font-normal text-white/60"> / mes</span>
                  </motion.p>

                  {/* Breakdown List */}
                  <div className="mt-6 space-y-3 border-t border-white/12 pt-5 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-white/65">Valor del lote</span>
                      <span className="font-semibold tabular-nums">{formatCOP(lotPrice)}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-white/65">{calculations.active.upfrontLabel}</span>
                      <span className="font-semibold text-bronze-300 tabular-nums">
                        {formatCOP(calculations.active.upfrontAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-white/65">Saldo a financiar</span>
                      <span className="font-semibold tabular-nums">
                        {formatCOP(calculations.active.balance)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-white/65">Plazo seleccionado</span>
                      <span className="font-semibold tabular-nums">{months} cuotas</span>
                    </div>
                  </div>

                  {/* Live Side-by-Side Comparison Pill */}
                  <div className="mt-5 rounded-2xl bg-white/[0.07] border border-white/12 p-3.5 text-xs text-white/80 leading-relaxed">
                    {mode === 'no_downpayment' ? (
                      <span>
                        💡 Con <strong className="text-bronze-300">20% inicial</strong>, tu cuota
                        bajaría a{' '}
                        <strong className="text-white tabular-nums">
                          {formatCOP(calculations.withDown.monthly)}/mes
                        </strong>{' '}
                        (ahorro mensual de{' '}
                        <strong className="text-emerald-300 tabular-nums">
                          {formatCOP(calculations.monthlyDifference)}
                        </strong>
                        ).
                      </span>
                    ) : (
                      <span>
                        💡 ¿Prefieres arrancar hoy con menos capital?{' '}
                        <strong className="text-bronze-300">Sin cuota inicial</strong> separas con{' '}
                        <strong className="text-white tabular-nums">{formatCOP(separationFee)}</strong> y
                        quedas en{' '}
                        <strong className="text-white tabular-nums">
                          {formatCOP(calculations.noDown.monthly)}/mes
                        </strong>
                        .
                      </span>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="relative z-10 mt-7 space-y-2.5">
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm shadow-lg hover:brightness-110 transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Recibir este plan por WhatsApp</span>
                  </motion.a>

                  <button
                    type="button"
                    onClick={handleLockSimulation}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all"
                  >
                    <Send size={15} className="text-bronze-300" />
                    <span>Enviar simulación al formulario de ventas</span>
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-[11px] text-white/50 text-center pt-1">
                    *Valores referenciales sujetos a ubicación del lote y condiciones vigentes en
                    sala de ventas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
