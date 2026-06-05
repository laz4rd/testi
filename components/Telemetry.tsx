"use client";
import { useEffect, useRef } from "react";

const GRID_COLS = 10;
const GRID_ROWS = 7;
const ACCENT = (a: number) => `rgba(255,255,255,${a})`;
const GHOST = (a: number) => `rgba(255,255,255,${a})`;

function easeInOut(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

type Node = { x: number; y: number; c: number; r: number };

function buildGrid(W: number, H: number): Node[] {
  const nodes: Node[] = [];
  const cw = W / GRID_COLS,
    ch = H / GRID_ROWS;
  for (let r = 0; r < GRID_ROWS; r++)
    for (let c = 0; c < GRID_COLS; c++)
      nodes.push({ x: cw * c + cw * 0.5, y: ch * r + ch * 0.5, c, r });
  return nodes;
}

function pickDest(grid: Node[], cur: Node): Node {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
    [1, 1],
    [-1, 1],
  ];
  const candidates = dirs
    .map(([dc, dr]) =>
      grid.find((n) => n.c === cur.c + dc && n.r === cur.r + dr),
    )
    .filter(Boolean) as Node[];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function makePath(grid: Node[], src: Node, dst: Node): Node[] {
  const mid =
    Math.random() < 0.5
      ? grid.find((n) => n.c === dst.c && n.r === src.r)!
      : grid.find((n) => n.c === src.c && n.r === dst.r)!;
  return [src, mid || src, dst];
}

export default function TelemetryFlow({
  className = "",
  showGrid = false,
}: {
  className?: string;
  showGrid?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    type PacketType = "major" | "mid" | "minor";

    class Packet {
      type: PacketType;
      size: number;
      opacity: number;
      speed: number;
      src!: Node;
      dst!: Node;
      path!: Node[];
      seg = 0;
      t = 0;
      pause = 0;
      trail: { x: number; y: number }[] = [];

      constructor(type: PacketType) {
        this.type = type;
        this.size = type === "major" ? 14 : type === "mid" ? 8 : 4;
        this.opacity = type === "major" ? 0.9 : type === "mid" ? 0.65 : 0.35;
        this.speed =
          (0.012 + Math.random() * 0.016) * (type === "major" ? 0.8 : 1);
        this.reset();
      }

      reset() {
        const grid = buildGrid(canvas.width, canvas.height);
        this.src = grid[Math.floor(Math.random() * grid.length)];
        this.dst = pickDest(grid, this.src);
        this.path = makePath(grid, this.src, this.dst);
        this.seg = 0;
        this.t = 0;
        this.trail = [];
      }

      update() {
        if (this.pause > 0) {
          this.pause--;
          return;
        }
        this.t += this.speed;
        if (this.t >= 1) {
          this.t = 0;
          this.seg++;
          this.pause = Math.floor(20 + Math.random() * 40);
          if (this.seg >= this.path.length - 1) {
            const grid = buildGrid(canvas.width, canvas.height);
            const next = pickDest(grid, this.dst);
            this.src = this.dst;
            this.dst = next;
            this.path = makePath(grid, this.src, this.dst);
            this.seg = 0;
          }
        }
      }

      pos() {
        const a = this.path[this.seg],
          b = this.path[this.seg + 1] || a;
        const et = easeInOut(this.t);
        return { x: a.x + (b.x - a.x) * et, y: a.y + (b.y - a.y) * et };
      }

      draw(ctx: CanvasRenderingContext2D) {
        const p = this.pos();
        const a = this.path[this.seg],
          b = this.path[this.seg + 1] || a;
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const angle = Math.atan2(dy, dx);

        // no stretch while paused at a node
        const stretchT =
          this.pause > 0 || this.t < 0.05 || this.t > 0.95
            ? 0
            : Math.max(0, Math.sin(easeInOut(this.t) * Math.PI));
        const stretch = 1 + stretchT * 2.2;
        const squash = 1 / Math.sqrt(stretch);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.fillStyle = ACCENT(this.opacity);

        if (this.type === "major") {
          ctx.fillRect(
            -(this.size * stretch) / 2,
            -(this.size * squash) / 2,
            this.size * stretch,
            this.size * squash,
          );
        } else if (this.type === "mid") {
          ctx.fillRect(
            -(this.size * stretch) / 2,
            -((this.size / 2) * squash) / 2,
            this.size * stretch,
            (this.size / 2) * squash,
          );
        } else {
          ctx.fillRect(
            -(4 * stretch) / 2,
            -(4 * squash) / 2,
            4 * stretch,
            4 * squash,
          );
        }

        ctx.restore();
      }
    }

    const packets = [
      ...Array.from({ length: 3 }, () => new Packet("major")),
      ...Array.from({ length: 6 }, () => new Packet("mid")),
      ...Array.from({ length: 10 }, () => new Packet("minor")),
    ];

    // let scanY = -20, scanDelay = 300, scanSpeed = 0.4;

    function draw() {
      const W = canvas.width,
        H = canvas.height;
      ctx.fillStyle = "#0a0a0a";
      ctx.clearRect(0, 0, W, H);

      const grid = buildGrid(W, H);
      const cw = W / GRID_COLS,
        ch = H / GRID_ROWS;

      ctx.strokeStyle = GHOST(0.06);
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= GRID_COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cw, 0);
        ctx.lineTo(c * cw, H);
        ctx.stroke();
      }
      for (let r = 0; r <= GRID_ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * ch);
        ctx.lineTo(W, r * ch);
        ctx.stroke();
      }
      for (const n of grid) {
        ctx.fillStyle = GHOST(0.18);
        ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
      }

      //   if (scanDelay > 0) { scanDelay--; }
      //   else {
      //     scanY += scanSpeed;
      //     ctx.strokeStyle = ACCENT(0.06); ctx.lineWidth = 1;
      //     ctx.beginPath(); ctx.moveTo(40, scanY); ctx.lineTo(W-40, scanY); ctx.stroke();
      //     if (scanY > H + 20) { scanY = -20; scanDelay = 200 + Math.floor(Math.random()*400); scanSpeed = 0.3 + Math.random()*0.3; }
      //   }

      for (const p of packets) {
        p.update();
        p.draw(ctx);
      }
      raf = requestAnimationFrame(draw);
      if (showGrid) {
        ctx.strokeStyle = GHOST(0.06);
        ctx.lineWidth = 0.5;
        for (let c = 0; c <= GRID_COLS; c++) {
          ctx.beginPath();
          ctx.moveTo(c * cw, 0);
          ctx.lineTo(c * cw, H);
          ctx.stroke();
        }
        for (let r = 0; r <= GRID_ROWS; r++) {
          ctx.beginPath();
          ctx.moveTo(0, r * ch);
          ctx.lineTo(W, r * ch);
          ctx.stroke();
        }
        for (const n of grid) {
          ctx.fillStyle = GHOST(0.18);
          ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
        }
      }
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
