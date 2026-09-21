'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { packageDestinations } from '@/lib/packageDestinations'

interface PackageCardProps {
  pkg: typeof packageDestinations[0]
  delay?: number
}

const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function PackageCard({ pkg, delay = 0 }: PackageCardProps) {
  const { t } = useLanguage()

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden glass-strong cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={scrollToQuote}
      style={{ touchAction: 'manipulation' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToQuote() } }}
      aria-label={`Pacote para ${pkg.city}, ${pkg.country}`}
    >
      <div className="relative h-full flex flex-col">
        <div className="relative flex-[65%] overflow-hidden">
          <img
            src={pkg.image}
            alt={`Pacote para ${pkg.city}, ${pkg.country}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/60 to-transparent" />
          
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <span className="px-2 py-1 bg-sky/90 text-navy text-xs font-semibold rounded-full">
              {pkg.code}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-block px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
              <p className="text-sm font-medium text-white">
                {pkg.city}, {pkg.country}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-[35%] flex flex-col justify-between p-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border-t border-[var(--border-primary)]">
          <div>
            <div className="relative">
              <p className="text-2xl font-bold font-display text-sky blur-[8px] text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)]/20 to-[var(--text-primary)]/5 select-none pointer-events-none">
                CHF 0.000
              </p>
            </div>
          </div>

          <div className="pt-1 border-t border-[var(--border-primary)] space-y-2">
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
              <span className="font-medium">{t('package_includes')}</span>
              <span className="text-[var(--text-secondary)]/60">•</span>
              <span>{t('package_availability')}</span>
            </p>
            
            <motion.button
              onClick={(e) => { e.stopPropagation(); scrollToQuote() }}
              className="w-full px-6 py-3 bg-sky text-navy font-semibold rounded-full shadow-lg shadow-sky/30 hover:bg-sky/90 transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('package_quote_now')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}