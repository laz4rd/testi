"use client";
import { motion } from "framer-motion";

export default function BlogHeader({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20"
    >
      <div className="flex items-end justify-between mb-3">
        <h1
          className="font-sans font-extrabold text-white leading-none"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          LOGS<span className="text-[#FC0F49]">.</span>
        </h1>
        <div className="text-right pb-2">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 mb-1">
            ARCHIVE NODE 04
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/20">
            SYSTEM // WRITINGS
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
          {count} ENTRIES FOUND
        </span>
        <div className="h-px w-8 bg-white/10" />
      </div>
    </motion.div>
  );
}