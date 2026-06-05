"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["Home", "Blog", "Links"];

function BlinkDot() {
  return (
    <motion.span
      className="inline-block w-1 h-1 rounded-full bg-white ml-1 mb-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0, 0, 1] }}
      transition={{
        duration: 0.5,
        times: [0, 0.19, 0.2, 0.49, 0.5, 0.79, 0.8],
        ease: "linear",
      }}
    />
  );
}

export default function TelemetryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [pillVisible, setPillVisible] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 60;
      if (past && !scrolled) {
        setScrolled(true);
        setTimeout(() => setPillVisible(true), 50);
      } else if (!past && scrolled) {
        setScrolled(false);
        setPillVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  useEffect(() => {
    if (!pillVisible) return;
    const idx = LINKS.indexOf(active);
    const el = itemRefs.current[idx];
    const pill = pillRef.current;
    if (!el || !pill) return;
    const pillRect = pill.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `${elRect.left - pillRect.left}px`;
      indicatorRef.current.style.width = `${elRect.width}px`;
      indicatorRef.current.style.height = `${elRect.height}px`;
    }
  }, [active, pillVisible]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Transparent top navbar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav
            className="pointer-events-auto flex items-center justify-between px-8 py-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="font-tech text-white text-xl tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1] }}
              transition={{
                duration: 0.8,
                times: [0, 0.19, 0.2, 0.39, 0.4, 0.59, 0.6, 0.79, 0.8, 0.99, 1],
                ease: "linear",
              }}
            >
              36
            </motion.span>

            <div className="flex items-center gap-8">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  onClick={() => setActive(link)}
                  className="relative font-sans text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-200 pointer-events-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                >
                  {link}
                  {active === link && (
                    <motion.span
                      layoutId="topbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scrolled pill navbar */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="pointer-events-auto flex justify-center pt-5"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              ref={pillRef}
              className="relative flex items-center gap-1 px-1.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl"
            >
              {/* sliding indicator */}
              <span
                ref={indicatorRef}
                className="absolute rounded-full bg-white/10 border border-white/20 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                style={{ top: 6 }}
              />

              {LINKS.map((link, i) => (
                <button
                  key={link}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={() => setActive(link)}
                  className={`relative z-10 flex items-center gap-1 rounded-full px-5 py-1.5 text-xs tracking-widest uppercase font-sans transition-colors duration-200 ${
                    active === link
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {active === link && <BlinkDot />}
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
