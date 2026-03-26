interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  baseX: number
  baseY: number
}

const BLOB_CONFIGS = [
  { color: 'rgba(147, 51, 234, 0.5)', radius: 300 },
  { color: 'rgba(126, 34, 206, 0.45)', radius: 260 },
  { color: 'rgba(192, 132, 252, 0.25)', radius: 280 },
  { color: 'rgba(88, 28, 135, 0.5)', radius: 320 },
  { color: 'rgba(168, 85, 247, 0.35)', radius: 240 },
]

export class GradientRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private blobs: Blob[] = []
  private animationId: number | null = null
  private scale = 0.25
  private mouseX = 0
  private mouseY = 0
  private mouseActive = false
  private ripples: Array<{ x: number; y: number; radius: number; opacity: number; maxRadius: number }> = []

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.resize()
    this.initBlobs()
    this.setupMouseListeners()
  }

  private initBlobs() {
    const w = this.canvas.width
    const h = this.canvas.height
    this.blobs = BLOB_CONFIGS.map((config) => {
      const x = Math.random() * w
      const y = Math.random() * h
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        radius: config.radius * this.scale,
        color: config.color,
      }
    })
  }

  private setupMouseListeners() {
    const onMove = (e: MouseEvent) => {
      this.mouseX = e.clientX * this.scale
      this.mouseY = e.clientY * this.scale
      this.mouseActive = true
    }
    const onLeave = () => {
      this.mouseActive = false
    }
    const onClick = (e: MouseEvent) => {
      this.ripples.push({
        x: e.clientX * this.scale,
        y: e.clientY * this.scale,
        radius: 0,
        opacity: 0.6,
        maxRadius: 200 * this.scale,
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClick)

    this._cleanup = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
    }
  }

  private _cleanup: (() => void) | null = null

  resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.canvas.width = Math.floor(w * this.scale)
    this.canvas.height = Math.floor(h * this.scale)
  }

  private update() {
    const w = this.canvas.width
    const h = this.canvas.height

    this.blobs.forEach((blob) => {
      // Base drift movement
      blob.baseX += blob.vx
      blob.baseY += blob.vy

      // Soft bounce
      if (blob.baseX < -blob.radius * 0.3 || blob.baseX > w + blob.radius * 0.3) {
        blob.vx *= -1
      }
      if (blob.baseY < -blob.radius * 0.3 || blob.baseY > h + blob.radius * 0.3) {
        blob.vy *= -1
      }

      // Mouse attraction: blobs gently drift toward cursor
      if (this.mouseActive) {
        const dx = this.mouseX - blob.baseX
        const dy = this.mouseY - blob.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / (300 * this.scale))
        blob.x = blob.baseX + dx * influence * 0.3
        blob.y = blob.baseY + dy * influence * 0.3
      } else {
        blob.x += (blob.baseX - blob.x) * 0.05
        blob.y += (blob.baseY - blob.y) * 0.05
      }
    })

    // Update ripples
    this.ripples = this.ripples.filter((r) => {
      r.radius += 2 * this.scale
      r.opacity *= 0.96
      return r.opacity > 0.01
    })
  }

  private draw() {
    const { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'lighter'

    // Draw blobs
    this.blobs.forEach((blob) => {
      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius
      )
      gradient.addColorStop(0, blob.color)
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    })

    // Draw ripples
    this.ripples.forEach((r) => {
      const gradient = ctx.createRadialGradient(
        r.x, r.y, r.radius * 0.8,
        r.x, r.y, r.radius
      )
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(0.5, `rgba(192, 132, 252, ${r.opacity * 0.3})`)
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    })
  }

  start() {
    const loop = () => {
      if (document.hidden) {
        this.animationId = requestAnimationFrame(loop)
        return
      }
      this.update()
      this.draw()
      this.animationId = requestAnimationFrame(loop)
    }
    loop()
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this._cleanup?.()
  }

  drawStatic() {
    this.draw()
  }
}
