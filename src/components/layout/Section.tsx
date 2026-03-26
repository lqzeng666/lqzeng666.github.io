import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ANIMATION } from '../../lib/constants'

interface SectionProps {
  id: string
  title?: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

export default function Section({
  id,
  title,
  children,
  className = '',
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28">
        {title && (
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-white/90 mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: ANIMATION.duration,
              ease: ANIMATION.ease,
            }}
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  )
}
