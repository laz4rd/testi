import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const contentDir = path.join(process.cwd(), "content");

export function getAllPosts() {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".mdx"));
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: filename.replace(".mdx", ""),
        id: data.id ?? "000",
        date: data.date ?? "",
        title: data.title ?? "",
        category: data.category ?? "",
        readTime: data.readTime ?? "",
        status: data.status ?? "PUBLISHED",
        description: data.description ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const filepath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filepath)) {
    notFound();
  }

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}