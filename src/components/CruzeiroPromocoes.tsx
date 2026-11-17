'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import CruzeiroPromoCard from './CruzeiroPromoCard'
import { cruzeiroPromocoes } from '@/lib/cruzeiroPromocoes'

export default function CruzeiroPromocoes() {
  const { t } = useLanguage()

  return (
    <section id="promocoes-cruzeiro" className="py-28 md:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[var(--text-primary)]">
            {t('promocoes_cruzeiro_title') || 'Promoções de Cruzeiros'}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('promocoes_cruzeiro_subtitle') || 'Ofertas especiais para viajar de cruzeiro'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cruzeiroPromocoes.map((promo, index) => (
            <CruzeiroPromoCard key={promo.id} promo={promo} delay={index * 0.1} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/cruzeiros" passHref legacyBehavior>
            <motion.a
              className="relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-sky text-navy font-bold text-lg rounded-full hover:bg-sky/90 transition-all shadow-xl shadow-sky/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Confira catálogo completo
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
