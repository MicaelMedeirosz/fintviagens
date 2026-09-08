'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Maria Santos', location: 'Zurique → Nova York', text: 'Melhor experiência de compra de passagens em 10 anos morando na Suíça. Parcelado em 10x, emitido no mesmo dia, suporte impecável.', rating: 5 },
  { name: 'João Silva', location: 'Genebra → Lisboa', text: 'Equipe entende a burocracia suíça. Me ajudaram com visto, documentação e ainda conseguiram voo direto. Recomendo de olhos fechados.', rating: 5 },
  { name: 'Ana Costa', location: 'Basileia → Dubai', text: 'Preço justo, parcelamento real sem pegadinha. Já indiquei para 5 colegas de trabalho. Voltarei a comprar com certeza.', rating: 5 },
  { name: 'Pedro Oliveira', location: 'Bern → Tóquio', text: 'Atendimento humanizado, resolvem tudo por WhatsApp. Emissão rápida, melhor custo-benefício que encontrei na Suíça toda.', rating: 5 },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="glass-strong rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-white/80 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="border-t border-white/10 pt-4">
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-white/50">{testimonial.location}</p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-28 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
            Depoimentos Reais
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            O que nossos <span className="text-sky">clientes dizem</span>
          </h2>
          <p className="text-lg text-white/60">
            Mais de 50.000 viajantes já confiaram na Fint Viagens.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex animate-scroll" style={{ width: 'max-content' }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="w-[350px] sm:w-[400px] flex-shrink-0 px-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index + 100}
                  className="w-[350px] sm:w-[400px] flex-shrink-0 px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-dark to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-dark to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}