import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { ANIMATION } from '../../lib/constants'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.duration, ease: ANIMATION.ease },
  },
}

interface LibrarySection {
  title: string
  items: Array<{
    name: string
    description?: string
    link?: string
    tag?: string
  }>
}

export default function LibraryPage() {
  const { t } = useTranslation()
  const sections = t('library.sections', { returnObjects: true }) as LibrarySection[]

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 md:px-8 py-12"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div className="mb-12" variants={item}>
        <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
          {t('tabs.library')}
        </h1>
        <p className="text-white/40 text-sm">{t('library.subtitle')}</p>
      </motion.div>

      <div className="space-y-12">
        {Array.isArray(sections) &&
          sections.map((section, i) => (
            <motion.section key={i} variants={item}>
              <p className="section-label mb-4">{section.title}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((entry, j) => (
                  <GlassCard key={j} hover className="p-5 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-white/85">{entry.name}</h3>
                      {entry.tag && (
                        <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300/70 border border-purple-500/15 shrink-0 ml-2">
                          {entry.tag}
                        </span>
                      )}
                    </div>
                    {entry.description && (
                      <p className="text-xs text-white/40 leading-relaxed mb-3">
                        {entry.description}
                      </p>
                    )}
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-300/50 hover:text-purple-300/80 transition-colors"
                      >
                        {t('library.viewLink')} &rarr;
                      </a>
                    )}
                  </GlassCard>
                ))}
              </div>
            </motion.section>
          ))}
      </div>
    </motion.div>
  )
}
