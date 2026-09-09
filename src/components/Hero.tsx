'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Plane, MessageSquare, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface FlightCardProps {
  from: string
  to: string
  price: string
  installment: string
  airline: string
  direct: boolean
  delay: number
}

function FlightCard({ from, to, price, installment, airline, direct, delay }: FlightCardProps) {
  const { t } = useLanguage()
const scrollToQuote = () => {
  const el = document.getElementById('cotar')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToHow = () => {
  const el = document.getElementById('como-funciona')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

  return (
    <motion.div
      className="glass rounded-xl p-4 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-sky" />
          <span className="font-medium text-sm">{airline}</span>
        </div>
        {direct && (
          <span className="px-2 py-0.5 bg-sky/20 text-sky text-xs font-medium rounded-full">{t('cta_direct')}</span>
        )}
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-center">
          <p className="text-2xl font-bold font-display">{from}</p>
          <p className="text-xs text-white/50">{t('nav_how')}</p>
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <Plane className="w-4 h-4 rotate-90" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-display">{to}</p>
          <p className="text-xs text-white/50">{t('nav_destinations')}</p>
        </div>
      </div>
      <div className="border-t border-white/10 pt-3">
        <div className="relative" onClick={scrollToQuote} style={{ cursor: 'pointer' }}>
          <p className="text-xl font-bold font-display text-sky blur-[8px] text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 select-none pointer-events-none">
            {price}
          </p>
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-bg-dark/80 via-sky/20 to-bg-dark/80 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-medium text-sky/80 px-3 py-1 glass rounded-full animate-pulse">
              {t('cta_step_2')}
            </span>
          </motion.div>
        </div>
        <p className="text-sm text-white/60 blur-[4px] select-none pointer-events-none">
          {installment}
        </p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const particleCount = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      x!: number
      y!: number
      size!: number
      speedX!: number
      speedY!: number
      opacity!: number
      color!: string

      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.5 ? '#3FB8E0' : '#FFFFFF'
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          this.x -= dx * 0.005
          this.y -= dy * 0.005
        }
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
          this.reset()
        }
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.globalAlpha = this.opacity
        ctx!.fill()
        ctx!.globalAlpha = 1
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach((p) => {
        p.update(mouseX, mouseY)
        p.draw()
      })

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = '#3FB8E0'
            ctx!.globalAlpha = (1 - dist / 120) * 0.15
            ctx!.lineWidth = 0.5
            ctx!.stroke()
            ctx!.globalAlpha = 1
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const whatsappLink = `https://wa.me/41798955348?text=${encodeURIComponent(t('wa_intro'))} ${t('wa_field_type')}`

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,184,224,0.08)_0%,_transparent_70%)]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-32 pt-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 bg-gradient-to-r from-white via-sky/90 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {t('hero_title_1')}
              <br />
              <span className="text-sky">{t('hero_title_2')}</span>
              <br />
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t('hero_subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="#cotar"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-sky text-navy font-semibold text-lg rounded-full hover:bg-sky/90 transition-all shadow-xl shadow-sky/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero_cta_primary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 glass-strong text-lg font-medium rounded-full hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                +41 79 895 5348
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky" />
                {t('hero_benefit_1')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky" />
                {t('hero_benefit_2')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky" />
                {t('hero_benefit_3')}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative glass-strong rounded-3xl p-2 max-w-md mx-auto">
              <div className="bg-bg-dark/80 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
                
                <div className="relative grid grid-cols-2 gap-4">
                  <FlightCard 
                    from="ZRH" 
                    to="GRU" 
                    price="CHF 890" 
                    installment="12x CHF 74,17" 
                    airline="Swiss" 
                    direct={true}
                    delay={0.1}
                  />
                  <FlightCard 
                    from="GVA" 
                    to="JFK" 
                    price="CHF 650" 
                    installment="12x CHF 54,17" 
                    airline="Swiss" 
                    direct={true}
                    delay={0.2}
                  />
                  <FlightCard 
                    from="ZRH" 
                    to="LIS" 
                    price="CHF 280" 
                    installment="12x CHF 23,33" 
                    airline="Swiss/TAP" 
                    direct={true}
                    delay={0.3}
                  />
                  <FlightCard 
                    from="GVA" 
                    to="MAD" 
                    price="CHF 180" 
                    installment="12x CHF 15,00" 
                    airline="Swiss/Iberia" 
                    direct={true}
                    delay={0.4}
                  />
                </div>

                <motion.div
                  className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Shield className="w-5 h-5 text-sky" />
                    <span>{t('hero_secure')} &bull; {t('hero_support_24h')}</span>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-sky/20 text-sky rounded-lg text-sm font-medium hover:bg-sky/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('dest_view_all')}
                  </motion.button>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-navy/30 rounded-full blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-sm"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.8 },
          y: { duration: 2, repeat: Infinity }
        }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
        <span>{t('hero_explore')}</span>
      </motion.div>
    </section>
  )
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  reset: () => void
  update: (mouseX: number, mouseY: number) => void
  draw: () => void
}