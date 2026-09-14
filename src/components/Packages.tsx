'use client'

import { motion } from 'framer-motion'
import { Package, MapPin, Calendar, Users, CreditCard, CheckCircle2 } from 'lucide-react'
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
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
  },
  {
    id: 'brasil-raizes',
    name: 'Brasil: Raízes & Praias',
    tagline: 'São Paulo, Rio, Salvador',
    duration: '14 dias',
    highlights: ['Voos Swiss/LATAM', 'Hotéis beira-mar', 'Passeios inclusos', 'Seguro viagem'],
    price: 'CHF 3.450',
    installment: '12x CHF 287,50',
    gradient: 'from-green-600 via-emerald-600 to-teal-700',
  },
  {
    id: 'asia-essencial',
    name: 'Ásia Essencial',
    tagline: 'Tóquio, Seul, Singapura',
    duration: '12 dias',
    highlights: ['Voos premium', 'Hotéis 5★', 'JR Pass incluso', 'Concierge 24h'],
    price: 'CHF 4.290',
    installment: '12x CHF 357,50',
    gradient: 'from-red-600 via-orange-600 to-amber-700',
  },
  {
    id: 'eua-costa-oeste',
    name: 'EUA Costa Oeste',
    tagline: 'LA, San Francisco, Vegas',
    duration: '11 dias',
    highlights: ['Voos United/Swiss', 'Hotéis 4★', 'Carro alugado', 'Parques inclusos'],
    price: 'CHF 3.890',
    installment: '12x CHF 324,17',
    gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
  },
]

const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const { t } = useLanguage()

  return (
    <motion.div
      key={pkg.id}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))` } as React.CSSProperties}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br" style={{ background: pkg.gradient, opacity: 0.15 }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">{t('pkg_label')}</p>
            <p className="text-3xl font-bold font-display text-[var(--text-primary)]">{pkg.name}</p>
            <p className="text-sky/80 text-lg mt-1">{pkg.tagline}</p>
          </div>
          <motion.div
            className="glass px-3 py-1.5 rounded-full text-sm font-medium text-sky"
            whileHover={{ scale: 1.05 }}
          >
            <Package className="w-4 h-4 inline mr-1" />
            {pkg.duration}
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3 mb-6">
            {pkg.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors">
                <span className="w-5 h-5 flex items-center justify-center glass rounded-lg text-sky/80">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-primary)]">
            <div className="relative mb-1" onClick={scrollToQuote} style={{ cursor: 'pointer' }}>
              <p className="text-3xl font-bold font-display text-sky blur-[8px] text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)]/20 to-[var(--text-primary)]/5 select-none pointer-events-none">
                {pkg.price}
              </p>
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[var(--bg-primary)]/80 via-sky/20 to-[var(--bg-primary)]/80 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs font-medium text-sky/80 px-3 py-1 glass rounded-full animate-pulse">
                  {t('cta_step_2')}
                </span>
              </motion.div>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{t('pkg_from')}</p>
            <p className="text-sm text-[var(--text-secondary)]/80 mt-1 blur-[4px] select-none pointer-events-none">
              ≈ {pkg.installment}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-sky/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  )
}

export default function Packages() {
  const { t } = useLanguage()

  return (
    <section id="pacotes" className="py-28 md:py-32 relative bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
            {t('pkg_label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
            {t('pkg_title_1')} <span className="text-sky">{t('pkg_title_2')}</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            {t('pkg_subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="inline-flex items-center gap-3 px-8 py-4 glass-strong font-semibold rounded-full hover:bg-[var(--glass-strong-bg)] transition-all border border-[var(--border-primary)]"
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