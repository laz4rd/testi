"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "/art/pc7.png", 
  "/art/pc2.png",
  "/art/pc3.png",
  "/art/pc4.png",
  "/art/pc5.png",
  "/art/pc6.png",
  "/art/pc1.jpg",
  "/art/pc8.png",
  "/art/pc9.png",
  "/art/pc10.png",
  "/art/pc11.png",
  "/art/pc12.png",
];

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-full w-full overflow-hidden rounded-xl border border-white/8"
        >
          <img
            src={src}
            alt=""
            className="pointer-events-none w-full h-full object-cover transition-all duration-700"
          />
        </div>
      ))}
    </motion.div>
  );
};

export function ParallaxGallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
  const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight });
  window.addEventListener("resize", resize);
  resize();
  return () => window.removeEventListener("resize", resize);
}, []);

  return (
    <section className="relative bg-black">
      {/* Section header */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-16 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans font-extrabold text-white uppercase text-xl tracking-tight">
            Visual Work
          </h2>
          <span className="font-mono text-[10px] tracking-widest text-white/20">
            {images.length} FRAMES
          </span>
        </div>
        <div className="h-px w-full bg-white/8 mt-4" />
      </div>

      {/* Gallery */}
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[1.5vw] overflow-hidden bg-black px-6 sm:px-8 py-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
    </section>
  );
}