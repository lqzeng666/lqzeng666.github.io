import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Section from '../layout/Section'
import GlassCard from '../ui/GlassCard'
import { ANIMATION } from '../../lib/constants'

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true }) as Array<{
    title: string
    description: string
    techStack: string[]
    github?: string
    demo?: string
  }>

  return (
    <Section id="projects" title={t('nav.projects')}>
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: ANIMATION.stagger } },
        }}
      >
        {Array.isArray(items) &&
          items.map((project, i) => (
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
              <GlassCard
                hover
                prismatic
                className="p-6 md:p-8 h-full flex flex-col"
                initial={false}
              >
                <h3 className="text-lg font-semibold text-white/90 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      GitHub &rarr;
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      Demo &rarr;
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
      </motion.div>
    </Section>
  )
}
