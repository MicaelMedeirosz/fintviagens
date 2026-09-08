'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const steps = [
  { num: '01', titleKey: 'how_step_1_title' as const, descKey: 'how_step_1_desc' as const },
  { num: '02', titleKey: 'how_step_2_title' as const, descKey: 'how_step_2_desc' as const },
  { num: '03', titleKey: 'how_step_3_title' as const, descKey: 'how_step_3_desc' as const },
]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section id="como-funciona" className="py-28 md:py-32 relative bg-gradient-mesh">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
            {t('how_label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {t('how_title_1')} <span className="text-sky">{t('how_title_2')}</span>
            <br />
            <span className="text-sky">{t('how_title_3')}</span>
          </h2>
          <p className="text-lg text-white/60">
            {t('how_subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative glass-strong rounded-2xl p-8 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky/10 group-hover:border-sky/30">
                <motion.div
                  className="absolute -top-4 left-8 w-12 h-12 bg-sky/20 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl font-bold font-display text-sky">{step.num}</span>
                </motion.div>

                <div className="pt-8">
                  <h3 className="text-2xl font-bold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-white/70 leading-relaxed">{t(step.descKey)}</p>
                </div>
              </div>

              {index < 2 && (
                <motion.div
                  className="hidden md:block absolute top-10 right-[-10%] w-[20%] h-[1px] bg-gradient-to-r from-sky to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}