"use client";
import Grainient from "@/components/Grainient";
import Link from "next/link";

export default function BlogFooterGrainient() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#FC0F49"
          color2="#ff3566"
          color3="#a20f33"
          timeSpeed={2}
          colorBalance={-0.6}
          warpStrength={4}
          warpFrequency={5}
          warpSpeed={2.5}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1.1}
          centerX={0}
          centerY={0}
          zoom={0.6}
        />
        
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-12 mb-16">
          <div>
            <h2
              className="font-tech text-white leading-none mb-3"
              style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
            >
              36
            </h2>
            <p className="font-mono text-[10px] tracking-widest text-white/70 font-bold max-w-xs leading-relaxed">
              PERSONAL ARCHIVE // ENGINEERING & DESIGN<br />
              BUILT BY A COMPUTER ENGINEERING STUDENT
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-2">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-white mb-1">NAVIGATE</span>
              {[
                { label: "Home", href: "/" },
                { label: "Who?", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Links", href: "/links" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans font-bold text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-white mb-1">CONNECT</span>
              {[
                { label: "GitHub", href: "https://github.com/laz4rd" },
                { label: "Instagram", href: "https://instagram.com/laz4rd.art" },
                { label: "LinkedIn", href: "https://linkedin.com/in/brijrajbhati" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-white/15 mb-8" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-widest text-white">
            © {new Date().getFullYear()} 36. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-widest text-white/70">NODE_EOF</span>
            <span className="font-mono text-[10px] tracking-widest text-white/70">SYSTEM // OFFLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}