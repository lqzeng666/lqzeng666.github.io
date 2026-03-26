import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Section from '../layout/Section'
import GlassCard from '../ui/GlassCard'
import { ANIMATION } from '../../lib/constants'

export default function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.items', { returnObjects: true }) as Array<{
    company: string
    role: string
    period: string
    location: string
    highlights: string[]
  }>

  return (
    <Section id="experience" title={t('nav.experience')}>
      <div className="relative pl-8">
        <div className="timeline-line" />

        <motion.div
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: ANIMATION.stagger } },
          }}
        >
          {Array.isArray(jobs) &&
            jobs.map((job, i) => (
              <motion.div
                key={i}
                className="relative"
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
                <div className="absolute -left-8 top-6 timeline-dot" />
                <GlassCard
                  hover
                  className="p-6 md:p-8"
                  initial={false}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white/90">
                        {job.role}
                      </h3>
                      <p className="text-white/50 text-sm">{job.company}</p>
                    </div>
                    <div className="text-sm text-white/40 md:text-right shrink-0">
                      <p>{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {job.highlights.map((h: string, j: number) => (
                      <li
                        key={j}
                        className="text-sm text-white/60 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </Section>
  )
}
