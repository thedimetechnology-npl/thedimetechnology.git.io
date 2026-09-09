"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type Category = { name: string; items: string[] }
type Data = { sectionTitle: string; sectionSubtitle: string; categories: Category[]; summary: { technologies: string; projects: string; experience: string } }

export default function TechStackAdmin() {
  const [data, setData] = useState<Data | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/tech-stack.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/tech-stack.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Tech stack saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Tech Stack" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white">Section Header</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-slate-300">Title</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
            <div><Label className="text-slate-300">Subtitle</Label><Input value={data.sectionSubtitle} onChange={(e) => setData({ ...data, sectionSubtitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label className="text-slate-300">Technologies</Label><Input value={data.summary.technologies} onChange={(e) => setData({ ...data, summary: { ...data.summary, technologies: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Projects</Label><Input value={data.summary.projects} onChange={(e) => setData({ ...data, summary: { ...data.summary, projects: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Experience</Label><Input value={data.summary.experience} onChange={(e) => setData({ ...data, summary: { ...data.summary, experience: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white flex items-center justify-between">Categories <Button size="sm" variant="outline" onClick={() => setData({ ...data, categories: [...data.categories, { name: "", items: [] }] })} className="border-slate-700"><Plus className="h-4 w-4 mr-1" />Add</Button></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {data.categories.map((cat, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-800/50 space-y-3">
                <div className="flex gap-3 items-end">
                  <div className="flex-1"><Label className="text-slate-300">Category Name</Label><Input value={cat.name} onChange={(e) => { const arr = [...data.categories]; arr[i] = { ...arr[i], name: e.target.value }; setData({ ...data, categories: arr }) }} className="bg-slate-900 border-slate-700 text-white mt-1" /></div>
                  <Button variant="ghost" size="icon" onClick={() => setData({ ...data, categories: data.categories.filter((_, idx) => idx !== i) })} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div>
                  <Label className="text-slate-300">Items (comma separated)</Label>
                  <Input value={cat.items.join(", ")} onChange={(e) => { const arr = [...data.categories]; arr[i] = { ...arr[i], items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; setData({ ...data, categories: arr }) }} className="bg-slate-900 border-slate-700 text-white mt-1" placeholder="React, Vue, Angular" />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cat.items.map((it) => (
                      <span key={it} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{it}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
