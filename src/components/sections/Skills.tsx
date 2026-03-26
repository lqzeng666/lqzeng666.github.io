import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Section from '../layout/Section'
import { ANIMATION } from '../../lib/constants'

export default function Skills() {
  const { t } = useTranslation()
  const groups = t('skills.groups', { returnObjects: true }) as Array<{
    category: string
    items: string[]
  }>

  return (
    <Section id="skills" title={t('nav.skills')}>
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {Array.isArray(groups) &&
          groups.map((group, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
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
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, j) => (
                  <span key={j} className="skill-badge">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
      </motion.div>
    </Section>
  )
}
