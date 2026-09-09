import type { MetadataRoute } from "next"
import { getPublishedBlogs } from "@/lib/blogs"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thedimetechnology.com.np"
  const now = new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy/privacy.html`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
  const blogs: MetadataRoute.Sitemap = getPublishedBlogs().map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
  return [...staticPages, ...blogs]
}
