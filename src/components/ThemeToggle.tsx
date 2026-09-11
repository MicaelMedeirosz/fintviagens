'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:glass-strong"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: [1, 0.8, 1] }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-5 h-5"
      >
        <Sun className="absolute inset-0 w-5 h-5 text-sky transition-all duration-300" 
             style={{ opacity: theme === 'light' ? 1 : 0 }} />
        <Moon className="absolute inset-0 w-5 h-5 text-white transition-all duration-300" 
              style={{ opacity: theme === 'dark' ? 1 : 0 }} />
      </motion.div>
    </motion.button>
  )
}