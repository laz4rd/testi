"use client";
import DecryptedText from "@/components/DecryptedText";
import Grainient from "@/components/Grainient";
import TelemetryFlow from "@/components/Telemetry";
import { motion } from "framer-motion";
import PixelTrail from "@/components/PixelTrail";

export default function Home() {
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
        <TelemetryFlow className="absolute inset-0 z-10 showGrid"/>
      </div>

      {/* Cursor trail */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <PixelTrail
          gridSize={22}
          trailSize={0.1}
          maxAge={500}
          interpolate={2.6}
          color="#B9E901"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center">
        {/* <h1 className="font-tech text-white text-[7vw]">36</h1> */}
        <DecryptedText text="36" encryptedClassName="text-[#B9E901]" parentClassName="font-tech text-[7vh]" className="text-[#FFFFFF]" speed={40} maxIterations={25} animateOn="view"></DecryptedText>
        <h3 className="font-serif text-white text-[2vw] text-center w-full">
          <i>WHE </i>
          <span className="font-sans font-extrabold">RE INNOVATION ME</span>
          <i>ETS ME</i>
        </h3>
      </div>
    </div>
  );
}