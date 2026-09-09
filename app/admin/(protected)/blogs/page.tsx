"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AdminHeader } from "@/components/admin/admin-header"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"
import { Plus, Trash2, Pencil, FileText, Search, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BlogPost = {
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

const emptyPost: BlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: "Shahid Alam",
  date: new Date().toISOString().slice(0, 10),
  category: "Full-Stack",
  tags: [],
  skills: [],
  company: "",
  country: "",
  featured: false,
  published: true,
  seoTitle: "",
  seoDescription: "",
  readingTime: 4,
}

const CATEGORIES = ["Mobile App", "Full-Stack", "Programming Language", "Network and System", "Information and Security", "DevOps", "Graphic and Video Editing"]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export default function BlogsAdmin() {
  const [data, setData] = useState<BlogPost[] | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const load = async () => {
    const res = await fetch("/api/admin/data/blogs.json")
    if (res.ok) setData(await res.json())
    else toast.error("Failed to load blogs")
  }
  useEffect(() => { load() }, [])

  const saveAll = async (next: BlogPost[]) => {
    setSaving(true)
    const res = await fetch("/api/admin/data/blogs.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) })
    setSaving(false)
    if (res.ok) { toast.success("Saved"); setData(next) }
    else toast.error("Save failed")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
    const next = (data || []).filter((b) => b.id !== id)
    await saveAll(next)
  }

  const openCreate = () => { setEditing({ ...emptyPost, id: Date.now().toString(36) }); setDialogOpen(true) }
  const openEdit = (post: BlogPost) => { setEditing({ ...post }); setDialogOpen(true) }

  const handleSaveEdit = async () => {
    if (!editing) return
    if (!editing.title.trim() || !editing.slug.trim()) { toast.error("Title & slug required"); return }
    // auto reading time
    const words = editing.content.split(/\s+/).length
    const rt = Math.max(2, Math.ceil(words / 200))
    const toSave = { ...editing, readingTime: rt, seoTitle: editing.seoTitle || editing.title, seoDescription: editing.seoDescription || editing.excerpt }
    const exists = data?.find((b) => b.id === toSave.id)
    let next: BlogPost[]
    if (exists) next = (data || []).map((b) => (b.id === toSave.id ? toSave : b))
    else next = [toSave, ...(data || [])]
    await saveAll(next)
    setDialogOpen(false)
    setEditing(null)
  }

  if (!data) return <p className="text-slate-400">Loading blogs...</p>

  const filtered = data.filter((b) => !search || `${b.title} ${b.slug} ${b.category} ${b.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <AdminHeader title="Blogs — Project Portfolio" description={`${data.length} posts • SEO optimized • from freelancer-shahid.blogspot.com`} saving={saving} onSave={() => saveAll(data)} />

      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, slug, tag..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold shrink-0">
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((post) => (
          <Card key={post.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4 flex gap-4">
              <img src={post.coverImage} alt={post.title} className="w-28 h-20 rounded-xl object-cover border border-slate-800 bg-slate-800 shrink-0 hidden sm:block" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white line-clamp-1">{post.title}</h3>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="h-8 w-8 text-cyan-400"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="h-8 w-8 text-red-400"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-1"><Calendar className="h-3 w-3" />{post.date} • {post.readingTime} min • /blog/{post.slug}</p>
                <p className="text-sm text-slate-400 line-clamp-2 mt-1">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-300">{post.category}</Badge>
                  {post.featured && <Badge className="text-[10px] bg-yellow-500/20 text-yellow-300 border-yellow-500/20">Featured</Badge>}
                  {!post.published && <Badge variant="destructive" className="text-[10px]">Draft</Badge>}
                  {post.tags.slice(0, 3).map((t) => <Badge key={t} variant="secondary" className="text-[10px] bg-slate-800 text-slate-400">{t}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-slate-500 py-12">No posts match search.</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null) }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2"><FileText className="h-5 w-5 text-cyan-400" />{editing?.id && data.find((b) => b.id === editing.id) ? "Edit Post" : "New Post"}</DialogTitle>
            <DialogDescription className="text-slate-400">SEO: title, slug, excerpt + content. Slug is URL: /blog/[slug]</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Title *</Label><Input value={editing.title} onChange={(e) => { const v = e.target.value; setEditing({ ...editing, title: v, slug: editing.slug || slugify(v) }) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Slug *</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="my-post-slug" /></div>
              </div>
              <div><Label className="text-slate-300">Excerpt (SEO meta)</Label><Textarea value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={2} /></div>
              <ImageUpload label="Cover Image" value={editing.coverImage} onChange={(v) => setEditing({ ...editing, coverImage: v })} folder="assets/img/blog" />
              <div><Label className="text-slate-300">Content (supports paragraphs & **bold** & - list)</Label><Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={10} placeholder="Write project details, feedback, tech stack..." /></div>

              <div className="grid md:grid-cols-3 gap-4">
                <div><Label className="text-slate-300">Category</Label><Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}><SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1"><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                <div><Label className="text-slate-300">Date</Label><Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Author</Label><Input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Company</Label><Input value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Mazenet Solution" /></div>
                <div><Label className="text-slate-300">Country</Label><Input value={editing.country || ""} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="India" /></div>
              </div>
              <div><Label className="text-slate-300">Tags (comma separated)</Label><Input value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Flutter, ATS, Python" /></div>
              <div><Label className="text-slate-300">Skills (comma separated)</Label><Input value={(editing.skills || []).join(", ")} onChange={(e) => setEditing({ ...editing, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Flutter, Node.JS, DevOps" /></div>

              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">SEO Title</Label><Input value={editing.seoTitle || ""} onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Fallback to Title" /></div>
                <div><Label className="text-slate-300">SEO Description</Label><Input value={editing.seoDescription || ""} onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Fallback to excerpt" /></div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2"><Switch checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} /><Label className="text-slate-300">Featured</Label></div>
                <div className="flex items-center gap-2"><Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label className="text-slate-300">Published</Label></div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setDialogOpen(false); setEditing(null) }} className="border-slate-700 text-white">Cancel</Button>
                <Button onClick={handleSaveEdit} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">Save Post</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
