import fs from "fs"
import path from "path"
import fallbackBlogs from "@/data/blogs.json"

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  date: string
  category: string
  tags: string[]
  skills?: string[]
  company?: string
  country?: string
  featured?: boolean
  published: boolean
  seoTitle?: string
  seoDescription?: string
  readingTime?: number
}

const blogsPath = path.join(process.cwd(), "data", "blogs.json")

export function getAllBlogs(): BlogPost[] {
  // Try fs first (local dev / build)
  try {
    if (fs.existsSync(blogsPath)) {
      const raw = fs.readFileSync(blogsPath, "utf-8")
      const data: BlogPost[] = JSON.parse(raw)
      if (Array.isArray(data) && data.length > 0) return data
    }
  } catch {}
  // Fallback to bundled JSON (Edge/Workers where fs unavailable, or build-time fallback)
  try {
    if (Array.isArray(fallbackBlogs) && fallbackBlogs.length > 0) return fallbackBlogs as BlogPost[]
  } catch {}
  return []
}

// D1-aware async version - live prefers D1 (admin edits) then fs then bundled fallback
export async function getAllBlogsAsync(): Promise<BlogPost[]> {
  try {
    const { d1Get } = await import("./d1")
    const v = await d1Get("blogs.json")
    if (Array.isArray(v) && v.length > 0) return v as BlogPost[]
  } catch {}
  return getAllBlogs()
}

export function getPublishedBlogs(): BlogPost[] {
  return getAllBlogs()
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPublishedBlogsAsync(): Promise<BlogPost[]> {
  const all = await getAllBlogsAsync()
  return all.filter((b) => b.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((b) => b.slug === slug && b.published)
}

export async function getBlogBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  const all = await getAllBlogsAsync()
  return all.find((b) => b.slug === slug && b.published)
}

export function getFeaturedBlogs(): BlogPost[] {
  return getPublishedBlogs().filter((b) => b.featured)
}

export function getBlogsByCategory(cat: string): BlogPost[] {
  return getPublishedBlogs().filter((b) => b.category.toLowerCase() === cat.toLowerCase())
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getPublishedBlogs().map((b) => b.category)))
}

export async function getAllCategoriesAsync(): Promise<string[]> {
  const pubs = await getPublishedBlogsAsync()
  return Array.from(new Set(pubs.map((b) => b.category)))
}

export function getAllTags(): string[] {
  const s = new Set<string>()
  getPublishedBlogs().forEach((b) => b.tags.forEach((t) => s.add(t)))
  return Array.from(s)
}

export async function getAllTagsAsync(): Promise<string[]> {
  const pubs = await getPublishedBlogsAsync()
  const s = new Set<string>()
  pubs.forEach((b) => b.tags.forEach((t) => s.add(t)))
  return Array.from(s)
}
