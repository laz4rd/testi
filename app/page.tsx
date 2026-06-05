"use client";
import Image from "next/image";

import DecryptedText from "@/components/DecryptedText";
import Grainient from "@/components/Grainient";
import TelemetryFlow from "@/components/Telemetry";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#FC0F49"
          color2="#ff3566"
          color3="#a20f33"
          timeSpeed={0.25}
          colorBalance={-0.6}
          warpStrength={1}
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
          zoom={0.9}
        />
        <TelemetryFlow className="absolute inset-0 z-10 showGrid" />
      </div>
      <div className="relative z-10">
        <motion.h1
  className="font-tech text-[#FFFFFF] text-[20vw]"
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1] }}
  transition={{
    duration: 0.8,
    times: [0, 0.19, 0.2, 0.39, 0.4, 0.59, 0.6, 0.79, 0.8, 0.99, 1],
    ease: "linear",
  }}
>
  36
</motion.h1>
      </div>
    </div>
  );
}
