'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CruzeiroPromoCardProps {
  promo: { id: string; titulo: string; subtitulo: string; image: string; tracking: string }
  delay?: number
}

const WHATSAPP_NUMBER = '41798955348'

export default function CruzeiroPromoCard({ promo, delay = 0 }: CruzeiroPromoCardProps) {
  const { t, lang } = useLanguage()

  const handleClick = () => {
    const message = `Olá Fint Viagens, tenho interesse na promoção de cruzeiro: ${promo.titulo} (${promo.subtitulo}). ${promo.tracking}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden glass-strong cursor-pointer h-[440px] sm:h-[460px]"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      style={{ touchAction: 'manipulation' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      aria-label={`Promoção de cruzeiro ${promo.titulo}`}
    >
      <div className="relative h-full flex flex-col">
        <div className="relative flex-[65%] overflow-hidden">
          <Image
            src={promo.image}
            alt={`Promoção de cruzeiro ${promo.titulo}`}
            width={1200}
            height={900}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/60 to-transparent" />
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <span className="px-2 py-1 bg-sky/90 text-navy text-xs font-semibold rounded-full">
              CRUZEIRO
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-block px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
              <p className="text-sm font-medium text-white">{promo.titulo}</p>
            </div>
          </div>
        </div>

        <div className="flex-[35%] flex flex-col justify-between p-3 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border-t border-[var(--border-primary)]">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">{promo.subtitulo}</p>
          </div>

          <div className="pt-1 border-t border-[var(--border-primary)] space-y-2">
            <motion.button
              onClick={handleClick}
              className="w-full px-6 py-3 bg-sky text-navy font-semibold rounded-full shadow-lg shadow-sky/30 hover:bg-sky/90 transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('promocao_falar_consultor') || 'Falar com consultor'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
