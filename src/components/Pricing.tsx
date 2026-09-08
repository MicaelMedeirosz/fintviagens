'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const plans = [
  {
    name: 'Básica',
    price: 'A partir de CHF 890',
    installment: '12x CHF 74,17',
    features: ['Voos completos', 'Bagagem de mão', 'Assento padrão (não selecionável)', 'Suporte WhatsApp/Email'],
    cta: 'Cotar Básica',
    popular: false,
  },
  {
    name: 'Flex',
    price: 'A partir de CHF 1.190',
    installment: '12x CHF 99,17',
    features: ['Voos completos', 'Bagagem 23kg + mão 8kg', 'Assento padrão selecionável', 'Alteração flexível', 'Prióridade de embarque (quando disp.)'],
    cta: 'Cotar Flex',
    popular: true,
  },
  {
    name: 'Executiva',
    price: 'A partir de CHF 3.890',
    installment: '12x CHF 324,17',
    features: ['Classe Executiva', 'Bagagem 2x 32kg + mão', 'Assento cama flat-bed', 'Alterações ilimitadas', 'Concierge dedicado', 'Lounge premium garantido', 'Transfer aeroporto incluso'],
    cta: 'Cotar Executiva',
    popular: false,
  },
]

const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const { t } = useLanguage()

  return (
    <motion.div
      key={plan.name}
      className={`relative rounded-2xl p-8 flex flex-col h-full group ${plan.popular ? 'glass-strong border-2 border-sky/50 shadow-2xl shadow-sky/20' : 'glass transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {plan.popular && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky text-navy text-sm font-bold rounded-full"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.3 }}
        >
          {t('price_popular')}
        </motion.div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <div className="relative" onClick={scrollToQuote} style={{ cursor: 'pointer' }}>
          <p className="text-4xl font-bold font-display text-sky mb-1 blur-[8px] text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 select-none pointer-events-none">
            {plan.price}
          </p>
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-bg-dark/80 via-sky/20 to-bg-dark/80 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex items-center gap-2 text-xs font-medium text-sky/80 px-4 py-2 glass rounded-full animate-pulse">
              <Lock className="w-3 h-3" />
              {t('price_locked')}
            </span>
          </motion.div>
        </div>
        <p className="text-white/60 blur-[4px] select-none pointer-events-none">
          {plan.installment}
        </p>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-white/80"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 + 0.3 }}
          >
            <CheckCircle2 className="w-5 h-5 text-sky flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.a
        href="#cotar"
        className={`w-full py-4 px-6 rounded-full text-center font-semibold transition-all ${plan.popular ? 'bg-sky text-navy hover:bg-sky/90 shadow-lg shadow-sky/30' : 'glass-strong hover:bg-white/10 border border-white/10'}`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  )
}

export default function Pricing() {
  const { t } = useLanguage()

  return (
    <section id="planos" className="py-28 md:py-32 relative bg-gradient-mesh">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {t('price_title_1')} <span className="text-sky">{t('price_title_2')}</span>
          </h2>
          <p className="text-lg text-white/60">
            {t('price_subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard plan={plan} index={index} />
          ))}
        </div>

        <motion.p
          className="text-center text-white/50 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('price_disclaimer')}
          <br />
          {t('price_disclaimer_2')}
        </motion.p>
      </div>
    </section>
  )
}