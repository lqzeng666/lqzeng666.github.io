import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isEn = i18n.language?.startsWith('en')

  const toggle = () => {
    i18n.changeLanguage(isEn ? 'zh' : 'en')
  }

  return (
    <button
      onClick={toggle}
      className="text-sm text-white/60 hover:text-white/90 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-white/5"
      aria-label="Switch language"
    >
      {isEn ? '中文' : 'EN'}
    </button>
  )
}
