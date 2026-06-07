"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TelemetryFlow from "@/components/Telemetry";
import DecryptedText from "@/components/DecryptedText";
import BlogFooterGrainient from "@/components/BlogFooterGrainient";

const links = [
  {
    id: "001",
    title: "X4 Creatives",
    description: "Early-2025 Portfolio",
    href: "https://x4creative.framer.website",
  },
  {
    id: "002",
    title: "GPA Calculator",
    description: "Find your ICA & TEE!",
    href: "https://gpa-calculator-36.web.app/",
  },
  {
    id: "003",
    title: "FANSI",
    description: "Java Utility Package",
    href: "https://github.com/laz4rd/FANSI-Logger",
  },
  {
    id: "004",
    title: "X4MD",
    description: "Pre-Agentic AI Terminal",
    href: "https://x4md.framer.website",
  },
  {
    id: "005",
    title: "X4MD",
    description: "Terminal-inspired productivity tool built for developers.",
    href: "https://x4md.dev",
  },
  {
    id: "006",
    title: "Kaju Taklis OSS",
    description: "Student-led open source initiative. Contributions welcome.",
    href: "https://github.com/kajutaklis",
  },
];

function ConfirmModal({
  link,
  onConfirm,
  onCancel,
}: {
  link: { title: string; href: string };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
  style={{ borderRadius: "10px" }}
  className="relative z-10 w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center gap-6"

        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Indicator */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
            Outbound Signal
          </span>
        </div>

        {/* Title */}
        <div className="text-center">
          <DecryptedText
            text="Confirm Travel?"
            className="font-sans font-extrabold text-white text-2xl uppercase tracking-tight"
            encryptedClassName="font-sans font-extrabold text-[#FC0F49] text-2xl uppercase tracking-tight"
            animateOn="view"
            sequential
            speed={35}
            maxIterations={8}
          />
          <p className="font-mono text-[10px] tracking-widest text-white/30 mt-3">
            Redirecting to{" "}
            <span className="text-white/60">{link.title}</span>
          </p>
          <p className="font-mono text-[9px] tracking-widest text-white/20 mt-1 max-w-[20ch] mx-auto truncate">
            {link.href}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 font-mono text-[11px] tracking-widest uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/30 py-3 rounded-full transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 font-mono text-[11px] tracking-widest uppercase text-black font-bold py-3 rounded-full transition-all duration-200 hover:opacity-90"
            style={{ background: "#FC0F49" }}
          >
            Go →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LinkCard({
  link,
  index,
  onOpen,
}: {
  link: (typeof links)[0];
  index: number;
  onOpen: (link: (typeof links)[0]) => void;
}) {
  return (
    <motion.div
    style={{ borderRadius: "8px", overflow: "hidden" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white/[0.03] border border-white/8 flex items-center justify-between gap-6 p-6 hover:border-white/16 hover:bg-white/[0.05] transition-all duration-300"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[9px] tracking-widest text-white/20">
            [{link.id}]
          </span>
        </div>
        <h3 className="font-sans font-extrabold text-white uppercase text-lg tracking-tight leading-none mb-2">
          {link.title}
        </h3>
        <p className="font-geist text-white/40 text-sm leading-relaxed">
          {link.description}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => onOpen(link)}
        className="shrink-0 font-mono text-[10px] tracking-widest uppercase text-white/50 hover:text-black border border-white/15 hover:border-transparent hover:bg-white px-5 py-2.5 rounded-full transition-all duration-200 group-hover:border-white/30"
      >
        Visit →
      </button>
    </motion.div>
  );
}

export default function LinksPage() {
  const [pendingLink, setPendingLink] = useState<(typeof links)[0] | null>(null);

  const handleConfirm = () => {
    if (pendingLink) {
      window.open(pendingLink.href, "_blank", "noopener,noreferrer");
      setPendingLink(null);
    }
  };

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">

      {/* Telemetry */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <TelemetryFlow />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2H2V12" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2H22V12" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8 pt-36 pb-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-widest text-white/25 mb-4 uppercase">
            Outbound Links
          </p>
          <h1
            className="font-sans font-extrabold text-white leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            LINKS<span className="text-[#FC0F49]">.</span>
          </h1>
          <p className="font-geist text-white/40 text-sm leading-relaxed max-w-sm">
            A collection of tools that you probably know me for. Feel free to visit and use!
          </p>
          <div className="h-px w-full bg-white/8 mt-8" />
        </motion.div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {links.map((link, i) => (
    <LinkCard
      key={link.id}
      link={link}
      index={i}
      onOpen={setPendingLink}
    />
  ))}
</div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-16 flex items-center justify-between"
        >
          <span className="font-mono text-[9px] tracking-widest text-white/10">
            36 // OUTBOUND
          </span>
          <span className="font-mono text-[9px] tracking-widest text-white/10">
            {links.length} NODES
          </span>
        </motion.div>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {pendingLink && (
          <ConfirmModal
            link={pendingLink}
            onConfirm={handleConfirm}
            onCancel={() => setPendingLink(null)}
          />
        )}
      </AnimatePresence>

      <BlogFooterGrainient />
    </div>
  );
}