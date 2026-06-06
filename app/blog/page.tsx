import { getAllPosts } from "@/lib/posts";
import PostEntry from "@/components/PostEntry";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import TelemetryFlow from "@/components/Telemetry";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <TelemetryFlow />
      </div>
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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-36 pb-32">
        <BlogHeader count={posts.length} />
        <div>
          {posts.map((post, i) => (
            <PostEntry key={post.id} post={post} index={i} />
          ))}
        </div>
        <BlogFooter />
      </div>
      <footer className="relative z-10 border-t border-white/10 mt-24">
  <div className="w-full px-8 py-36 bg-[#FC0F49] text-center overflow-">
    <h2 className="font-tech text-[#0A0A0A] text-[36rem] mt-4">
      36
    </h2>
    <p className="text-[#0A0A0A] font-geist mt-2 font-extrabold uppercase">
      Where Innovation Meets Me
    </p>
  </div>
</footer>
    </div>
  );
}
