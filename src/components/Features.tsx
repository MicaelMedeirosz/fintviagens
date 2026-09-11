'use client'

import { motion } from 'framer-motion'
import { Shield, CreditCard, Plane, Globe, Users, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const features = [
  { icon: Shield, titleKey: 'feat_1_title' as const, descKey: 'feat_1_desc' as const },
  { icon: CreditCard, titleKey: 'feat_2_title' as const, descKey: 'feat_2_desc' as const },
  { icon: Plane, titleKey: 'feat_3_title' as const, descKey: 'feat_3_desc' as const },
  { icon: Globe, titleKey: 'feat_4_title' as const, descKey: 'feat_4_desc' as const },
  { icon: Users, titleKey: 'feat_5_title' as const, descKey: 'feat_5_desc' as const },
  { icon: Star, titleKey: 'feat_6_title' as const, descKey: 'feat_6_desc' as const },
]

export default function Features() {
  const { t } = useLanguage()

  return (
    <section id="vantagens" className="py-28 md:py-32 relative bg-gradient-mesh">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
            {t('feat_label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
            {t('feat_title_1')} <span className="text-sky">{t('feat_title_2')}</span>
            <br />
            <span className="text-sky">{t('feat_title_3')}</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            {t('feat_subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              className="glass-strong rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <motion.div
                className="w-14 h-14 bg-sky/15 rounded-xl flex items-center justify-center mb-6 text-sky group-hover:bg-sky/25 group-hover:scale-110 transition-all duration-300"
                whileHover={{ rotate: 6 }}
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{t(feature.titleKey)}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}