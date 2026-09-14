'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, X, Expand } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function TestimonialCard({
testimonial,
onOpenVideo,
}: {
testimonial: {
name?: string
location?: string
text?: string
rating: number
media?: string
mediaType?: 'image' | 'video' | 'none'
isCta?: boolean
ctaText?: string
ctaButton?: string
}
onOpenVideo: (media: string, name?: string) => void
}) {
const hasMedia = testimonial.media && testimonial.mediaType !== 'none'
const isVideo = testimonial.mediaType === 'video'

if (testimonial.isCta) {
  return (
    <div className="glass-strong rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-sky/20 flex items-center justify-center mb-6">
        <img src="/icons/instagram.svg" alt="Instagram" className="w-8 h-8 text-sky" />
      </div>

      <p className="text-[var(--text-primary)]/80 text-lg mb-6 max-w-xs">
        {testimonial.ctaText}
      </p>

      <a
        href="https://instagram.com/fintviagens"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-sky text-navy font-semibold rounded-full hover:bg-sky/90 transition-colors shadow-lg shadow-sky/20"
      >
        {testimonial.ctaButton}

        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  )
}

return (
  <div className="glass-strong rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30 flex flex-col items-center justify-center">
    <div className="flex gap-1 mb-6">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    {hasMedia && (
      <div className="relative aspect-[3/4] w-full max-w-xs rounded-xl overflow-hidden bg-[var(--bg-secondary)]/50 cursor-pointer group"
        onClick={() => isVideo && onOpenVideo(testimonial.media!)}>
        {testimonial.mediaType === 'video' ? (
          <video
            src={testimonial.media}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={testimonial.media}
            alt={testimonial.name || 'Depoimento'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {isVideo && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Expand className="w-12 h-12 text-white bg-black/50 rounded-full p-2" />
          </div>
        )}
      </div>
    )}
  </div>
)
}

function VideoModal({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) {
const videoRef = useRef<HTMLVideoElement>(null)

useEffect(() => {
  if (isOpen && videoRef.current) {
    videoRef.current.muted = false
    videoRef.current.play().catch(() => {})
  } else if (videoRef.current) {
    videoRef.current.pause()
  }
}, [isOpen])

if (!isOpen) return null

return (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label="Video testimonial"
  >
    <motion.div
      className="absolute inset-0 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
    <motion.div
      className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="Close video"
      >
        <X className="w-5 h-5" />
      </button>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain"
        controls
        autoPlay
        playsInline
      />
    </motion.div>
  </motion.div>
)
}

export default function Testimonials() {
const { t } = useLanguage()
const [openVideo, setOpenVideo] = useState<{ src: string } | null>(null)
const scrollContainerRef = useRef<HTMLDivElement>(null)

const handleOpenVideo = (src: string) => {
  setOpenVideo({ src })
  if (scrollContainerRef.current) {
    scrollContainerRef.current.style.animationPlayState = 'paused'
  }
}

const handleCloseVideo = () => {
  setOpenVideo(null)
  if (scrollContainerRef.current) {
    scrollContainerRef.current.style.animationPlayState = 'running'
  }
}

const testimonials = [
{
name: t('testimonial_1_name'),
location: t('testimonial_1_location'),
text: t('testimonial_1_text'),
rating: 5,
media: t('testimonial_1_media'),
mediaType: t('testimonial_1_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_2_name'),
location: t('testimonial_2_location'),
text: t('testimonial_2_text'),
rating: 5,
media: t('testimonial_2_media'),
mediaType: t('testimonial_2_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_3_name'),
location: t('testimonial_3_location'),
text: t('testimonial_3_text'),
rating: 5,
media: t('testimonial_3_media'),
mediaType: t('testimonial_3_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_4_name'),
location: t('testimonial_4_location'),
text: t('testimonial_4_text'),
rating: 5,
media: t('testimonial_4_media'),
mediaType: t('testimonial_4_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_5_name'),
location: t('testimonial_5_location'),
text: t('testimonial_5_text'),
rating: 5,
media: t('testimonial_5_media'),
mediaType: t('testimonial_5_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_6_name'),
location: t('testimonial_6_location'),
text: t('testimonial_6_text'),
rating: 5,
media: t('testimonial_6_media'),
mediaType: t('testimonial_6_media_type') as 'image' | 'video' | 'none',
},
{
name: t('testimonial_7_name'),
location: t('testimonial_7_location'),
text: t('testimonial_7_text'),
rating: 5,
media: t('testimonial_7_media'),
mediaType: t('testimonial_7_media_type') as 'image' | 'video' | 'none',
},
{
isCta: true,
ctaText: t('test_cta_text'),
ctaButton: t('test_cta_button'),
rating: 5,
media: '',
mediaType: 'none' as const,
},
]

return (
  <section id="depoimentos" className="py-28 md:py-32 relative bg-[var(--bg-primary)]">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-sky mb-4">
          {t('test_label')}
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
          {t('test_title_1')}{' '}
          <span className="text-sky">{t('test_title_2')}</span>
        </h2>

        <p className="text-lg text-[var(--text-secondary)]">
          {t('test_subtitle')}
        </p>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden" ref={scrollContainerRef}>
          <div
            className="flex animate-scroll"
            style={{ width: 'max-content' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-[350px] sm:w-[400px] flex-shrink-0 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} onOpenVideo={handleOpenVideo} />
              </motion.div>
            ))}

            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index + 100}
                className="w-[350px] sm:w-[400px] flex-shrink-0 px-4"
              >
                <TestimonialCard testimonial={testimonial} onOpenVideo={handleOpenVideo} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />
      </div>
    </div>

    <VideoModal
      isOpen={!!openVideo}
      onClose={handleCloseVideo}
      videoSrc={openVideo?.src || ''}
    />

    <style jsx global>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-scroll {
        animation: scroll 30s linear infinite;
      }

      .animate-scroll:hover {
        animation-play-state: paused;
      }
    `}</style>
  </section>

)
}