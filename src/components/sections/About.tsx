import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import GlassCard from '../ui/GlassCard'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" title={t('nav.about')}>
      <GlassCard prismatic className="p-8 md:p-10">
        <p className="text-base md:text-lg text-white/70 leading-relaxed whitespace-pre-line">
          {t('about.description')}
        </p>
      </GlassCard>
    </Section>
  )
}
