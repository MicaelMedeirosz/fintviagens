'use client'

import { motion } from 'framer-motion'
import { Package, CheckCircle2, MapPin, Calendar, Users, CreditCard } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const packages = [
  {
    id: 'europa-classica',
    name: 'Europa Clássica',
    tagline: 'Paris, Roma, Barcelona',
    duration: '10 dias',
    highlights: ['Voos diretos', 'Hotéis 4★ central', 'Transfers incluídos', 'Guia em PT/EN'],
    price: 'CHF 2.890',
    installment: '12x CHF 240,83',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'brasil-raizes',
    name: 'Brasil: Raízes & Praias',
    tagline: 'São Paulo, Rio, Salvador',
    duration: '14 dias',
    highlights: ['Voos Swiss/LATAM', 'Hotéis beira-mar', 'Passeios inclusos', 'Seguro viagem'],
    price: 'CHF 3.450',
    installment: '12x CHF 287,50',
    accent: 'from-green-500 to-emerald-500',
  },
  {
    id: 'asia-essencial',
    name: 'Ásia Essencial',
    tagline: 'Tóquio, Seul, Singapura',
    duration: '12 dias',
    highlights: ['Voos premium', 'Hotéis 5★', 'JR Pass incluso', 'Concierge 24h'],
    price: 'CHF 4.290',
    installment: '12x CHF 357,50',
    accent: 'from-red-500 to-orange-500',
  },
  {
    id: 'eua-costa-oeste',
    name: 'EUA Costa Oeste',
    tagline: 'LA, San Francisco, Vegas',
    duration: '11 dias',
    highlights: ['Voos United/Swiss', 'Hotéis 4★', 'Carro alugado', 'Parques inclusos'],
    price: 'CHF 3.890',
    installment: '12x CHF 324,17',
    accent: 'from-indigo-500 to-blue-500',
  },
]

const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const HighlightIcons = {
  'Voos diretos': MapPin,
  'Voos Swiss/LATAM': MapPin,
  'Voos premium': MapPin,
  'Voos United/Swiss': MapPin,
  'Hotéis 4★ central': Calendar,
  'Hotéis beira-mar': Calendar,
  'Hotéis 5★': Calendar,
  'Hotéis 4★': Calendar,
  'Transfers incluídos': Users,
  'Passeios inclusos': Users,
  'JR Pass incluso': Users,
  'Carro alugado': Users,
  'Guia em PT/EN': CreditCard,
  'Seguro viagem': CreditCard,
  'Concierge 24h': CreditCard,
  'Parques inclusos': CreditCard,
}

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const { t } = useLanguage()

  return (
    <motion.div
      key={pkg.id}
      className="group relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-primary)] aspect-[2/3] sm:aspect-auto min-h-[420px] sm:min-h-[460px]"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.01 }}
      style={{
        boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(255 255 255 / 0.02) inset',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: pkg.accent }} />
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--accent-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative p-6 sm:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0 flex-1">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] mb-3">
              {t('pkg_label')}
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-1.5">{pkg.name}</h3>
            <p className="text-[var(--text-tertiary)] text-sm">{pkg.tagline}</p>
          </div>
          <div className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
            <Package className="w-4 h-4" />
            {pkg.duration}
          </div>
        </div>

        <ul className="flex-1 space-y-4 mb-8" role="list">
          {pkg.highlights.map((highlight, i) => {
            const Icon = HighlightIcons[highlight as keyof typeof HighlightIcons] || CheckCircle2
            return (
              <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-primary)]/50 border border-[var(--border-primary)]/50 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-[var(--accent-primary)]/15 flex items-center justify-center relative z-10">
                  <Icon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                </span>
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors relative z-10 leading-relaxed">{highlight}</span>
              </li>
            )
          })}
        </ul>

        <div className="pt-6 border-t border-[var(--border-primary)] relative" onClick={scrollToQuote} style={{ cursor: 'pointer' }}>
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <div>
              <span className="text-[var(--text-tertiary)] text-xs font-medium uppercase tracking-wider">{t('pkg_from')}</span>
              <div className="text-3xl font-bold font-display text-[var(--text-primary)] mt-1 bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
                {pkg.price}
              </div>
            </div>
            <motion.div
              className="flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r" style={{ background: pkg.accent }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="text-xs font-semibold text-white whitespace-nowrap">{t('cta_step_2')}</span>
            </motion.div>
          </div>
          <p className="text-xs text-[var(--text-tertiary)]">{pkg.installment}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Packages() {
  const { t } = useLanguage()

  return (
    <section id="pacotes" className="py-24 md:py-32 relative bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 mb-4">
            {t('pkg_label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
            {t('pkg_title_1')} <span className="text-[var(--accent-primary)]">{t('pkg_title_2')}</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            {t('pkg_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard pkg={pkg} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#pacotes"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold border border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-primary)]/50 transition-all duration-300 text-[var(--text-primary)]"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('pkg_view_all')}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}