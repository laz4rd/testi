"use client";
import { motion } from "framer-motion";

export default function BlogFooter() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="h-px w-full bg-white/10 mt-2"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-12 flex items-center justify-between"
      >
        <span className="font-mono text-[9px] tracking-widest text-white/10">
          36 // PERSONAL ARCHIVE
        </span>
        <span className="font-mono text-[9px] tracking-widest text-white/10">
          EOF
        </span>
      </motion.div>
    </>
  );
}