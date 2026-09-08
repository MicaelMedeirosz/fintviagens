'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowRight } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'

const TRACKING_CODE = '#FINT-SITE'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsappLink = `https://wa.me/41798955348?text=${encodeURIComponent(t('wa_intro') + ' ' + TRACKING_CODE)}`

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
          {[t('nav_how'), t('nav_destinations'), t('nav_features'), t('nav_testimonials'), t('nav_contact')].map((item) => {
            const id = item.toLowerCase().replace('ç', 'c').replace('ã', 'a')
            return (
              <motion.a
                key={item}
                href={`#${id}`}
                className="text-sm font-medium text-white/80 hover:text-sky transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-sky after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left transition-transform duration-300"
              >
                {item}
              </motion.a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4" />
            {t('nav_whatsapp')}
          </motion.a>
          <motion.a
            href="#cotar"
            className="flex items-center gap-2 px-6 py-3 bg-sky text-navy font-semibold rounded-full hover:bg-sky/90 transition-colors shadow-lg shadow-sky/20"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('nav_cta')}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}