'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, User, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_NUMBER = '41798955348'
const TRACKING_CODE = '#FINT-SITE'

export default function CTA() {
  const { t } = useLanguage()
  const [tipoViagem, setTipoViagem] = useState('Somente Ida')
  const [criancas, setCriancas] = useState('0')
  const [criancasData, setCriancasData] = useState<string[]>([])

  const numCriancas = parseInt(criancas) || 0

  if (criancasData.length !== numCriancas) {
    setCriancasData(Array(numCriancas).fill(''))
  }

  const handleCriancasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setCriancas(newValue)
    const newNum = parseInt(newValue) || 0
    setCriancasData(prev => {
      if (newNum > prev.length) {
        return [...prev, ...Array(newNum - prev.length).fill('')]
      } else {
        return prev.slice(0, newNum)
      }
    })
  }

  const handleChildBirthChange = (index: number, value: string) => {
    setCriancasData(prev => {
      const newArr = [...prev]
      newArr[index] = value
      return newArr
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const nome = formData.get('nome') as string
    const email = formData.get('email') as string
    const telefone = formData.get('telefone') as string
    const tipoViagemVal = formData.get('tipoViagem') as string
    const origem = formData.get('origem') as string
    const destino = formData.get('destino') as string
    const dataIda = formData.get('dataIda') as string
    const dataVolta = formData.get('dataVolta') as string
    const adultos = formData.get('adultos') as string
    const criancasVal = formData.get('criancas') as string
    const observacoes = formData.get('observacoes') as string

    let message = `${t('wa_intro')}

*${t('wa_section_personal')}*
${t('wa_field_name')}: ${nome}
${t('wa_field_email')}: ${email}
${t('wa_field_phone')}: ${telefone}

*${t('wa_section_trip')}*
${t('wa_field_type')}: ${tipoViagemVal}
${t('wa_field_origin')}: ${origem}
${t('wa_field_dest')}: ${destino}
${t('wa_field_depart')}: ${dataIda}
${tipoViagemVal === 'Ida e Volta' && dataVolta ? `${t('wa_field_return')}: ${dataVolta}` : ''}

*${t('wa_section_passengers')}* 
${t('wa_field_adults')}: ${adultos}
${t('wa_field_children')}: ${criancasVal}`

    if (numCriancas > 0) {
      message += `\n\n*${t('wa_section_children')}*`
      criancasData.forEach((data, index) => {
        if (data) {
          message += `\n${t('wa_child_n')} ${index + 1}: ${data}`
        }
      })
    }

    message += `\n\n*${t('wa_section_notes')}* 
${observacoes || t('wa_none')}

${TRACKING_CODE}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const inputStyle = "w-full px-4 py-3 bg-bg-dark/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20 transition-all"
  const labelStyle = "block text-sm font-medium text-white/80 mb-2"

  const tripTypes = [
    { value: 'Somente Ida', label: t('cta_trip_oneway') },
    { value: 'Ida e Volta', label: t('cta_trip_roundtrip') },
    { value: 'Multitrechos', label: t('cta_trip_multicity') },
  ]

  return (
    <section id="cotar" className="py-28 md:py-32 relative overflow-hidden">
      <div id="contato" className="absolute -top-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-transparent to-navy/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t('cta_title_1')} <span className="text-sky">{t('cta_title_2')}</span>
            <br />
            <span className="text-sky">{t('cta_title_3')}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('cta_subtitle')}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sky/20 text-sky font-bold">1</span>
              <h3 className="text-xl font-bold">{t('cta_step_1')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className={labelStyle}>{t('cta_name')}</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  placeholder={t('cta_name_ph')}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelStyle}>{t('cta_email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t('cta_email_ph')}
                  className={inputStyle}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="telefone" className={labelStyle}>{t('cta_phone')}</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                placeholder={t('cta_phone_ph')}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sky/20 text-sky font-bold">2</span>
              <h3 className="text-xl font-bold">{t('cta_step_2')}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="tipoViagem" className={labelStyle}>{t('cta_type')}</label>
                <select
                  id="tipoViagem"
                  name="tipoViagem"
                  required
                  defaultValue="Somente Ida"
                  value={tipoViagem}
                  onChange={(e) => setTipoViagem(e.target.value)}
                  className={inputStyle}
                >
                  {tripTypes.map((trip) => (
                    <option key={trip.value} value={trip.value}>
                      {trip.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="origem" className={labelStyle}>{t('cta_origin')}</label>
                  <input
                    type="text"
                    id="origem"
                    name="origem"
                    required
                    placeholder={t('cta_origin_ph')}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="destino" className={labelStyle}>{t('cta_dest')}</label>
                  <input
                    type="text"
                    id="destino"
                    name="destino"
                    required
                    placeholder={t('cta_dest_ph')}
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dataIda" className={labelStyle}>{t('cta_date_depart')}</label>
                  <input
                    type="date"
                    id="dataIda"
                    name="dataIda"
                    required
                    className={inputStyle}
                  />
                </div>
                {tipoViagem === 'Ida e Volta' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div>
                      <label htmlFor="dataVolta" className={labelStyle}>{t('cta_date_return')}</label>
                      <input
                        type="date"
                        id="dataVolta"
                        name="dataVolta"
                        required
                        className={inputStyle}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sky/20 text-sky font-bold">3</span>
              <h3 className="text-xl font-bold">{t('cta_step_3')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adultos" className={labelStyle}>{t('cta_adults')}</label>
                <select
                  id="adultos"
                  name="adultos"
                  required
                  defaultValue="1"
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
                  name="criancas"
                  required
                  defaultValue="0"
                  value={criancas}
                  onChange={handleCriancasChange}
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

            <AnimatePresence>
              {numCriancas > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                  className="mt-6 p-6 glass rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-sky" />
                    <h4 className="text-lg font-semibold">{t('cta_children_dates')}</h4>
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
                          value={criancasData[index] || ''}
                          onChange={(e) => handleChildBirthChange(index, e.target.value)}
                          className={inputStyle}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4">
              <label htmlFor="observacoes" className={labelStyle}>{t('cta_observations')}</label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                placeholder={t('cta_observations_ph')}
                className={inputStyle}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-sky text-navy font-bold text-lg rounded-full hover:bg-sky/90 transition-all shadow-xl shadow-sky/30"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('cta_submit')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-center text-white/50 text-xs">
            {t('cta_privacy')}
          </p>
        </motion.form>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/50 text-sm">
            {t('cta_phone_hint')} <a href="tel:+41 079 391 98 28" className="text-sky hover:underline font-medium">+41 079 391 98 28</a> • 
            Seg-Sex 08:00-20:00 • Sáb 09:00-16:00
          </p>
        </motion.div>
      </div>
    </section>
  )
}