"use client";
import DecryptedText from "@/components/DecryptedText";
import Grainient from "@/components/Grainient";
import TelemetryFlow from "@/components/Telemetry";
import PixelTrail from "@/components/PixelTrail";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center overflow-hidden">
      {/* Background */}
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
        <TelemetryFlow className="absolute inset-0 z-10 showGrid" />
      </div>

      {/* Cursor trail — desktop only */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ isolation: "isolate" }}
        >
          <PixelTrail
            gridSize={22}
            trailSize={0.1}
            maxAge={500}
            interpolate={2.6}
            color="#B9E901"
            gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center px-4">
        <DecryptedText
          text="36"
          encryptedClassName="text-[#B9E901]"
          parentClassName="font-tech text-[20vw] sm:text-[12vw] md:text-[7vw]"
          className="text-[#FFFFFF]"
          speed={40}
          maxIterations={25}
          animateOn="view"
        />
        <h3 className="font-serif text-white text-[4vw] sm:text-[3vw] md:text-[2vw] text-center w-full">
          <i>WHE </i>
          <span className="font-sans font-extrabold">RE INNOVATION ME</span>
          <i>ETS ME</i>
        </h3>
      </div>
       <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3">
  {/* Pulse indicator */}
  <div className="flex flex-col items-center gap-1">
    <motion.div
      className="w-px bg-white/40"
      animate={{ height: ["12px", "24px", "12px"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="w-1 h-1 rounded-full bg-[#FC0F49] animate-pulse" />
  </div>

  {/* Link */}
  <a
    href="/about"
    className="font-mono font-bold text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-300 border-b border-white/20 hover:border-white pb-0.5"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
  >
    Access Portfolio →
  </a>
</div>
    </div>
  );
}
