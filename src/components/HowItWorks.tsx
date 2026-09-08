'use client'

import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Cotar', desc: 'Preencha origem, destino e datas. Receba melhores opções em minutos via WhatsApp ou email.' },
  { num: '02', title: 'Escolher', desc: 'Compare voos, horários e parcelamento. Escolha a melhor opção para seu bolso e agenda.' },
  { num: '03', title: 'Viajar', desc: 'Pague em até 12x sem juros. Receba e-ticket e documentos. Suporte até o embarque.' },
]

export default function HowItWorks() {
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
            3 Passos Simples
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Do orçamento <span className="text-sky">ao embarque</span> em minutos
          </h2>
          <p className="text-lg text-white/60">
            Processo 100% digital, suporte humano quando você precisar.
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
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">{step.desc}</p>
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