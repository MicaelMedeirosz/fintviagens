'use client'

import { motion } from 'framer-motion'
import { Shield, CreditCard, Plane, Globe, Users, Star } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Segurança Total', desc: 'Parceiros certificados IATA e proteção de dados bancária' },
  { icon: CreditCard, title: 'Parcelamento Real', desc: 'Até 12x sem juros no cartão suíço ou boleto' },
  { icon: Plane, title: 'Melhores Rotas', desc: 'Voos diretos e conexões otimizadas para 100+ destinos' },
  { icon: Globe, title: 'Suporte Multilíngue', desc: 'Atendimento em PT, DE, FR, IT, EN - 7 dias por semana' },
  { icon: Users, title: 'Equipe Global', desc: 'Especialistas em viagens internacionais na Suíça' },
  { icon: Star, title: 'Fidelidade', desc: 'Programa de pontos: cada viagem gera desconto na próxima' },
]

export default function Features() {
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
            Por que Fint Viagens
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            A escolha <span className="text-sky">dos viajantes</span> na Suíça
          </h2>
          <p className="text-lg text-white/60">
            Mais que passagens, entregamos tranquilidade para sua viagem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}