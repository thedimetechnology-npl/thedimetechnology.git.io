import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllBlogs, getPublishedBlogs, getBlogBySlug } from "@/lib/blogs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Tag, ArrowLeft, Building2, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export async function generateStaticParams() {
  return getPublishedBlogs().map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: `https://thedimetechnology.com.np/blog/${post.slug}`,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage],
    },
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const related = getPublishedBlogs().filter((b) => b.category === post.category && b.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.seoDescription,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author, url: "https://www.shahidalam.com.np/" },
    publisher: {
      "@type": "Organization",
      name: "The Dime Technology",
      logo: { "@type": "ImageObject", url: "https://thedimetechnology.com.np/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://thedimetechnology.com.np/blog/${post.slug}` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thedimetechnology.com.np/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thedimetechnology.com.np/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://thedimetechnology.com.np/blog/${post.slug}` },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="pt-24">
        {/* Cover hero */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-cyan-500 text-slate-900">{post.category}</Badge>
              {post.featured && <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">Featured</Badge>}
              {post.country && <Badge variant="outline" className="border-slate-700 text-slate-300 flex items-center gap-1"><Globe className="h-3 w-3" />{post.country}</Badge>}
              {post.company && <Badge variant="outline" className="border-slate-700 text-slate-300 flex items-center gap-1"><Building2 className="h-3 w-3" />{post.company}</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
              <span>By {post.author}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="text-xs bg-white/10 hover:bg-white/15 text-slate-300 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors">
                  <Tag className="h-3 w-3" />{t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-8">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover" />
          </div>

          <div className="prose prose-invert prose-cyan max-w-none">
            {post.content.split("\n").map((para, i) => {
              if (!para.trim()) return null
              if (para.startsWith("**") && para.endsWith("**")) return <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>
              if (para.startsWith("- ")) return <li key={i} className="text-slate-300 ml-4 list-disc">{para.slice(2)}</li>
              if (para.startsWith("**a.") || para.startsWith("**b.") || para.startsWith("**c.")) return <h4 key={i} className="font-semibold text-cyan-300 mt-4">{para.replace(/\*\*/g, "")}</h4>
              return <p key={i} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">{para}</p>
            })}
          </div>

          {/* Skills */}
          {post.skills && post.skills.length > 0 && (
            <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-sm font-semibold text-white mb-2">Skills Used</p>
              <div className="flex flex-wrap gap-2">
                {post.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">{s}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-slate-900 border border-cyan-500/20">
            <h3 className="font-semibold text-white mb-1">Need similar solution?</h3>
            <p className="text-sm text-slate-400 mb-3">We built this for {post.company || "a global client"} — let&apos;s discuss your project.</p>
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold px-5 py-2.5 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-colors">
              Start a Project
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 pb-12">
            <h3 className="font-semibold text-white mb-4">Related Projects</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-cyan-500/30 transition-colors">
                  <img src={r.coverImage} alt={r.title} className="w-full aspect-[16/10] object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-medium text-white line-clamp-2">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{r.category} • {r.readingTime} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  )
}
