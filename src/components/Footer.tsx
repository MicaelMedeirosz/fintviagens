'use client'

import { motion } from 'framer-motion'
import { Shield, CreditCard, BadgeCheck, MessageSquare, Instagram, Facebook, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const footerLinks = {
  Empresa: ['Sobre Nós', 'Como Funciona', 'Parceiros', 'Carreiras', 'Imprensa', 'Blog'],
  Ajuda: ['Central de Ajuda', 'Perguntas Frequentes', 'Política de Cancelamento', 'Termos de Uso', 'Privacidade', 'Contato'],
  Destinos: ['São Paulo (GRU)', 'Nova York (JFK)', 'Lisboa (LIS)', 'Madrid (MAD)', 'Paris (CDG)', 'Ver todos (100+)'],
  Contato: ['WhatsApp: +41 79 895 53 48', 'Telefone: +41 79 391 98 28', 'Email: info@fintviagens.ch', 'Endereço: Zeughausstrasse 31, 8004 Zürich', 'Seg-Sex 08:00-20:00', 'Sáb 09:00-16:00'],
}

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-bg-dark border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="/logo.svg" alt="Fint Viagens" className="h-12 mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer_tagline')}
            </p>
            <div className="flex gap-4">
              {['instagram', 'facebook', 'linkedin', 'whatsapp'].map((social) => (
                <motion.a
                  key={social}
                  href={social === 'instagram' ? 'https://www.instagram.com/fintviagens/' : '#'}
                  target={social === 'instagram' ? '_blank' : undefined}
                  rel={social === 'instagram' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-sky hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social === 'instagram' && <Instagram className="w-5 h-5" />}
                  {social === 'facebook' && <Facebook className="w-5 h-5" />}
                  {social === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {social === 'whatsapp' && <MessageSquare className="w-5 h-5" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08 }}
            >
              <h4 className="font-bold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.08 + linkIndex * 0.03 + 0.2 }}
                  >
                    <a href="#" className="text-white/60 hover:text-sky transition-colors text-sm">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p className="text-white/40 text-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            © 2024 Fint Viagens. Todos os direitos reservados.
          </motion.p>
          
          <motion.div className="flex items-center gap-8 text-sm text-white/40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t('footer_secure')}
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}