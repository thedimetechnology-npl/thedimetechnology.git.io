"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type AboutData = {
  sectionTitle: string
  sectionDescription: string
  contentTitle: string
  contentParagraphs: string[]
  keyValues: string[]
  closingNote: string
  images: { main: string; video: string }
}

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/data/about.json").then((r) => r.json()).then(setData)
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/about.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("About saved")
    else toast.error("Save failed")
  }

  if (!data) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <AdminHeader title="About Section" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-300">Section Title</Label>
              <Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Section Description</Label>
              <Textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={2} />
            </div>
            <div>
              <Label className="text-slate-300">Content Title</Label>
              <Input value={data.contentTitle} onChange={(e) => setData({ ...data, contentTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Closing Note</Label>
              <Textarea value={data.closingNote} onChange={(e) => setData({ ...data, closingNote: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={2} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ImageUpload label="Main Image" value={data.images.main} onChange={(v) => setData({ ...data, images: { ...data.images, main: v } })} folder="assets/img" />
              <ImageUpload label="Video Image" value={data.images.video} onChange={(v) => setData({ ...data, images: { ...data.images, video: v } })} folder="assets/img" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Paragraphs
              <Button size="sm" variant="outline" onClick={() => setData({ ...data, contentParagraphs: [...data.contentParagraphs, ""] })} className="border-slate-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.contentParagraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={p} onChange={(e) => { const arr = [...data.contentParagraphs]; arr[i] = e.target.value; setData({ ...data, contentParagraphs: arr }) }} className="bg-slate-800 border-slate-700 text-white flex-1" rows={2} />
                <Button variant="ghost" size="icon" onClick={() => setData({ ...data, contentParagraphs: data.contentParagraphs.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Key Values
              <Button size="sm" variant="outline" onClick={() => setData({ ...data, keyValues: [...data.keyValues, ""] })} className="border-slate-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.keyValues.map((v, i) => (
              <div key={i} className="flex gap-2">
                <Input value={v} onChange={(e) => { const arr = [...data.keyValues]; arr[i] = e.target.value; setData({ ...data, keyValues: arr }) }} className="bg-slate-800 border-slate-700 text-white flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setData({ ...data, keyValues: data.keyValues.filter((_, idx) => idx !== i) })} className="text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
