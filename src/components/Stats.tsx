'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const stats = [
  { value: '1.000+', labelKey: 'stat_1' as const },
  { value: '98%', labelKey: 'stat_2' as const },
  { value: '12x', labelKey: 'stat_3' as const },
  { value: '48h', labelKey: 'stat_4' as const },
]

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-[var(--bg-secondary)]/50 border-y border-[var(--border-primary)] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-sky mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-[var(--text-secondary)] font-medium">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}