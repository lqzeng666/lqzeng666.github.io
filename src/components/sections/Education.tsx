import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Section from '../layout/Section'
import GlassCard from '../ui/GlassCard'
import { ANIMATION } from '../../lib/constants'

export default function Education() {
  const { t } = useTranslation()
  const items = t('education.items', { returnObjects: true }) as Array<{
    school: string
    degree: string
    period: string
    details?: string[]
  }>

  return (
    <Section id="education" title={t('nav.education')}>
      <motion.div
        className="grid gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: ANIMATION.stagger } },
        }}
      >
        {Array.isArray(items) &&
          items.map((edu, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: ANIMATION.duration,
                    ease: ANIMATION.ease,
                  },
                },
              }}
            >
              <GlassCard hover className="p-6 md:p-8" initial={false}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90">
                      {edu.degree}
                    </h3>
                    <p className="text-white/50 text-sm">{edu.school}</p>
                  </div>
                  <p className="text-sm text-white/40 shrink-0">{edu.period}</p>
                </div>
                {edu.details && edu.details.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {edu.details.map((d, j) => (
                      <li
                        key={j}
                        className="text-sm text-white/60 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </motion.div>
          ))}
      </motion.div>
    </Section>
  )
}
