"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type T = { name: string; location: string; company?: string; designation?: string; rating: number; feedback: string; image: string }

export default function TestimonialsAdmin() {
  const [data, setData] = useState<T[] | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/testimonials.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/testimonials.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Testimonials saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Testimonials" description={`${data.length} entries`} saving={saving} onSave={save} />
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={() => setData([{ name: "", location: "", rating: 5, feedback: "", image: "/assets/img/testimonials/", company: "", designation: "" }, ...data])} className="border-slate-700 text-white"><Plus className="h-4 w-4 mr-2" />Add Testimonial (new on top)</Button>
      </div>
      <div className="grid gap-4">
        {data.map((t, i) => (
          <Card key={i} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-base">{t.name || `Entry #${i + 1}`} — {t.location}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div><Label className="text-slate-300">Name</Label><Input value={t.name} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], name: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Location</Label><Input value={t.location} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], location: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Rating</Label><Select value={String(t.rating)} onValueChange={(v) => { const arr = [...data]; arr[i] = { ...arr[i], rating: Number(v) }; setData(arr) }}><SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1"><SelectValue /></SelectTrigger><SelectContent>{[1,2,3,4,5].map(n=> <SelectItem key={n} value={String(n)}>{n} Stars</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Company</Label><Input value={t.company || ""} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], company: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div><Label className="text-slate-300">Designation</Label><Input value={t.designation || ""} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], designation: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              </div>
              <ImageUpload label="Image" value={t.image} onChange={(v) => { const arr = [...data]; arr[i] = { ...arr[i], image: v }; setData(arr) }} folder="assets/img/testimonials" />
              <div><Label className="text-slate-300">Feedback</Label><Textarea value={t.feedback} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], feedback: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" rows={2} /></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
