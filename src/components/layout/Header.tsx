import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import type { TabId } from '../../lib/constants'

interface HeaderProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'intro', label: 'tabs.intro' },
  { id: 'projects', label: 'tabs.projects' },
  { id: 'library', label: 'tabs.library' },
]

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 header-glass"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Name */}
        <button
          onClick={() => onTabChange('intro')}
          className="text-base font-semibold text-white/80 hover:text-white transition-colors tracking-wide"
        >
          {t('personal.name')}
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`tab-button ${activeTab === id ? 'active' : ''}`}
            >
              {t(label)}
            </button>
          ))}
        </div>

        {/* Language */}
        <LanguageSwitcher />
      </nav>
    </motion.header>
  )
}
