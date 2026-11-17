'use client'

import { motion } from 'framer-motion'
import { Download, MapPin, Ship, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CatalogoItem {
  id: string
  titulo: string
  subtitulo: string
  href: string
  icon: React.ElementType
  labelBaixar: string
}

const catalogoData: Record<string, CatalogoItem[]> = {
  pt: [
    {
      id: 'dezembro',
      titulo: 'Dezembro',
      subtitulo: 'Temporada de cruzeiros dezembro',
      href: '/cruzeiros/Catalogo_Cruzeiros_Dezembro_2026_Fint_Viagens 4.pdf',
      icon: MapPin,
      labelBaixar: 'Baixar cat\u00e1logo',
    },
    {
      id: 'final-ano',
      titulo: 'Final de Ano',
      subtitulo: 'Cruzeiros de final de ano',
      href: '/cruzeiros/Catalogo_Cruzeiros_Final_de_Ano_2026_Fint_Viagens.pdf',
      icon: Ship,
      labelBaixar: 'Baixar cat\u00e1logo',
    },
    {
      id: 'janeiro',
      titulo: 'Janeiro',
      subtitulo: 'Cruzeiros de janeiro',
      href: '/cruzeiros/Catalogo_Cruzeiros_Janeiro_2027_Fint_Viagens_v2 3.pdf',
      icon: Calendar,
      labelBaixar: 'Baixar cat\u00e1logo',
    },
  ],
  de: [
    {
      id: 'dezembro',
      titulo: 'Dezember',
      subtitulo: 'Kreuzfahrtsaison Dezember',
      href: '/cruzeiros/Catalogo_Cruzeiros_Dezembro_2026_Fint_Viagens 4.pdf',
      icon: MapPin,
      labelBaixar: 'Katalog herunterladen',
    },
    {
      id: 'final-ano',
      titulo: 'Jahresende',
      subtitulo: 'Kreuzfahrten Jahresende',
      href: '/cruzeiros/Catalogo_Cruzeiros_Final_de_Ano_2026_Fint_Viagens.pdf',
      icon: Ship,
      labelBaixar: 'Katalog herunterladen',
    },
    {
      id: 'janeiro',
      titulo: 'Januar',
      subtitulo: 'Kreuzfahrten Januar',
      href: '/cruzeiros/Catalogo_Cruzeiros_Janeiro_2027_Fint_Viagens_v2 3.pdf',
      icon: Calendar,
      labelBaixar: 'Katalog herunterladen',
    },
  ],
  en: [
    {
      id: 'dezembro',
      titulo: 'December',
      subtitulo: 'Cruise season December',
      href: '/cruzeiros/Catalogo_Cruzeiros_Dezembro_2026_Fint_Viagens 4.pdf',
      icon: MapPin,
      labelBaixar: 'Download catalog',
    },
    {
      id: 'final-ano',
      titulo: 'Year End',
      subtitulo: 'Cruises year end',
      href: '/cruzeiros/Catalogo_Cruzeiros_Final_de_Ano_2026_Fint_Viagens.pdf',
      icon: Ship,
      labelBaixar: 'Download catalog',
    },
    {
      id: 'janeiro',
      titulo: 'January',
      subtitulo: 'Cruises January',
      href: '/cruzeiros/Catalogo_Cruzeiros_Janeiro_2027_Fint_Viagens_v2 3.pdf',
      icon: Calendar,
      labelBaixar: 'Download catalog',
    },
  ],
  es: [
    {
      id: 'dezembro',
      titulo: 'Diciembre',
      subtitulo: 'Temporada de cruceros diciembre',
      href: '/cruzeiros/Catalogo_Cruzeiros_Dezembro_2026_Fint_Viagens 4.pdf',
      icon: MapPin,
      labelBaixar: 'Descargar cat\u00e1logo',
    },
    {
      id: 'final-ano',
      titulo: 'Fin de A\u00f1o',
      subtitulo: 'Cruceros fin de a\u00f1o',
      href: '/cruzeiros/Catalogo_Cruzeiros_Final_de_Ano_2026_Fint_Viagens.pdf',
      icon: Ship,
      labelBaixar: 'Descargar cat\u00e1logo',
    },
    {
      id: 'janeiro',
      titulo: 'Enero',
      subtitulo: 'Cruceros enero',
      href: '/cruzeiros/Catalogo_Cruzeiros_Janeiro_2027_Fint_Viagens_v2 3.pdf',
      icon: Calendar,
      labelBaixar: 'Descargar cat\u00e1logo',
    },
  ],
}

export default function Cruzeiros() {
  const { t, lang } = useLanguage()
  const items = catalogoData[lang] || catalogoData.pt

  return (
    <section id="cruzeiros" className="py-28 md:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[var(--text-primary)]">
            {t('cruzeiros_title')}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('cruzeiros_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: items.indexOf(item) * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-[var(--border-primary)] flex flex-col h-full group">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky/10 text-sky mb-4 group-hover:bg-sky/20 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {item.titulo}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1">
                  {item.subtitulo}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sky text-navy font-semibold rounded-xl hover:bg-sky/90 transition-all shadow-md shadow-sky/20"
                >
                  {item.labelBaixar}
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[var(--text-secondary)] text-sm">
            Precisa de ajuda? Fale conosco pelo WhatsApp.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
