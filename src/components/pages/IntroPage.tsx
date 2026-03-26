import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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

/* ===== Typing search-bar — loops forever ===== */
function TypingSummary({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let i = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!deleting) {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          timeout = setTimeout(() => { deleting = true; tick() }, 2000)
          return
        }
        timeout = setTimeout(tick, 50)
      } else {
        i--
        setDisplayed(text.slice(0, i))
        if (i <= 0) {
          deleting = false
          timeout = setTimeout(tick, 500)
          return
        }
        timeout = setTimeout(tick, 25)
      }
    }

    tick()
    return () => clearTimeout(timeout)
  }, [text])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <div className="typing-bar">
      <span className="typing-bar-icon">⌘</span>
      <span className="typing-bar-text">
        {displayed}
        <span className="typing-bar-cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
      </span>
    </div>
  )
}

interface IntroPageProps {
  onNextPage?: () => void
}

export default function IntroPage({ onNextPage }: IntroPageProps) {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language?.startsWith('zh')

  const jobs = t('experience.items', { returnObjects: true }) as Array<{
    company: string; role: string; period: string; periodShort: string; highlights: string[]
  }>
  const edus = t('education.items', { returnObjects: true }) as Array<{
    school: string; degree: string; period: string; periodShort: string
  }>
  const infoItems = t('personal.infoItems', { returnObjects: true }) as Array<{
    label: string; value: string; icon: string
  }>
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 md:px-10"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* ===== Hero: fills first screen ===== */}
      <motion.section
        className="flex flex-col md:flex-row items-center md:items-start"
        style={{ minHeight: 'calc(100vh - 5rem)', paddingTop: '1.5rem' }}
        variants={item}
      >
        {/* Left: Name + Bio + Summary + Info */}
        <div className="flex-1 flex flex-col justify-center items-center md:pr-6 py-6">
          {/* Name — centered in left column */}
          <h1
            className="text-gradient font-bold mb-4 text-center"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.08 }}
          >
            {isZh ? t('personal.nameCn') : t('personal.nameEn')}
          </h1>
          <p className="text-base md:text-lg text-white/35 font-light tracking-wide mb-8 text-center">
            {t('personal.title')}
          </p>

          {/* Typing summary — taller */}
          <div className="mb-8 w-full max-w-xl">
            <TypingSummary text={t('personal.summary')} />
          </div>

          {/* Bio paragraph — larger text, more spacing */}
          <p className="text-base text-white/40 leading-loose mb-10 max-w-xl text-center">
            {t('personal.bio')}
          </p>

          {/* Contact info — larger, more spacing */}
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {Array.isArray(infoItems) &&
              infoItems.map((info, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-sm text-white/45">
                  <span className="text-purple-400/40 text-xs">{info.icon}</span>
                  <span className="text-white/55">{info.value}</span>
                </span>
              ))}
          </div>
        </div>

        {/* Right: Avatar — top aligned, ~1/2 width, edge-blended */}
        <div className="shrink-0 order-first md:order-last w-[60%] md:w-[48%] max-w-[480px] flex items-start">
          <div className="avatar-container w-full aspect-square overflow-hidden">
            <img src="/avatar.png" alt="Vera Zeng" className="w-full h-full object-contain" />
          </div>
        </div>
      </motion.section>

      {/* ===== Timeline Section ===== */}
      <motion.section className="mb-12 -mt-16 md:-mt-24" variants={item}>
        <h2 className="text-xl md:text-2xl font-semibold text-white/80 text-center mb-10">
          {t('sections.timeline')}
        </h2>

        <div className="grid md:grid-cols-2 gap-0 relative">

          {/* ---- Left: Education — timeline on RIGHT side ---- */}
          <div className="relative py-6 md:pr-10 overflow-hidden">
            {/* Watermark at bottom */}
            <div className="watermark-bottom" aria-hidden="true">
              {t('sections.education')}
            </div>

            <div className="relative pr-7">
              {/* Timeline line on right */}
              <div className="timeline-line" style={{ left: 'auto', right: '5px' }} />
              <div className="flex flex-col gap-5">
                {Array.isArray(edus) &&
                  edus.map((edu, i) => (
                    <div key={i} className="relative">
                      {/* Time label */}
                      <div className="absolute -right-[4.2rem] top-4 text-[0.65rem] text-purple-300/40 font-mono w-10 text-center">
                        {edu.periodShort}
                      </div>
                      {/* Dot on right */}
                      <div
                        className="absolute -right-7 top-5 timeline-dot"
                        style={{
                          width: '12px', height: '12px',
                          background: 'rgba(192, 132, 252, 0.5)',
                          boxShadow: '0 0 12px rgba(192, 132, 252, 0.35)',
                        }}
                      />
                      <GlassCard hover className="p-5 md:p-6">
                        <h4 className="text-base font-semibold text-white/90">{edu.school}</h4>
                        <p className="text-sm text-purple-300/50 mt-1">{edu.degree}</p>
                        <p className="text-xs text-white/30 mt-2">{edu.period}</p>
                      </GlassCard>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ---- Right: Work Experience — timeline on LEFT ---- */}
          <div className="relative py-6 md:pl-10 overflow-hidden">
            {/* Watermark at bottom */}
            <div className="watermark-bottom" aria-hidden="true">
              {t('sections.experience')}
            </div>

            <div className="relative pl-7">
              <div className="timeline-line" style={{ left: '5px' }} />
              <div className="flex flex-col gap-5">
                {Array.isArray(jobs) &&
                  jobs.map((job, i) => (
                    <div key={i} className="relative">
                      {/* Time label */}
                      <div className="absolute -left-[4.2rem] top-4 text-[0.65rem] text-purple-300/40 font-mono w-10 text-center">
                        {job.periodShort}
                      </div>
                      <div className="absolute -left-7 top-5 timeline-dot" style={{ width: '12px', height: '12px' }} />
                      <GlassCard hover className="p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <div>
                            <h4 className="text-base font-semibold text-white/90">{job.role}</h4>
                            <p className="text-sm text-purple-300/50 mt-0.5">{job.company}</p>
                          </div>
                          <p className="text-xs text-white/30 shrink-0 sm:mt-1">{job.period}</p>
                        </div>
                        <ul className="space-y-2 mt-3">
                          {job.highlights.map((h: string, j: number) => (
                            <li
                              key={j}
                              className="text-sm text-white/45 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-400/20"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== Next page button ===== */}
      <motion.div className="text-center py-16" variants={item}>
        <button
          onClick={onNextPage}
          className="next-page-btn"
        >
          {t('personal.nextPage')}
        </button>
      </motion.div>
    </motion.div>
  )
}
