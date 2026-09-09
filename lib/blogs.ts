import fs from "fs"
import path from "path"

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
  if (!fs.existsSync(blogsPath)) return []
  const raw = fs.readFileSync(blogsPath, "utf-8")
  const data: BlogPost[] = JSON.parse(raw)
  return data
}

export function getPublishedBlogs(): BlogPost[] {
  return getAllBlogs()
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((b) => b.slug === slug && b.published)
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

export function getAllTags(): string[] {
  const s = new Set<string>()
  getPublishedBlogs().forEach((b) => b.tags.forEach((t) => s.add(t)))
  return Array.from(s)
}
