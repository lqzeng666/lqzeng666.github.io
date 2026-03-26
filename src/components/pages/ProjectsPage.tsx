import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { ANIMATION } from '../../lib/constants'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.duration, ease: ANIMATION.ease },
  },
}

interface ProjectsPageProps {
  onNextPage?: () => void
}

export default function ProjectsPage({ onNextPage }: ProjectsPageProps) {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as Array<{
    title: string
    description: string
    techStack: string[]
    link?: string
    status?: string
  }>

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 md:px-8 py-12"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div className="mb-12" variants={item}>
        <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
          {t('tabs.projects')}
        </h1>
        <p className="text-white/40 text-sm">{t('projects.subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.isArray(projects) &&
          projects.map((project, i) => (
            <motion.div key={i} variants={item}>
              <GlassCard hover prismatic className="p-7 md:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white/90">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300/80 border border-purple-500/20 shrink-0 ml-3">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/45 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-300/60 hover:text-purple-300/90 transition-colors"
                  >
                    {t('projects.viewProject')} &rarr;
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
      </div>

      {/* Next page button */}
      <motion.div className="text-center py-16" variants={item}>
        <button onClick={onNextPage} className="next-page-btn">
          {t('projects.nextPage')}
        </button>
      </motion.div>
    </motion.div>
  )
}
