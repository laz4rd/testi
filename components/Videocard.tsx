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
}

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ scale: 0.97, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-white/30 mb-0.5">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-widest text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            ESC TO CLOSE
          </button>
        </div>

        {/* Video */}
        <div
          className="relative rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/8"
          style={{ aspectRatio: "16/9" }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
            muted={muted}
          />

          <AnimatePresence>
            {!playing && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                    <path d="M3 2l9 5-9 5V2z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center gap-4">
          <button onClick={togglePlay} className="text-white/40 hover:text-white transition-colors duration-200">
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="1" y="1" width="3.5" height="10" rx="1" />
                <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
              </svg>
            )}
          </button>

          <span className="font-mono text-[10px] text-white/25 w-8 shrink-0">
            {formatTime((progress / 100) * duration)}
          </span>

          <div
            className="flex-1 h-px bg-white/10 relative cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="absolute left-0 top-0 h-full bg-white/60 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
            />
          </div>

          <span className="font-mono text-[10px] text-white/25 w-8 shrink-0 text-right">
            {formatTime(duration)}
          </span>

          <button onClick={() => setMuted(!muted)} className="text-white/40 hover:text-white transition-colors duration-200">
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

export function VideoCard({ src, thumbnail, title, type, year}: VideoCardProps) {
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
        {/* Thumbnail / video preview */}
        <div
  className="relative w-full"
  style={{ aspectRatio: "16/9", borderRadius: "16px 16px 0 0", overflow: "hidden" }}
>
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
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
          )}

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: hovered ? 0.2 : 0.45 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cursor play button — pink square */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: cursorPos.x,
                  top: cursorPos.y,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: [0, 0, 1, 1, 0, 0, 1],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  opacity: {
                    duration: 0.8,
                    times: [0, 0.19, 0.2, 0.49, 0.5, 0.79, 0.8],
                    ease: "linear",
                  },
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

        {/* Meta */}
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
          <VideoModal src={src} title={title} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}