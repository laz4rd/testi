"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoCardProps {
  src: string;
  thumbnail?: string;
  title: string;
  type: string;
  year: string;
  id: string;
  youtubeUrl?: string;
}function VideoModal({ src, title, youtubeUrl, onClose }: { 
  src: string; 
  title: string; 
  youtubeUrl?: string;
  onClose: () => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ scale: 0.97, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] tracking-widest text-white/30">{title}</p>
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-widest text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            ESC TO CLOSE
          </button>
        </div>

        {/* Video container */}
        <div
          className="relative rounded-2xl overflow-hidden bg-black border border-white/8"
          style={{ aspectRatio: "16/9" }}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={muted}
            className="w-full h-full object-cover"
            onEnded={() => setEnded(true)}
          />

          {/* Ended overlay */}
          <AnimatePresence>
            {ended && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-mono text-[10px] tracking-widest text-white/40">
                  PREVIEW ENDED
                </p>
                {youtubeUrl ? (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#FC0F49]">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-mono text-[11px] tracking-widest text-white/70 group-hover:text-white transition-colors duration-200">
                      WATCH ON YOUTUBE
                    </span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setEnded(false);
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                    }}
                    className="font-mono text-[11px] tracking-widest text-white/40 hover:text-white transition-colors duration-200"
                  >
                    REPLAY
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="font-mono text-[10px] tracking-widest text-white/20 hover:text-white/50 transition-colors duration-200"
                >
                  CLOSE
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute button */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-3 right-3 text-white/40 hover:text-white transition-colors duration-200 bg-black/30 rounded-full p-1.5"
          >
            {muted ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.4">
                <path d="M1 4h2.5l3.5-2.5v9L3.5 8H1V4z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1 4h2.5l3.5-2.5v9L3.5 8H1V4z" />
                <path d="M8 3.5c1.2.7 1.8 1.7 1.8 2.5S9.2 7.8 8 8.5" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
export function VideoCard({ src, thumbnail, title, type, year, id, youtubeUrl }: VideoCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <div
        ref={cardRef}
        className="group relative border border-white/8 hover:border-white/16 transition-all duration-300 cursor-none bg-white/[0.02]"
        style={{ borderRadius: "16px", overflow: "hidden", isolation: "isolate" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setModalOpen(true)}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: "16/9", borderRadius: "16px 16px 0 0", overflow: "hidden" }}
        >
          <video
            src={src}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            ref={el => {
              if (!el) return;
              if (hovered) el.play().catch(() => {});
              else { el.pause(); el.currentTime = 0; }
            }}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: hovered ? 0.2 : 0.45 }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ left: cursorPos.x, top: cursorPos.y, x: "-50%", y: "-50%" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0, 1, 1, 0, 0, 1] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.5, times: [0, 0.19, 0.2, 0.49, 0.5, 0.79, 0.8], ease: "linear" },
                }}
              >
                <div
                  className="w-4 h-4 flex items-center justify-center shadow-lg"
                  style={{ background: "#FC0F49", borderRadius: "0px" }}
                >
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-sans font-bold text-white text-sm uppercase tracking-tight leading-none mb-1">
              {title}
            </p>
            <p className="font-mono text-[10px] tracking-widest text-white/30">{type}</p>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-white/20">{year}</span>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <VideoModal
            src={src}
            title={title}
            youtubeUrl={youtubeUrl}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}