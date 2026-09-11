'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, Language } from '@/lib/translations'

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = languages.find(l => l.code === lang) || languages[0]

  const handleSelect = (code: Language) => {
    setLang(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 glass rounded-full text-sm font-medium hover:bg-[var(--glass-strong-bg)] transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-sky" />
        <span className="uppercase font-bold text-[var(--text-primary)]">{current.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-48 glass-strong rounded-2xl p-2 shadow-2xl shadow-[var(--bg-primary)]/50 z-50"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => handleSelect(language.code)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  lang === language.code 
                    ? 'bg-sky/20 text-sky' 
                    : 'hover:bg-[var(--glass-strong-bg)] text-[var(--text-primary)]/80'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="flex-1 text-sm font-medium">{language.name}</span>
                {lang === language.code && (
                  <Check className="w-4 h-4 text-sky" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}