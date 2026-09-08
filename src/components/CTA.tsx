'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Mail, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cotar" className="py-28 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Pronto para <span className="text-sky">viajar pelo mundo</span>?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Simule sua viagem agora. Receba as melhores opções no WhatsApp em minutos.
            Sem compromisso, sem spam, só as melhores ofertas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://wa.me/41798955348?text=Ol%C3%A1%20Fint%20Viagens%2C%20vim%20pelo%20site%20e%20gostaria%20de%20cotar%20passagens.%20%23FINT-SITE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-sky text-navy font-semibold text-lg rounded-full hover:bg-sky/90 transition-all shadow-xl shadow-sky/30"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="w-6 h-6" />
              Cotar no WhatsApp Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="mailto:contato@fintviagens.ch"
              className="flex items-center justify-center gap-3 px-10 py-5 glass-strong font-semibold text-lg rounded-full hover:bg-white/10 transition-all border border-white/10"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-6 h-6" />
              Enviar Email
            </motion.a>
          </div>

          <p className="mt-8 text-white/50 text-sm">
            Ou ligue: <a href="tel:+41441234567" className="text-sky hover:underline font-medium">+41 44 123 45 67</a> • 
            Seg-Sex 08:00-20:00 • Sáb 09:00-16:00 (Horário Suíça)
          </p>
        </motion.div>
      </div>
    </section>
  )
}