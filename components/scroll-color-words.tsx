"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function ColoredWord({
  word,
  idx,
  total,
  scrollYProgress,
  targetColor,
}: {
  word: string;
  idx: number;
  total: number;
  scrollYProgress: any;
  targetColor: string;
}) {
  const color = useTransform(
    scrollYProgress,
    [0.3 + (idx / total) * 0.7, 0.3 + ((idx + 1) / total) * 0.7],
    ["#9CA3AF", targetColor]
  );

  return (
    <motion.span style={{ color }}>
      {word}
      {idx < total - 1 ? " " : ""}
    </motion.span>
  );
}

export function ScrollColorWords({ children }: { children: string }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? ref : undefined,
    offset: ["start 80%", "end 20%"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetColor ="#FC0F49";
  const words = children.split(" ");

  if (!mounted) {
    return (
      <div className="px-6 py-24 sm:px-12 lg:px-16">
        <div className="flex justify-center">
          <p className="font-geist text-justify text-lg leading-relaxed text-gray-400 sm:text-xl lg:text-2xl max-w-2xl">
            {children}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="px-6 py-24 sm:px-12 lg:px-16">
      <div className="flex justify-center">
        <p className="font-geist text-justify text-lg leading-relaxed sm:text-xl lg:text-2xl max-w-2xl">
          {words.map((word, idx) => (
            <ColoredWord
              key={idx}
              word={word}
              idx={idx}
              total={words.length}
              scrollYProgress={scrollYProgress}
              targetColor={targetColor}
            />
          ))}
        </p>
      </div>
    </div>
  );
}