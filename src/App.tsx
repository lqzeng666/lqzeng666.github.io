import { useState, useCallback } from 'react'
import GradientCanvas from './components/background/GradientCanvas'
import GrainOverlay from './components/background/GrainOverlay'
import Header from './components/layout/Header'
import IntroPage from './components/pages/IntroPage'
import ProjectsPage from './components/pages/ProjectsPage'
import LibraryPage from './components/pages/LibraryPage'
import { TABS, type TabId } from './lib/constants'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('intro')

  const goToTab = useCallback((tab: TabId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActiveTab(tab), 300)
  }, [])

  const goNext = useCallback((current: TabId) => {
    const idx = TABS.indexOf(current)
    if (idx < TABS.length - 1) goToTab(TABS[idx + 1])
  }, [goToTab])

  return (
    <>
      <GradientCanvas />
      <GrainOverlay />
      <Header activeTab={activeTab} onTabChange={goToTab} />
      <main className="relative z-10 pt-20">
        {activeTab === 'intro' && (
          <IntroPage onNextPage={() => goNext('intro')} />
        )}
        {activeTab === 'projects' && (
          <ProjectsPage onNextPage={() => goNext('projects')} />
        )}
        {activeTab === 'library' && <LibraryPage />}
      </main>
    </>
  )
}
