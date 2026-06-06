"use client"

import { useEffect, useRef, ReactNode } from "react"
interface GridBackgroundProps {
  children?: ReactNode
  minHeight?: number | string
}

export default function GridBackground({
  children,
  minHeight = 500,
}: GridBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    CELL: number
  ) => {
    ctx.fillStyle = "#0A0A0A"
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle ="rgba(255,255,255,0.06)";
    ctx.lineWidth = 0.5
    const cols = Math.ceil(W / CELL) + 2
    const rows = Math.ceil(H / CELL) + 2
    for (let col = 0; col <= cols; col++) {
      const x = col * CELL + 0.5
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
    }
    for (let row = 0; row <= rows; row++) {
      const y = row * CELL + 0.5
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }
  }

  useEffect(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    const gridCanvas = gridCanvasRef.current
    if (!wrap || !canvas || !gridCanvas) return

    const ctx = canvas.getContext("2d")!
    const gridCtx = gridCanvas.getContext("2d")!
    if (!ctx || !gridCtx) return

    const CELL = 90
    const GAP = 2

    let W = 0
    let H = 0
    let cols = 0
    let rows = 0
    let animationFrame = 0

    let userImage: HTMLImageElement | null = null
    let offscreen: HTMLCanvasElement | null = null

    // ── Mouse ──────────────────────────────────────────────
    const mouse = { x: -9999, y: -9999, inside: false }
    let cellMouseOpacity: Float32Array = new Float32Array(0)
    let cellTrail: Float32Array = new Float32Array(0)

    const RADIUS = CELL * 1.6
    const TRAIL_DECAY = 0.012
    const LERP_IN = 0.22
    const LERP_OUT = 0.05

    // ── Wave (diagonal top-left → bottom-right) ────────────
    // The wave front is measured along the diagonal axis: d = col + row
    // Total diagonal range goes from 0 to (cols + rows)
    const WAVE_SPEED = 0.018 // diagonal cells per frame
    const WAVE_WIDTH = 6 // ramp width in diagonal units
    const WAVE_TRAIL_RATIO = 0.55 // how far the glow trails behind (fraction of total diag)
    const GHOST_OFFSET = 4.5 // ghost pre-echo offset in diag units
    const NOISE_SCALE = 0.14
    const NOISE_TIME_SCALE = 0.00018

    let wavePos = 0 // current diagonal front position

    // ── Perlin noise ───────────────────────────────────────
    const perm = new Uint8Array(512)
    const grad2 = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ]
    for (let i = 0; i < 256; i++) perm[i] = i
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[perm[i], perm[j]] = [perm[j], perm[i]]
    }
    for (let i = 0; i < 256; i++) perm[256 + i] = perm[i]

    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }
    function lerp(a: number, b: number, t: number) {
      return a + t * (b - a)
    }

    function noise2(x: number, y: number) {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const xf = x - Math.floor(x)
      const yf = y - Math.floor(y)
      const u = fade(xf)
      const v = fade(yf)
      const g = (ix: number, iy: number) => {
        const g2 = grad2[perm[perm[X + ix] + Y + iy] % 8]
        return g2[0] * (xf - ix) + g2[1] * (yf - iy)
      }
      return lerp(lerp(g(0, 0), g(1, 0), u), lerp(g(0, 1), g(1, 1), u), v)
    }

    function fbm(x: number, y: number, octaves: number) {
      let value = 0,
        amp = 0.5,
        freq = 1
      for (let i = 0; i < octaves; i++) {
        value += amp * noise2(x * freq, y * freq)
        amp *= 0.5
        freq *= 2.1
      }
      return value
    }

    function getWaveOpacity(col: number, row: number, t: number): number {
      // diagonal coordinate — equal-weight col+row gives 45° direction
      const diag = col + row
      const nx = col * NOISE_SCALE
      const ny = row * NOISE_SCALE
      const nt = t * NOISE_TIME_SCALE

      const noiseVal = fbm(nx + nt * 0.4, ny + nt * 0.3, 4)
      const brightnessNoise = fbm(nx * 0.7 + nt * 0.15, ny * 0.7 + nt * 0.11, 3)

      const distFromFront = diag - wavePos + noiseVal * 4
      const rampWidth = WAVE_WIDTH + noiseVal * 1.5

      let base = 0
      if (distFromFront >= 0 && distFromFront < rampWidth) {
        base = Math.sin((distFromFront / rampWidth) * Math.PI)
      }

      const maxDiag = cols + rows
      const trail = Math.max(0, -distFromFront / (maxDiag * WAVE_TRAIL_RATIO))
      const trailGlow = trail * (0.12 + brightnessNoise * 0.09)

      const ghostFront =
        wavePos - GHOST_OFFSET + fbm(nx * 1.2 + nt * 0.2, ny * 1.2, 3) * 3
      const ghostDist = diag - ghostFront
      let ghost = 0
      if (ghostDist >= 0 && ghostDist < 2.5) {
        ghost = Math.sin((ghostDist / 2.5) * Math.PI) * 0.35
      }

      return Math.max(0, Math.min(1, base + trailGlow + ghost))
    }

    function getCursorOpacity(col: number, row: number): number {
      if (!mouse.inside) return 0
      const cx = col * CELL + CELL / 2
      const cy = row * CELL + CELL / 2
      const dx = cx - mouse.x
      const dy = cy - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= RADIUS) return 0
      const t = 1 - dist / RADIUS
      return t * t * (3 - 2 * t)
    }

    function bakeOffscreen() {
      // No longer needed since we're using solid color
    }

    function resize() {
      W = wrap.offsetWidth
      H = wrap.offsetHeight
      canvas.width = W
      canvas.height = H
      gridCanvas.width = W
      gridCanvas.height = H
      cols = Math.ceil(W / CELL) + 2
      rows = Math.ceil(H / CELL) + 2
      cellMouseOpacity = new Float32Array(cols * rows)
      cellTrail = new Float32Array(cols * rows)
      drawGrid(gridCtx, W, H, CELL)
      if (userImage) bakeOffscreen()
    }

    resize()

    function animate(ts: number) {
      ctx.clearRect(0, 0, W, H)

      // Advance wave diagonally; loop when it's fully past the grid
      wavePos += WAVE_SPEED
      const maxDiag = cols + rows
      if (wavePos > maxDiag * 1.15) wavePos = -WAVE_WIDTH * 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col

          // Wave contribution
          const waveOp = getWaveOpacity(col, row, ts)

          // Mouse + trail contribution
          const cursor = getCursorOpacity(col, row)
          if (cursor > cellTrail[idx]) {
            cellTrail[idx] = cursor
          } else {
            cellTrail[idx] = Math.max(0, cellTrail[idx] - TRAIL_DECAY)
          }
          const mouseTarget = Math.max(cursor, cellTrail[idx])
          const current = cellMouseOpacity[idx]
          const lerpFactor = mouseTarget > current ? LERP_IN : LERP_OUT
          cellMouseOpacity[idx] = current + (mouseTarget - current) * lerpFactor

          // Combine: take the max of both effects so neither drowns the other
          const op = Math.min(1, Math.max(waveOp, cellMouseOpacity[idx]))

          if (op < 0.005) continue

          const x = col * CELL
          const y = row * CELL
          const s = CELL - GAP

          // Draw solid color square with rgb(185, 233, 1)
          ctx.fillStyle = `rgba(252, 15, 73, ${Math.pow(op, 1.6)})`;
          ctx.fillRect(x, y, s, s)

          // Border
          const borderAlpha = Math.min(1, op * 1.4)
          ctx.strokeStyle = `rgba(252, 15, 73, ${borderAlpha * 0.8})`;
          ctx.lineWidth = 1
          ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate(0)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.inside = true
    }
    const handleMouseLeave = () => {
      mouse.inside = false
    }
    wrap.addEventListener("mousemove", handleMouseMove)
    wrap.addEventListener("mouseleave", handleMouseLeave)

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      wrap.removeEventListener("mousemove", handleMouseMove)
      wrap.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden bg-[#FFFFFF]"
      style={{ minHeight }}
    >
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
