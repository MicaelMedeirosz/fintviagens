'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Shield, Plane, CreditCard, Globe, Users, Star, MessageSquare, Mail, Instagram, Facebook, Linkedin, BadgeCheck } from 'lucide-react'

import Navbar from './Navbar'
import Hero from './Hero'
import TrustBar from './TrustBar'
import HowItWorks from './HowItWorks'
import Destinations from './Destinations'
import CruzeiroPromocoes from './CruzeiroPromocoes'
import Features from './Features'
import Testimonials from './Testimonials'
import Stats from './Stats'
import Pricing from './Pricing'
import CTA from './CTA'
import Footer from './Footer'
import ApprovalPopup, { ApprovalPopupHandle } from './ApprovalPopup'
import PackageQuotePopup from './PackageQuotePopup'
import Link from 'next/link'
import { packageDestinations } from '@/lib/packageDestinations'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
   const lenisRef = useRef<Lenis | null>(null)
   const approvalRef = useRef<ApprovalPopupHandle>(null)
   const [showPackageQuote, setShowPackageQuote] = useState(false)
   const [selectedPackage, setSelectedPackage] = useState<typeof packageDestinations[0] | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
     <>
       <Navbar />
       <Hero onPackageQuoteClick={(pkg) => {
     setSelectedPackage(pkg)
     setShowPackageQuote(true)
   }} onApprovalClick={() => approvalRef.current?.open()} />
       <TrustBar />
       <section id="cta-cruzeiros" className="py-20 md:py-24 relative overflow-hidden bg-[var(--bg-primary)]">
         <div className="relative max-w-4xl mx-auto px-6 text-center">
           <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
           <h2 className="relative z-10 text-3xl md:text-4xl font-bold leading-tight mb-6 text-[var(--text-primary)]">
             Cruzeiros
           </h2>
           <p className="relative z-10 text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">
             Descubra nossas promoções de cruzeiros e baixe o catálogo completo da temporada.
           </p>
           <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
             <motion.button
               onClick={() => {
                 const el = document.getElementById('promocoes-cruzeiro')
                 if (el) el.scrollIntoView({ behavior: 'smooth' })
               }}
               className="relative px-8 py-4 bg-sky text-navy font-semibold text-lg rounded-full hover:bg-sky/90 transition-all shadow-lg shadow-sky/30"
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
             >
               Ver promoções de cruzeiro
               <ArrowRight className="w-4 h-4 ml-1" />
             </motion.button>
             <Link href="/cruzeiros" passHref legacyBehavior>
               <motion.a
                 className="relative px-8 py-4 border-2 border-[var(--border-primary)] text-[var(--text-primary)] font-semibold text-lg rounded-full hover:bg-[var(--bg-secondary)] transition-all"
                 whileHover={{ scale: 1.02, y: -2 }}
                 whileTap={{ scale: 0.98 }}
               >
                 Confira catálogo completo
                 <ArrowRight className="w-4 h-4 ml-1" />
               </motion.a>
             </Link>
           </div>
         </div>
       </section>
       <CruzeiroPromocoes />
      <HowItWorks />
      <Destinations />
      <Features />
      <Testimonials />
      <Stats />
      <Pricing />
       <CTA />
       <Footer />
       <ApprovalPopup ref={approvalRef} />
       <PackageQuotePopup
        isOpen={showPackageQuote}
        onClose={() => {
          setShowPackageQuote(false)
          setSelectedPackage(null)
        }}
        selectedPackage={selectedPackage}
      />
    </>
  )
}