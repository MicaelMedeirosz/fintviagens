'use client'

import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const destinations = [
  { city: 'São Paulo', code: 'GRU', flights: '12 voos/semana', price: 'CHF 890', bg: 'linear-gradient(135deg, #1e3a5f 0%, #0B3D6B 100%)' },
  { city: 'Nova York', code: 'JFK', flights: '14 voos/semana', price: 'CHF 650', bg: 'linear-gradient(135deg, #1a3a4a 0%, #0d2d3d 100%)' },
  { city: 'Lisboa', code: 'LIS', flights: '21 voos/semana', price: 'CHF 280', bg: 'linear-gradient(135deg, #3a2e1a 0%, #2d2210 100%)' },
  { city: 'Madrid', code: 'MAD', flights: '18 voos/semana', price: 'CHF 180', bg: 'linear-gradient(135deg, #3a1a2e 0%, #2d1022 100%)' },
  { city: 'Paris', code: 'CDG', flights: '28 voos/semana', price: 'CHF 150', bg: 'linear-gradient(135deg, #1a2e3a 0%, #10222d 100%)' },
  { city: 'Londres', code: 'LHR', flights: '35 voos/semana', price: 'CHF 120', bg: 'linear-gradient(135deg, #2e1a3a 0%, #22102d 100%)' },
  { city: 'Dubai', code: 'DXB', flights: '7 voos/semana', price: 'CHF 780', bg: 'linear-gradient(135deg, #3a3a1a 0%, #2d2d10 100%)' },
  { city: 'Tóquio', code: 'NRT', flights: '5 voos/semana', price: 'CHF 1.150', bg: 'linear-gradient(135deg, #1a3a2e 0%, #102d1a 100%)' },
  { city: 'Rio de Janeiro', code: 'GIG', flights: '8 voos/semana', price: 'CHF 920', bg: 'linear-gradient(135deg, #1a4a3a 0%, #0d3d2e 100%)' },
]

const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function DestinationCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const { t } = useLanguage()
  const installment = `12x de CHF ${(parseFloat(dest.price.replace('CHF ', '').replace(',', '')) / 12).toFixed(2)}/mês`

  return (
    <motion.div
      key={dest.city}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: dest.bg }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t('nav_destinations')}</p>
            <p className="text-3xl font-bold font-display">{dest.city}</p>
          </div>
          <motion.div
            className="glass px-3 py-1.5 rounded-full text-sm font-medium text-sky"
            whileHover={{ scale: 1.05 }}
          >
            {dest.code}
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <div className="flex items-center gap-3 text-white/60 text-sm mb-6">
            <Plane className="w-4 h-4" />
            <span>{dest.flights}</span>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="relative mb-1" onClick={scrollToQuote} style={{ cursor: 'pointer' }}>
              <p className="text-3xl font-bold font-display text-sky blur-[8px] text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 select-none pointer-events-none">
                {dest.price}
              </p>
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-bg-dark/80 via-sky/20 to-bg-dark/80 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs font-medium text-sky/80 px-3 py-1 glass rounded-full animate-pulse">
                  {t('cta_step_2')}
                </span>
              </motion.div>
            </div>
            <p className="text-sm text-white/50">{t('how_step_3_desc')}</p>
            <p className="text-sm text-white/40 mt-1 blur-[4px] select-none pointer-events-none">
              ≈ {installment}
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

export default function Destinations() {
  const { t } = useLanguage()

  return (
    <section id="destinos" className="py-28 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
            {t('dest_label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {t('dest_title_1')} <span className="text-sky">{t('dest_title_2')}</span>
          </h2>
          <p className="text-lg text-white/60">
            {t('dest_subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard dest={dest} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#destinos"
            className="inline-flex items-center gap-3 px-8 py-4 glass-strong font-semibold rounded-full hover:bg-white/10 transition-all border border-white/10"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('dest_view_all')}
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