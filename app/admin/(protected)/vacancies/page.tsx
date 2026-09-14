"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Plus, Trash2, Pencil, Briefcase, Search, Calendar, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type Vacancy = {
  id: string
  slug: string
  title: string
  department: string
  location: string
  employmentType: string
  experience: string
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  applyEmail: string
  applyLink: string
  deadline: string
  postedDate: string
  featured: boolean
  published: boolean
}

type Data = {
  sectionTitle: string
  sectionSubtitle: string
  vacancies: Vacancy[]
}

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote", "Freelance"]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

const emptyVacancy: Vacancy = {
  id: "",
  slug: "",
  title: "",
  department: "Engineering",
  location: "Lalitpur, Nepal",
  employmentType: "Full-time",
  experience: "2+ Years",
  salary: "Negotiable",
  description: "",
  responsibilities: [""],
  requirements: [""],
  benefits: [""],
  applyEmail: "info@thedimetechnology.com.np",
  applyLink: "#contact",
  deadline: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  postedDate: new Date().toISOString().slice(0, 10),
  featured: false,
  published: true,
}

export default function VacanciesAdmin() {
  const [data, setData] = useState<Data | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<Vacancy | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const load = async () => {
    const res = await fetch("/api/admin/data/vacancies.json")
    if (res.ok) setData(await res.json())
    else toast.error("Failed to load vacancies")
  }
  useEffect(() => { load() }, [])

  const saveAll = async (next: Data) => {
    setSaving(true)
    const res = await fetch("/api/admin/data/vacancies.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) })
    setSaving(false)
    if (res.ok) { toast.success("Saved"); setData(next) }
    else toast.error("Save failed")
  }

  const saveHeader = async () => {
    if (!data) return
    await saveAll(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vacancy?")) return
    if (!data) return
    const next = { ...data, vacancies: data.vacancies.filter((v) => v.id !== id) }
    await saveAll(next)
  }

  const openCreate = () => { setEditing({ ...emptyVacancy, id: Date.now().toString(36) }); setDialogOpen(true) }
  const openEdit = (v: Vacancy) => { setEditing({ ...v }); setDialogOpen(true) }

  const handleSaveEdit = async () => {
    if (!editing || !data) return
    if (!editing.title.trim() || !editing.slug.trim()) { toast.error("Title & slug required"); return }
    const toSave: Vacancy = {
      ...editing,
      slug: slugify(editing.slug),
      responsibilities: editing.responsibilities.filter(Boolean),
      requirements: editing.requirements.filter(Boolean),
      benefits: editing.benefits.filter(Boolean),
    }
    const exists = data.vacancies.find((v) => v.id === toSave.id)
    let next: Data
    if (exists) next = { ...data, vacancies: data.vacancies.map((v) => (v.id === toSave.id ? toSave : v)) }
    else next = { ...data, vacancies: [toSave, ...data.vacancies] }
    await saveAll(next)
    setDialogOpen(false)
    setEditing(null)
  }

  if (!data) return <p className="text-slate-400">Loading vacancies...</p>

  const filtered = data.vacancies.filter((v) => !search || `${v.title} ${v.slug} ${v.department} ${v.location} ${v.employmentType}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <AdminHeader title="Vacancies" description={`${data.vacancies.length} openings • Careers management`} saving={saving} onSave={saveHeader} />

      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardHeader><CardTitle className="text-white text-base">Section Header (Homepage)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-slate-300">Section Title</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
          <div><Label className="text-slate-300">Subtitle</Label><Input value={data.sectionSubtitle} onChange={(e) => setData({ ...data, sectionSubtitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, department, type..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
        <Button onClick={openCreate} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold shrink-0">
          <Plus className="h-4 w-4 mr-2" /> New Vacancy
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((job) => (
          <Card key={job.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white line-clamp-1 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-cyan-400 shrink-0" />
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3" /> {job.postedDate} → {job.deadline} • <MapPin className="h-3 w-3" /> {job.location} • /vacancies/{job.slug}
                  </p>
                  <p className="text-sm text-slate-400 line-clamp-2 mt-1">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-300">{job.employmentType}</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-slate-800 text-slate-300">{job.department}</Badge>
                    {job.featured && <Badge className="text-[10px] bg-yellow-500/20 text-yellow-300 border-yellow-500/20">Featured</Badge>}
                    {!job.published && <Badge variant="destructive" className="text-[10px]">Draft</Badge>}
                    <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">{job.experience} • {job.salary}</Badge>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(job)} className="h-8 w-8 text-cyan-400"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)} className="h-8 w-8 text-red-400"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-slate-500 py-12">No vacancies match search.</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null) }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2"><Briefcase className="h-5 w-5 text-cyan-400" />{editing?.id && data.vacancies.find((v) => v.id === editing.id) ? "Edit Vacancy" : "New Vacancy"}</DialogTitle>
            <DialogDescription className="text-slate-400">Slug is URL: /vacancies/[slug]. Use #contact for apply link or external URL.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Job Title *</Label><Input value={editing.title} onChange={(e) => { const v = e.target.value; setEditing({ ...editing, title: v, slug: editing.slug || slugify(v) }) }} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Senior React Developer" /></div>
                <div><Label className="text-slate-300">Slug *</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="senior-react-developer" /></div>
              </div>

              <div><Label className="text-slate-300">Short Description</Label><Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={3} placeholder="Brief role summary..." /></div>

              <div className="grid md:grid-cols-3 gap-4">
                <div><Label className="text-slate-300">Department</Label><Input value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Engineering" /></div>
                <div><Label className="text-slate-300">Location</Label><Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Remote / Lalitpur" /></div>
                <div><Label className="text-slate-300">Employment Type</Label><Select value={editing.employmentType} onValueChange={(v) => setEditing({ ...editing, employmentType: v })}><SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1"><SelectValue /></SelectTrigger><SelectContent>{EMPLOYMENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div><Label className="text-slate-300">Experience</Label><Input value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="3+ Years" /></div>
                <div><Label className="text-slate-300">Salary</Label><Input value={editing.salary} onChange={(e) => setEditing({ ...editing, salary: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Negotiable" /></div>
                <div><Label className="text-slate-300">Deadline</Label><Input type="date" value={editing.deadline} onChange={(e) => setEditing({ ...editing, deadline: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Posted Date</Label><Input type="date" value={editing.postedDate} onChange={(e) => setEditing({ ...editing, postedDate: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Apply Email</Label><Input value={editing.applyEmail} onChange={(e) => setEditing({ ...editing, applyEmail: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="hr@company.com" /></div>
              </div>
              <div><Label className="text-slate-300">Apply Link (URL or #contact)</Label><Input value={editing.applyLink} onChange={(e) => setEditing({ ...editing, applyLink: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="#contact or https://..." /></div>

              <div>
                <Label className="text-slate-300">Responsibilities (one per line)</Label>
                <Textarea value={editing.responsibilities.join("\n")} onChange={(e) => setEditing({ ...editing, responsibilities: e.target.value.split("\n") })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={4} placeholder="Design and develop..." />
              </div>
              <div>
                <Label className="text-slate-300">Requirements (one per line)</Label>
                <Textarea value={editing.requirements.join("\n")} onChange={(e) => setEditing({ ...editing, requirements: e.target.value.split("\n") })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={4} placeholder="3+ years React..." />
              </div>
              <div>
                <Label className="text-slate-300">Benefits (one per line)</Label>
                <Textarea value={editing.benefits.join("\n")} onChange={(e) => setEditing({ ...editing, benefits: e.target.value.split("\n") })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={3} placeholder="Flexible hours..." />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2"><Switch checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} /><Label className="text-slate-300">Featured</Label></div>
                <div className="flex items-center gap-2"><Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label className="text-slate-300">Published</Label></div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setDialogOpen(false); setEditing(null) }} className="border-slate-700 text-white">Cancel</Button>
                <Button onClick={handleSaveEdit} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">Save Vacancy</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
