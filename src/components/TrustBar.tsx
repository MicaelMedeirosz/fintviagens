'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-[var(--bg-secondary)]/50 border-y border-[var(--border-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 hover:opacity-60 transition-opacity duration-500">
          {['Swiss', 'LATAM', 'Edelweiss', 'TAP', 'United', 'IATA', 'SSL Secure', 'Visa', 'Mastercard', 'Amex'].map((partner) => (
            <motion.span
              key={partner}
              className="text-lg md:text-xl font-medium text-[var(--text-secondary)] hover:text-sky transition-colors cursor-default"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}