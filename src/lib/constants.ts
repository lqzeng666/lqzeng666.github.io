export const TABS = ['intro', 'projects', 'library'] as const
export type TabId = (typeof TABS)[number]

export const COLORS = {
  bg: '#08060e',
  blobs: [
    'rgba(147, 51, 234, 0.5)',   // purple-600
    'rgba(126, 34, 206, 0.45)',  // purple-700
    'rgba(192, 132, 252, 0.3)',  // purple-400
    'rgba(88, 28, 135, 0.5)',    // purple-900
    'rgba(168, 85, 247, 0.35)',  // purple-500
  ],
}

export const ANIMATION = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: 0.6,
  stagger: 0.08,
}
