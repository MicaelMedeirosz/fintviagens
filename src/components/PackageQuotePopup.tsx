'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, MessageSquare, ExternalLink, User, Mail, Phone, Calendar, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { packageDestinations } from '@/lib/packageDestinations'

const WHATSAPP_NUMBER = '41798955348'

type Step = 1 | 2 | 'success'

interface PackageQuotePopupProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage: typeof packageDestinations[0] | null
}

interface FormData {
  nome: string
  email: string
  telefone: string
  adultos: string
  criancas: string
  criancasData: string[]
  checkIn: string
  checkOut: string
  observacoes: string
}

const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-')
  return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateStr
}

export default function PackageQuotePopup({ isOpen, onClose, selectedPackage }: PackageQuotePopupProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState<Step>(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    adultos: '1',
    criancas: '0',
    criancasData: [],
    checkIn: '',
    checkOut: '',
    observacoes: '',
  })
  const contentRef = useRef<HTMLDivElement>(null)
  const previousOverflow = useRef<string>('')

  const numCriancas = parseInt(formData.criancas) || 0

  useEffect(() => {
    if (numCriancas !== formData.criancasData.length) {
      setFormData(prev => ({
        ...prev,
        criancasData: Array(numCriancas).fill('')
      }))
    }
  }, [numCriancas])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      previousOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = previousOverflow.current
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setErrorMessage('')
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        adultos: '1',
        criancas: '0',
        criancasData: [],
        checkIn: '',
        checkOut: '',
        observacoes: '',
      })
    }
  }, [isOpen])

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleChildBirthChange = (index: number, value: string) => {
    setFormData(prev => {
      const newArr = [...prev.criancasData]
      newArr[index] = value
      return { ...prev, criancasData: newArr }
    })
  }

  const validateStep1 = () => {
    if (!formData.nome.trim()) {
      setErrorMessage('Nome é obrigatório')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('E-mail é obrigatório')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('E-mail inválido')
      return false
    }
    if (!formData.telefone.trim()) {
      setErrorMessage('Telefone é obrigatório')
      return false
    }
    if (formData.telefone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Telefone inválido')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.adultos || parseInt(formData.adultos) < 1) {
      setErrorMessage('Pelo menos 1 adulto é obrigatório')
      return false
    }
    if (!formData.checkIn) {
      setErrorMessage('Data de check-in é obrigatória')
      return false
    }
    if (!formData.checkOut) {
      setErrorMessage('Data de check-out é obrigatória')
      return false
    }
    const checkInDate = new Date(formData.checkIn + 'T00:00:00')
    const checkOutDate = new Date(formData.checkOut + 'T00:00:00')
    if (checkOutDate <= checkInDate) {
      setErrorMessage('Check-out deve ser posterior ao check-in')
      return false
    }
    if (numCriancas > 0) {
      for (let i = 0; i < numCriancas; i++) {
        if (!formData.criancasData[i]) {
          setErrorMessage(`Data de nascimento da criança ${i + 1} é obrigatória`)
          return false
        }
      }
    }
    return true
  }

  const nextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      }
    } else if (step === 2) {
      if (validateStep2()) {
        submitForm()
      }
    }
  }

  const prevStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const submitForm = () => {
    if (!selectedPackage) return

    const message = `Olá Fint Viagens, vim pelo site e gostaria de cotar este pacote.

*Pacote Selecionado*
Destino: ${selectedPackage.city}, ${selectedPackage.country}

*Dados Pessoais*
Nome: ${formData.nome}
E-mail: ${formData.email}
Telefone: ${formData.telefone}

*Passageiros & Datas*
Adultos: ${formData.adultos}
Crianças: ${formData.criancas}
${numCriancas > 0 ? '\n' + formData.criancasData.map((d, i) => `Criança ${i + 1}: ${formatDate(d)}`).join('\n') : ''}
Check-in: ${formatDate(formData.checkIn)}
Check-out: ${formatDate(formData.checkOut)}

*Observações*
${formData.observacoes || 'Nenhuma'}

#FV-PACOTE-${selectedPackage.id.toUpperCase()}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setStep('success')
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleBackdropClick = () => {
    if (isMobile) return
    onClose()
  }

  if (!isOpen || !selectedPackage) return null

  const containerClassName = isMobile
    ? "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-2xl border-t border-[var(--border-primary)]"
    : "fixed bottom-6 right-6 z-50 max-w-lg w-full mx-4 rounded-2xl"

  const animationVariants = isMobile
    ? { initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: '100%' } }
    : { initial: { opacity: 0, y: 50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 50, scale: 0.9 } }

  const transition = isMobile
    ? { type: 'spring', damping: 25, stiffness: 200 }
    : { type: 'spring', damping: 25, stiffness: 300 }

  const inputStyle = "w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 transition-all text-base min-h-[48px]"
  const labelStyle = "block text-sm font-medium text-[var(--text-primary)]/80 mb-2"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          <motion.div
            className={containerClassName}
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            exit={animationVariants.exit}
            transition={transition}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-quote-title"
            style={{ maxHeight: isMobile ? 'calc(100vh - env(safe-area-inset-bottom))' : 'auto' }}
          >
            <motion.div
              ref={contentRef}
              className="glass-strong shadow-2xl overflow-hidden border border-[var(--border-primary)] flex flex-col"
              style={{ maxHeight: isMobile ? 'calc(100vh - env(safe-area-inset-bottom))' : 'auto' }}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    className="p-6 sm:p-6 flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="w-8 h-8 rounded-full bg-sky/20 text-sky flex items-center justify-center font-bold text-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          1
                        </motion.span>
                        <h3 id="package-quote-title" className="text-lg font-bold text-[var(--text-primary)]">
                          {t('package_quote_title')}
                        </h3>
                      </div>
                      <motion.button
                        onClick={onClose}
                        className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Fechar"
                      >
                        <XCircle className="w-6 h-6" />
                      </motion.button>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] mb-6">
                      {t('package_quote_subtitle')}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="nome" className={labelStyle}>{t('cta_name')}</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                          <input
                            type="text"
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => handleInputChange('nome', e.target.value)}
                            required
                            placeholder={t('cta_name_ph')}
                            className={`${inputStyle} pl-12`}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className={labelStyle}>{t('cta_email')}</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder={t('cta_email_ph')}
                            className={`${inputStyle} pl-12`}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="telefone" className={labelStyle}>{t('cta_phone')}</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                          <input
                            type="tel"
                            id="telefone"
                            value={formData.telefone}
                            onChange={(e) => handleInputChange('telefone', e.target.value)}
                            required
                            placeholder={t('cta_phone_ph')}
                            className={`${inputStyle} pl-12`}
                          />
                        </div>
                      </div>
                    </div>

                    {errorMessage && (
                      <motion.p
                        className="mt-4 text-sm text-red/80 bg-red/10 px-4 py-3 rounded-xl border border-red/20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="inline w-4 h-4 mr-2" />
                        {errorMessage}
                      </motion.p>
                    )}

                    <motion.button
                      onClick={nextStep}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-sky text-navy font-semibold text-base rounded-xl hover:bg-sky/90 shadow-lg shadow-sky/30 transition-all min-h-[48px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('approval_continue')}
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    className="p-6 sm:p-6 flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="w-8 h-8 rounded-full bg-sky/20 text-sky flex items-center justify-center font-bold text-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          2
                        </motion.span>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                          {t('package_step_passengers_dates')}
                        </h3>
                      </div>
                      <motion.button
                        onClick={onClose}
                        className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Fechar"
                      >
                        <XCircle className="w-6 h-6" />
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adultos" className={labelStyle}>{t('cta_adults')}</label>
                          <select
                            id="adultos"
                            value={formData.adultos}
                            onChange={(e) => handleInputChange('adultos', e.target.value)}
                            required
                            className={inputStyle}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="criancas" className={labelStyle}>{t('cta_children')}</label>
                          <select
                            id="criancas"
                            value={formData.criancas}
                            onChange={(e) => handleInputChange('criancas', e.target.value)}
                            required
                            className={inputStyle}
                          >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="checkIn" className={labelStyle}>{t('package_field_checkin')}</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                            <input
                              type="date"
                              id="checkIn"
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange('checkIn', e.target.value)}
                              required
                              min={new Date().toISOString().split('T')[0]}
                              className={`${inputStyle} pl-12`}
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="checkOut" className={labelStyle}>{t('package_field_checkout')}</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                            <input
                              type="date"
                              id="checkOut"
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange('checkOut', e.target.value)}
                              required
                              min={formData.checkIn ? new Date(new Date(formData.checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                              className={`${inputStyle} pl-12`}
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                      </div>

                      {numCriancas > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                          className="p-4 glass rounded-xl border border-[var(--border-primary)]"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-5 h-5 text-sky" />
                            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                              {t('cta_children_dates')}
                            </h4>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {Array.from({ length: numCriancas }).map((_, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <label htmlFor={`crianca-${index}`} className={labelStyle}>
                                  {t('cta_child_n')} {index + 1}
                                </label>
                                <input
                                  type="date"
                                  id={`crianca-${index}`}
                                  required
                                  value={formData.criancasData[index] || ''}
                                  onChange={(e) => handleChildBirthChange(index, e.target.value)}
                                  max={new Date().toISOString().split('T')[0]}
                                  className={inputStyle}
                                  inputMode="numeric"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <label htmlFor="observacoes" className={labelStyle}>{t('cta_observations')}</label>
                        <textarea
                          id="observacoes"
                          value={formData.observacoes}
                          onChange={(e) => handleInputChange('observacoes', e.target.value)}
                          rows={3}
                          placeholder={t('cta_observations_ph')}
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <motion.p
                        className="mt-4 text-sm text-red/80 bg-red/10 px-4 py-3 rounded-xl border border-red/20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="inline w-4 h-4 mr-2" />
                        {errorMessage}
                      </motion.p>
                    )}

                    <div className="mt-6 flex gap-3">
                      <motion.button
                        onClick={prevStep}
                        type="button"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold rounded-xl hover:bg-[var(--border-primary)] transition-colors min-h-[48px]"
                        whileTap={{ scale: 0.98 }}
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Voltar
                      </motion.button>
                      <motion.button
                        onClick={nextStep}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-sky text-navy font-semibold rounded-xl hover:bg-sky/90 shadow-lg shadow-sky/30 transition-all min-h-[48px]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t('package_quote_now')}
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    className="p-6 sm:p-6 text-center flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-green" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green mb-2">
                      {t('approval_success')}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                      {t('approval_redirecting')}
                    </p>
                    <motion.a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-sky text-navy font-bold rounded-xl hover:bg-sky/90 transition-all shadow-lg shadow-sky/30 min-h-[48px] min-w-[200px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir WhatsApp</span>
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {isMobile && (
              <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-t border-[var(--border-primary)] pb-safe px-4 py-3" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <div className="max-w-lg mx-auto flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      step === 1 ? 'bg-sky' : 'bg-[var(--border-primary)]'
                    }`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      step === 2 ? 'bg-sky' : 'bg-[var(--border-primary)]'
                    }`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}