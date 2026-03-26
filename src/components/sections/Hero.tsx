import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ANIMATION } from '../../lib/constants'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center px-6"
      style={{ minHeight: '100vh' }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: ANIMATION.ease, delay: 0.2 }}
      >
        <h1
          className="text-gradient font-bold mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
        >
          {t('personal.name')}
        </h1>
        <motion.p
          className="text-lg md:text-xl text-white/60 font-light tracking-wide max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: ANIMATION.ease, delay: 0.5 }}
        >
          {t('personal.title')}
        </motion.p>
        <motion.p
          className="text-sm text-white/40 mt-3 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: ANIMATION.ease, delay: 0.7 }}
        >
          {t('personal.location')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
