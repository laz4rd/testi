"use client";
import { useState } from "react";

interface MDXCodeBlockProps {
  children?: string;
  className?: string;
}

export default function MDXCodeBlock({ children = "", className }: MDXCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") ?? "code";

  const handleCopy = () => {
    navigator.clipboard.writeText(children?.toString().trim() ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="my-6 border border-white/[0.08]"
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.05] border-b border-white/[0.08]">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#FC0F49]">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors duration-200 focus:outline-none"
        >
          {copied ? "COPIED ✓" : "COPY"}
        </button>
      </div>

      {/* Code body */}
      <div className="bg-[#0d0d0d] px-5 py-4 overflow-x-auto">
        <code className="font-mono text-sm text-white/70 leading-relaxed whitespace-pre outline-none select-text">
          {children}
        </code>
      </div>
    </div>
  );
}
