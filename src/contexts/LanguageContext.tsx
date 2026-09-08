'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Language, translations, TranslationKey } from '@/lib/translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'
  const browserLang = window.navigator.language || (window.navigator as any).userLanguage
  const lang = browserLang?.toLowerCase().split('-')[0] || ''
  if (lang === 'pt' || lang === 'de' || lang === 'en' || lang === 'es') {
    return lang as Language
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('fint-lang') as Language | null
    if (stored && ['pt', 'de', 'en', 'es'].includes(stored)) {
      setLangState(stored)
    } else {
      const detected = detectBrowserLanguage()
      setLangState(detected)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('fint-lang', lang)
      document.documentElement.lang = lang
    }
  }, [lang, mounted])

  const setLang = (newLang: Language) => setLangState(newLang)

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.pt[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}