'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_NUMBER = '41798955348'
const TRACKING_CODE = '#FVAPROVAÇÃO'

type Step = 'welcome' | 'questions' | 'error' | 'success'

interface Answers {
  permit: boolean | null
  birthDate: string
  residence: boolean | null
}

export default function ApprovalPopup() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('welcome')
  const [answers, setAnswers] = useState<Answers>({
    permit: null,
    birthDate: '',
    residence: null,
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousOverflow = useRef<string>('')

  const questions = [
    { key: 'permit', label: t('approval_q1'), type: 'boolean' as const },
    { key: 'birthDate', label: t('approval_q2'), type: 'date' as const },
    { key: 'residence', label: t('approval_q3'), type: 'boolean' as const },
  ]

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
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleAnswer = (key: keyof Answers, value: boolean | string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const validateAnswers = (answersToCheck: Answers) => {
    if (!answersToCheck.permit) {
      setErrorMessage(t('approval_error_permit'))
      setStep('error')
      return false
    }

    if (answersToCheck.birthDate) {
      const birth = new Date(answersToCheck.birthDate + 'T00:00:00')
      const today = new Date()
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      if (age < 18) {
        setErrorMessage(t('approval_error_age'))
        setStep('error')
        return false
      }
    }

    if (!answersToCheck.residence) {
      setErrorMessage(t('approval_error_residence'))
      setStep('error')
      return false
    }

    return true
  }

  const validateAndProceed = () => {
    if (validateAnswers(answers)) {
      setStep('success')
      setTimeout(() => {
        openWhatsApp(answers)
      }, 1500)
    }
  }

  const openWhatsApp = (finalAnswers: Answers) => {
    const formatDate = (dateStr: string) => {
      const parts = dateStr.split('-')
      return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateStr
    }
    
    const message = `Olá Fint Viagens, gostaria de fazer a aprovação.

*Pré-aprovação Fint Viagens*
Permissão B/C > 1 ano: ${finalAnswers.permit ? 'Sim' : 'Não'}
Reside na Suíça: ${finalAnswers.residence ? 'Sim' : 'Não'}
Data de nascimento: ${finalAnswers.birthDate ? formatDate(finalAnswers.birthDate) : 'Não informada'}

${TRACKING_CODE}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      validateAndProceed()
    }
  }

  const handleBooleanAnswer = (value: boolean) => {
    const key = questions[currentQuestion].key as keyof Answers
    const newAnswers = { ...answers, [key]: value }
    setAnswers(newAnswers)
    if (currentQuestion === questions.length - 1) {
      if (validateAnswers(newAnswers)) {
        setStep('success')
        setTimeout(() => {
          openWhatsApp(newAnswers)
        }, 1500)
      }
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAnswer('birthDate', e.target.value)
  }

  const resetFlow = () => {
    setStep('welcome')
    setCurrentQuestion(0)
    setAnswers({ permit: null, birthDate: '', residence: null })
    setErrorMessage('')
  }

  const handleBackdropClick = () => {
    if (isMobile) return
    setIsOpen(false)
  }

  if (!isOpen && step === 'welcome') return null

  const containerClassName = isMobile
    ? "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-2xl border-t border-[var(--border-primary)]"
    : "fixed bottom-6 right-6 z-50 max-w-md w-full mx-4 rounded-2xl"

  const animationVariants = isMobile
    ? { initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: '100%' } }
    : { initial: { opacity: 0, y: 50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 50, scale: 0.9 } }

  const transition = isMobile
    ? { type: 'spring', damping: 25, stiffness: 200 }
    : { type: 'spring', damping: 25, stiffness: 300 }

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
            aria-labelledby="approval-title"
            style={{ maxHeight: isMobile ? 'calc(100vh - env(safe-area-inset-bottom))' : 'auto' }}
          >
            <motion.div
              ref={contentRef}
              className="glass-strong shadow-2xl overflow-hidden border border-[var(--border-primary)] flex flex-col"
              style={{ maxHeight: isMobile ? 'calc(100vh - env(safe-area-inset-bottom))' : 'auto' }}
            >
              <AnimatePresence mode="wait">
                {step === 'welcome' && (
                  <motion.div
                    key="welcome"
                    className="p-6 sm:p-6 flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 id="approval-title" className="text-xl font-bold text-[var(--text-primary)] mb-1">
                          {t('approval_popup_title')}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {t('approval_popup_subtitle')}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Fechar"
                      >
                        <XCircle className="w-6 h-6" />
                      </motion.button>
                    </div>

                    <motion.button
                      onClick={() => setStep('questions')}
                      className="group w-full flex items-center justify-center gap-3 px-6 py-5 bg-sky text-navy font-bold text-lg rounded-xl hover:bg-sky/90 transition-all shadow-lg shadow-sky/30 min-h-[48px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{t('approval_continue')}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}

                {step === 'questions' && (
                  <motion.div
                    key="questions"
                    className="p-6 sm:p-6 flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="w-8 h-8 rounded-full bg-sky/20 text-sky flex items-center justify-center font-bold text-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          {currentQuestion + 1}
                        </motion.span>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                          {questions[currentQuestion].label}
                        </h3>
                      </div>
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Fechar"
                      >
                        <XCircle className="w-6 h-6" />
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      {questions[currentQuestion].type === 'boolean' && (
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            onClick={() => handleBooleanAnswer(true)}
                            className={`flex flex-col items-center gap-2 px-4 py-6 rounded-xl border-2 transition-all min-h-[56px] ${
                              answers[questions[currentQuestion].key as keyof Answers] === true
                                ? 'border-sky bg-sky/20 text-sky'
                                : 'border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-sky/50 hover:bg-sky/5 active:scale-[0.98]'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <CheckCircle2 className="w-8 h-8" />
                            <span className="font-semibold text-base">{t('approval_yes')}</span>
                          </motion.button>
                          <motion.button
                            onClick={() => handleBooleanAnswer(false)}
                            className={`flex flex-col items-center gap-2 px-4 py-6 rounded-xl border-2 transition-all min-h-[56px] ${
                              answers[questions[currentQuestion].key as keyof Answers] === false
                                ? 'border-red/50 bg-red/20 text-red'
                                : 'border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-red/50 hover:bg-red/5 active:scale-[0.98]'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <XCircle className="w-8 h-8" />
                            <span className="font-semibold text-base">{t('approval_no')}</span>
                          </motion.button>
                        </div>
                      )}

                      {questions[currentQuestion].type === 'date' && (
                        <div>
                          <label htmlFor="birthDate" className="block text-sm font-medium text-[var(--text-primary)]/80 mb-2">
                            {t('approval_q2')}
                          </label>
                          <input
                            type="date"
                            id="birthDate"
                            value={answers.birthDate}
                            onChange={handleDateChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 transition-all text-base min-h-[48px]"
                            inputMode="numeric"
                          />
                        </div>
                      )}

                      <motion.button
                        onClick={nextQuestion}
                        disabled={
                          questions[currentQuestion].type === 'boolean'
                            ? answers[questions[currentQuestion].key as keyof Answers] === null
                            : !answers.birthDate
                        }
                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all min-h-[48px] ${
                          (questions[currentQuestion].type === 'boolean'
                            ? answers[questions[currentQuestion].key as keyof Answers] !== null
                            : answers.birthDate)
                            ? 'bg-sky text-navy hover:bg-sky/90 shadow-lg shadow-sky/30 active:scale-[0.98]'
                            : 'bg-[var(--border-primary)] text-[var(--text-secondary)] cursor-not-allowed'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {currentQuestion === questions.length - 1
                          ? t('approval_continue')
                          : `${t('approval_continue')} →`}
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[var(--text-secondary)]">
                      {questions.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index < currentQuestion
                              ? 'bg-sky'
                              : index === currentQuestion
                              ? 'bg-sky animate-pulse'
                              : 'bg-[var(--border-primary)]'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 'error' && (
                  <motion.div
                    key="error"
                    className="p-6 sm:p-6 text-center flex-1 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="w-16 h-16 text-red mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-red mb-2">
                      Não foi possível prosseguir
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">{errorMessage}</p>
                    <motion.button
                      onClick={resetFlow}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold rounded-xl hover:bg-[var(--border-primary)] transition-colors min-h-[48px]"
                      whileTap={{ scale: 0.98 }}
                    >
                      Tentar novamente
                    </motion.button>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="w-full mt-3 px-6 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors min-h-[48px]"
                      whileTap={{ scale: 0.98 }}
                    >
                      Fechar
                    </motion.button>
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
                <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index < currentQuestion
                          ? 'bg-sky'
                          : index === currentQuestion && step === 'questions'
                          ? 'bg-sky animate-pulse'
                          : 'bg-[var(--border-primary)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}