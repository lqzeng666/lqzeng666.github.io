import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  hover?: boolean
  prismatic?: boolean
  intensity?: 'light' | 'medium' | 'heavy'
  className?: string
}

export default function GlassCard({
  children,
  hover = false,
  prismatic = false,
  intensity = 'medium',
  className = '',
}: GlassCardProps) {
  const intensityClass =
    intensity === 'light'
      ? 'glass-light'
      : intensity === 'heavy'
        ? 'glass-heavy'
        : ''

  return (
    <div
      className={`glass ${intensityClass} ${prismatic ? 'glass-prismatic' : ''} ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
