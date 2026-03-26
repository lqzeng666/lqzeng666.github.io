import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import GlassCard from '../ui/GlassCard'

export default function Contact() {
  const { t } = useTranslation()
  const links = t('contact.links', { returnObjects: true }) as Array<{
    label: string
    value: string
    href: string
    icon: string
  }>

  return (
    <Section id="contact" title={t('nav.contact')}>
      <GlassCard prismatic className="p-8 md:p-10">
        <p className="text-white/60 mb-8 text-base">
          {t('contact.message')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(links) &&
            links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group"
              >
                <span className="text-xl">{link.icon}</span>
                <div>
                  <p className="text-xs text-white/40">{link.label}</p>
                  <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </GlassCard>
    </Section>
  )
}
