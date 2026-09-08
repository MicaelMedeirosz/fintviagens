'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong py-3' : 'py-5'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/logo.svg" alt="Fint Viagens" className="h-10 w-auto" />
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {['Como Funciona', 'Destinos', 'Vantagens', 'Depoimentos', 'Contato'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace('ç', 'c').replace('ã', 'a')}`}
              className="text-sm font-medium text-white/80 hover:text-sky transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-sky after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left transition-transform duration-300"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="https://wa.me/41798955348?text=Ol%C3%A1%20Fint%20Viagens%2C%20vim%20pelo%20site%20e%20gostaria%20de%20cotar%20passagens%20para%20o%20Brasil.%20%23FINT-SITE"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </motion.a>
          <motion.a
            href="#cotar"
            className="flex items-center gap-2 px-6 py-3 bg-sky text-navy font-semibold rounded-full hover:bg-sky/90 transition-colors shadow-lg shadow-sky/20"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Cotar Agora
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}