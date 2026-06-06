"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Post = {
  id: string;
  date: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  status: string;
  description: string;
};

export default function PostEntry({ post, index }: { post: Post; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className="relative py-6 sm:py-8 cursor-pointer group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Top rule */}
          <div className="relative h-px w-full mb-6 sm:mb-8 overflow-visible">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute left-0 -top-1 w-1.5 h-1.5 bg-[#FC0F49]"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="absolute right-0 -top-1 w-1.5 h-1.5 border border-white/40"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            />
          </div>

          {/* Mobile layout: stacked. Desktop: side by side */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-16">

            {/* Meta — top on mobile, left column on desktop */}
            <div className="flex flex-row sm:flex-col sm:w-40 sm:shrink-0 sm:pt-1 gap-3 sm:gap-0 mb-3 sm:mb-0">
              <div
                className="font-mono text-[10px] tracking-widest transition-colors duration-200"
                style={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
              >
                [{post.date}]
              </div>
              <div
                className="font-mono text-[10px] tracking-widest sm:mt-1 transition-colors duration-200"
                style={{ color: hovered ? "#FC0F49" : "rgba(255,255,255,0.15)" }}
              >
                NODE_{post.id}
              </div>
              <div
                className="font-mono text-[10px] tracking-widest sm:mt-1 transition-colors duration-200"
                style={{ color: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)" }}
              >
                {post.readTime}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-2">
                <motion.h2
                  className="font-sans font-extrabold text-base sm:text-[2.2vh] uppercase tracking-tight leading-tight"
                  animate={{ color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.75)" }}
                  transition={{ duration: 0.2 }}
                >
                  {post.title}
                </motion.h2>
                <span
                  className="font-mono text-[9px] tracking-widest uppercase shrink-0 transition-colors duration-200"
                  style={{ color: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                >
                  [{post.category}]
                </span>
              </div>

              <motion.p
                className="font-sans text-sm leading-relaxed max-w-xl"
                animate={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                {post.description}
              </motion.p>
            </div>

            {/* Status — hidden on mobile to save space */}
            <div className="hidden sm:block shrink-0 pt-1 w-24 text-right">
              <motion.span
                className="font-mono text-[9px] tracking-widest"
                animate={{
                  color: hovered
                    ? post.status === "ARCHIVED" ? "rgba(255,255,255,0.3)" : "#B9E901"
                    : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                {post.status}
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}