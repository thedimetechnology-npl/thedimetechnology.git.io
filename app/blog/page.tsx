import type { Metadata } from "next"
import Link from "next/link"
import { getPublishedBlogs, getAllCategories, getAllTags } from "@/lib/blogs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Tag, Search, ArrowRight, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import BlogFilters from "./BlogFilters"

export const metadata: Metadata = {
  title: "Project Portfolio Blog | The Dime Technology - Freelance Case Studies",
  description:
    "Explore freelance project case studies by Shahid Alam & The Dime Technology — Warehouse Management, ZKTeco Biometrics, MSSQL Automation, ATS, Network Migration, Python tools & more. Real client work worldwide.",
  keywords: [
    "The Dime Technology blog",
    "freelance case studies",
    "Flutter warehouse app",
    "ZKTeco biometric",
    "MSSQL backup automation",
    "ATS hierarchy",
    "MikroTik to Cisco migration",
    "Python bulk image downloader",
    "project portfolio",
    "Shahid Alam blog",
  ],
  openGraph: {
    title: "Project Portfolio Blog | The Dime Technology",
    description: "Freelance project case studies and tech deep-dives by The Dime Technology.",
    type: "website",
    url: "https://thedimetechnology.com.np/blog",
  },
  alternates: { canonical: "/blog" },
}

export default function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>
}) {
  return BlogContent(searchParams)
}

async function BlogContent(searchParams: Promise<{ q?: string; category?: string; tag?: string }>) {
  const params = await searchParams
  const all = getPublishedBlogs()
  const categories = getAllCategories()
  const tags = getAllTags()

  const q = (params.q || "").toLowerCase()
  const cat = params.category || ""
  const tag = params.tag || ""

  let filtered = all
  if (q) filtered = filtered.filter((b) => `${b.title} ${b.excerpt} ${b.content} ${b.tags.join(" ")}`.toLowerCase().includes(q))
  if (cat) filtered = filtered.filter((b) => b.category === cat)
  if (tag) filtered = filtered.filter((b) => b.tags.includes(tag))

  const featured = all.filter((b) => b.featured).slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Dime Technology - Project Portfolio",
    description: "Freelance project case studies",
    url: "https://thedimetechnology.com.np/blog",
    publisher: { "@type": "Organization", name: "The Dime Technology", logo: { "@type": "ImageObject", url: "https://thedimetechnology.com.np/logo.png" } },
    blogPost: filtered.slice(0, 10).map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      description: b.excerpt,
      image: b.coverImage,
      datePublished: b.date,
      author: { "@type": "Person", name: b.author },
      url: `https://thedimetechnology.com.np/blog/${b.slug}`,
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold tracking-wider uppercase text-cyan-300 mb-4">
            Project Portfolio — Freelancer Shahid
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Freelance Project Showcase</h1>
          <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
            Real client work — migrated from <a href="https://freelancer-shahid.blogspot.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">freelancer-shahid.blogspot.com</a> — case studies, code notes and delivery stories for SEO. Filter by Country, Company or Tech Stack.
          </p>

          <BlogFilters categories={categories} tags={tags} initialQ={q} initialCat={cat} initialTag={tag} />

          <p className="text-sm text-slate-400 mt-4">{filtered.length} project(s) found • {all.length} total</p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && !q && !cat && !tag && (
        <section className="px-6 py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 mb-4 flex items-center gap-2">
              <Star className="h-4 w-4" /> Featured Case Studies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-800/50 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-800">
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">{b.category}</Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(b.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">{b.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mt-1">{b.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-center py-16">No projects match your filters. Clear search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-800 relative">
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                    {b.featured && <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 px-2 py-1 rounded-full">Featured</span>}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-300">{b.category}</Badge>
                      {b.country && <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">{b.country}</Badge>}
                    </div>
                    <h3 className="font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">{b.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mt-1 flex-1">{b.excerpt}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.readingTime} min</span>
                      <span className="flex items-center gap-1">{b.company?.slice(0, 18)} {b.company ? "•" : ""} {new Date(b.date).getFullYear()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {b.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Tag className="h-2.5 w-2.5" />{t}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 mt-3 group-hover:gap-2 transition-all">Read case study <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
