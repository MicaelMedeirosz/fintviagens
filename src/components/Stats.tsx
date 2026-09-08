'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '50.000+', label: 'Clientes Satisfeitos' },
  { value: '98%', label: 'Taxa de Aprovação' },
  { value: '12x', label: 'Sem Juros' },
  { value: '24h', label: 'Emissão Rápida' },
]

export default function Stats() {
  return (
    <section className="py-20 bg-bg-dark/50 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
              <p className="text-white/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}