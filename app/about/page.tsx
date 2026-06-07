"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TelemetryFlow from "@/components/Telemetry";
import BlogFooterGrainient from "@/components/BlogFooterGrainient";
import { VideoCard } from "@/components/Videocard";
import { ParallaxGallery } from "@/components/Parallaxgallery";

const skills = [
  { label: "Web Development" },
  { label: "Mobile Apps" },
  { label: "UI/UX Design" },
  { label: "Motion Design" },
  { label: "Video Editing" },
  { label: "Filmmaking" },
  { label: "Game Development" },
  { label: "Unreal Engine 5" },
  { label: "Blender" },
  { label: "Embedded Systems" },
  { label: "IoT Prototyping" },
  { label: "Hardware Design" },
];

const projects = [
  {
    id: "001",
    title: "Ulectro 2026",
    type: "Teaser",
    year: "2026",
    src: "/showreel/ulectro.webm",
    youtubeUrl: "https://www.instagram.com/reel/DWOrJZhjZx_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: "002",
    title: "Adappt 2025",
    type: "Film & Storytelling",
    year: "2025",
    src: "/showreel/adapt.webm",
    youtubeUrl: "https://www.instagram.com/reel/DPjnW49E6jQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: "003",
    title: "Residue",
    type: "Short Film",
    year: "2025",
    src: "/showreel/resi.webm",
    youtubeUrl: "https://youtu.be/zprJUakKxZ8",
  },
  {
    id: "004",
    title: "Wonder",
    type: "Film Opening",
    year: "2024",
    src: "/showreel/wonder.webm",
    youtubeUrl: "https://youtu.be/wXHJ0kUjw-A?si=okSbzYIf1Rrxb64V",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Telemetry bg */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <TelemetryFlow />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="relative px-6 sm:px-12 pt-36 pb-0 max-w-7xl mx-auto">
          <div className="absolute top-8 left-6 opacity-20 pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2H2V12" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-8 right-6 opacity-20 pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2H22V12" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-4">
              <h1
                className="font-sans font-extrabold text-white leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                WHO AM I<span className="text-[#FC0F49]">?</span>
              </h1>
            </div>
            <div className="h-px w-full bg-white/10" />
          </FadeIn>
        </section>

        {/* BIO + IMAGE */}
        <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <FadeIn delay={0.1} className="flex-1">
              <p
                className="font-sans font-bold text-white/90 text-2xl sm:text-3xl leading-snug mb-6"
                style={{ letterSpacing: "-0.01em" }}
              >
                Computer Engineering student building across software, hardware,
                and design.
              </p>
              <p className="font-geist text-white/45 text-sm leading-relaxed mb-6">
                Developed mobile applications with React Native, web platforms
                with Next.js, custom developer tools such as X4MD, productivity
                & student tools, and experimental hardware including cyberdeck
                designs & IoT.
              </p>
              <p className="font-geist text-white/35 text-sm leading-relaxed">
                Also leading and contributing to open-source initiatives such as
                The Kaju Taklis Open Source while creating technology-driven
                storytelling projects like Law Of Machine & Wonder.
              </p>

              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[
                  { n: "4+", label: "Years Building" },
                  { n: "12+", label: "Projects Shipped" },
                  { n: "3", label: "Active Initiatives" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-sans font-extrabold text-white text-6xl">
                      {s.n}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest text-white mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex-shrink-0 w-full md:w-72">
              <div ref={imageRef} className="relative">
                <div className="absolute -top-2 -left-2 z-10 opacity-60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1H1V8" stroke="#FC0F49" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 z-10 opacity-60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1H15V8" stroke="#FC0F49" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-2 z-10 opacity-60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8V15H8" stroke="#FC0F49" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 z-10 opacity-60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 8V15H8" stroke="#FC0F49" strokeWidth="1.5" />
                  </svg>
                </div>

                <motion.div
                  style={{ y: imageY }}
                  className="overflow-hidden rounded-lg border border-white/10"
                >
                  <div style={{ aspectRatio: "3/4" }}>
                    <Image
                      src="/pfp.jpeg"
                      alt="Profile"
                      width={960}
                      height={1280}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 scale-200 transition-all duration-700"
                    />
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* STACK */}
        <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
          <FadeIn>
            <h2
              className="font-sans font-extrabold text-white uppercase mb-10"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              WHAT I BUILD<span className="text-[#FC0F49]">.</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:border-[#FC0F49]/60 hover:text-white hover:bg-[#FC0F49]/5 transition-all duration-200 cursor-default"
                >
                  {skill.label}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* MOTION & FILM */}
        <section className="px-6 sm:px-12 pb-24 max-w-7xl mx-auto">
          <FadeIn>
            <div className="h-px w-full bg-white/10 mb-12" />
            <h2
              className="font-sans font-extrabold text-white uppercase mb-10"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Motion & Film<span className="text-[#FC0F49]">.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project) => (
                <VideoCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  type={project.type}
                  year={project.year}
                  src={project.src}
                  youtubeUrl={project.youtubeUrl}
                />
              ))}
            </div>
          </FadeIn>
        </section>

        {/* RECENT PIECES */}
        <section className="py-24">
          <FadeIn>
            <div className="h-px w-full bg-white/10 mb-12" />
            <h2
              className="font-sans font-extrabold text-white uppercase mb-10 px-6 sm:px-12 max-w-7xl mx-auto"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Recent Pieces<span className="text-[#FC0F49]">.</span>
            </h2>
          </FadeIn>
          <ParallaxGallery />
        </section>
        {/* CONTACT */}
        <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
          <FadeIn>
            <div className="h-px w-full bg-white/10 mb-16" />
            <h2
              className="font-sans font-extrabold text-white uppercase mb-3"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              LET&apos;s TALK<span className="text-[#FC0F49]">.</span>
            </h2>
            <p className="font-geist text-white/40 text-sm mb-12 max-w-sm leading-relaxed">
              Got an Idea? Open to collaborations, interesting problems, and
              conversations about things that haven&apos;t been built yet.
            </p>

            {/* Email */}
            <a
              href="mailto:brijrajbhati123@gmail.com"
              className="group inline-flex items-center gap-3 mb-12"
            >
              <span
                className="font-sans font-extrabold text-white group-hover:text-[#FC0F49] transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 2rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                | EMAIL ME |
              </span>
              <span className="font-mono text-[10px] tracking-widest text-white/20 group-hover:text-[#FC0F49] transition-colors duration-200">
                →
              </span>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-6">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/laz4rd",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/laz4rd.art",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com/@Laz4RD",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/brijrajbhati",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      <BlogFooterGrainient />
    </div>
  );
}
