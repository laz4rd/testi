"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TelemetryFlow from "@/components/Telemetry";
import BlogFooterGrainient from "@/components/BlogFooterGrainient";
import { VideoCard } from "@/components/Videocard";
const skills = [
  { label: "React Native" },
  { label: "Next.js" },
  { label: "TypeScript" },
  { label: "Rust" },
  { label: "Hardware" },
  { label: "Open Source" },
  { label: "UI/UX" },
  { label: "Node.js" },
  { label: "IoT" },
  { label: "Linux" },
  { label: "Figma" },
  { label: "Python" },
];

const projects = [
  {
    id: "001",
    title: "Ulectro 2026",
    type: "Teaser",
    year: "2026",
    src: "/showreel/ulectro.mp4",
  },
  {
    id: "002",
    title: "Adappt 2025",
    type: "Film & Storytelling",
    year: "2025",
    src: "/showreel/adapt.mp4",
  },
  {
    id: "003",
    title: "Residue",
    type: "Short Film",
    year: "2025",
    src: "/showreel/resi.mov",
  },
  {
    id: "004",
    title: "Wonder",
    type: "Film Opening",
    year: "2024",
    src: "/showreel/wonder.mov",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
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
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "-0.02em" }}
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
              <p className="font-sans font-bold text-white/90 text-2xl sm:text-3xl leading-snug mb-6"
                style={{ letterSpacing: "-0.01em" }}>
                Computer Engineering student building across software, hardware, and design.
              </p>
              <p className="font-geist text-white/45 text-sm leading-relaxed mb-6">
                Developed mobile applications with React Native, web platforms with Next.js,
                custom developer tools such as X4MD, productivity & student tools, and
                experimental hardware including cyberdeck designs & IoT.
              </p>
              <p className="font-geist text-white/35 text-sm leading-relaxed">
                Also leading and contributing to open-source initiatives such as The Kaju
                Taklis Open Source while creating technology-driven storytelling projects
                like Law Of Machine & Wonder.
              </p>

              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[
                  { n: "4+", label: "Years Building" },
                  { n: "12+", label: "Projects Shipped" },
                  { n: "3", label: "Active Initiatives" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-sans font-extrabold text-white text-6xl">{s.n}</div>
                    <div className="font-mono text-[10px] tracking-widest text-white mt-1">{s.label}</div>
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
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* STACK + CURRENTLY inside GridBackground */}
        {/* <GridBackground minHeight="auto"> */}
          <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
            <FadeIn>
              
              <h2
                className="font-sans font-extrabold text-white uppercase mb-10"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
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

          <section className="px-6 sm:px-12 pb-24 max-w-7xl mx-auto">
  <FadeIn>
    <div className="h-px w-full bg-white/10 mb-12" />
    <h2
      className="font-sans font-extrabold text-white uppercase mb-10"
      style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
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
    />
  ))}
    </div>
  </FadeIn>
</section>
        {/* </GridBackground> */}

        {/* QUOTE */}
        <section className="px-6 sm:px-12 py-32 max-w-7xl mx-auto">
          <FadeIn>
            <div className="h-px w-full bg-white/10 mb-20" />
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] tracking-widest text-white/20 block mb-6">
                PHILOSOPHY
              </span>
              <blockquote
                className="font-sans font-extrabold text-white/80 leading-tight mb-8"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                &quot; Build things that matter. Document everything. Ship relentlessly. &quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#FC0F49]" />
                <span className="font-mono text-[10px] tracking-widest text-white/30">
                  PERSONAL DIRECTIVE // 36
                </span>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>

      <BlogFooterGrainient />
    </div>
  );
}