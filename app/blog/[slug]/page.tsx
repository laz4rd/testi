import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { mdxComponents } from "@/components/MDXComponents";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import TelemetryFlow from "@/components/Telemetry";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);
  return {
    title: `${frontmatter.title} — 36`,
    description: frontmatter.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <TelemetryFlow />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 pointer-events-none opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2H2V12" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 pointer-events-none opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2H22V12" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-32">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/30 hover:text-white/60 transition-colors duration-200 mb-16 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          BACK TO LOGS
        </Link>

        {/* Post header */}
        <div className="mb-12">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-widest text-white/30">
              [{frontmatter.date}]
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#FC0F49]">
              [{frontmatter.category}]
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/20">
              {frontmatter.readTime}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/20 ml-auto">
              NODE_{frontmatter.id}
            </span>
          </div>

          {/* Rule */}
          <div className="h-px w-full bg-white/10 mb-8" />

          {/* Title */}
          <h1
            className="font-sans font-extrabold text-white uppercase leading-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {frontmatter.title}
          </h1>

          {/* Description */}
          {frontmatter.description && (
            <p className="font-sans text-base text-white/40 leading-relaxed max-w-xl">
              {frontmatter.description}
            </p>
          )}

          {/* Rule */}
          <div className="h-px w-full bg-white/10 mt-8" />
        </div>

        {/* MDX Content */}
        <div className="mdx-content">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
        {/* Post footer image */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="mx-auto w-fit">
            <Image
              src="https://raw.githubusercontent.com/laz4rd/laz4rd/main/assets/footer.png"
              alt="footer"
              width={200}
              height={32}
              className=""
              unoptimized
            />
          </div>
        </div>

        {/* EOF */}
        <div className="mt-8 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-white/10">
            36 // PERSONAL ARCHIVE
          </span>
          <span className="font-mono text-[9px] tracking-widest text-white/10">
            EOF
          </span>
        </div>
      </div>
    </div>
  );
}
