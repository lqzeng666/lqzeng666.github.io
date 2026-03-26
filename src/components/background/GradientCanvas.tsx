import { useEffect, useRef } from 'react'
import { GradientRenderer } from '../../lib/gradientRenderer'

export default function GradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GradientRenderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const renderer = new GradientRenderer(canvasRef.current)
    rendererRef.current = renderer

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      renderer.drawStatic()
    } else {
      renderer.start()
    }

    const handleResize = () => renderer.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      renderer.stop()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="gradient-canvas parallax-slow"
      aria-hidden="true"
    />
  )
}
