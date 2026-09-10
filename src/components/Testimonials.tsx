'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function TestimonialCard({
testimonial,
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
}) {
const hasMedia = testimonial.media && testimonial.mediaType !== 'none'

if (testimonial.isCta) {
return (
<div className="glass-strong rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-sky/10 hover:border-sky/30 flex flex-col items-center justify-center text-center">
<div className="w-16 h-16 rounded-full bg-sky/20 flex items-center justify-center mb-6">
<img src="/icons/instagram.svg" alt="Instagram" className="w-8 h-8 text-sky" />
</div>

    <p className="text-white/80 text-lg mb-6 max-w-xs">
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
    <div className="relative aspect-[3/4] w-full max-w-xs rounded-xl overflow-hidden bg-white/5">
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
    </div>
  )}
</div>

)
}

export default function Testimonials() {
const { t } = useLanguage()

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
isCta: true,
ctaText: t('test_cta_text'),
ctaButton: t('test_cta_button'),
rating: 5,
media: '',
mediaType: 'none' as const,
},
]

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
{t('test_label')}
</span>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
        {t('test_title_1')}{' '}
        <span className="text-sky">{t('test_title_2')}</span>
      </h2>

      <p className="text-lg text-white/60">
        {t('test_subtitle')}
      </p>
    </motion.div>

    <div className="relative">
      <div className="overflow-hidden">
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