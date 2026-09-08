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
import Features from './Features'
import Testimonials from './Testimonials'
import Stats from './Stats'
import Pricing from './Pricing'
import CTA from './CTA'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null)

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
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Destinations />
      <Features />
      <Testimonials />
      <Stats />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}