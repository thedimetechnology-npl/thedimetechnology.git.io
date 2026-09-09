"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

type HeroData = {
  badge: string
  title: string
  titleHighlight: string
  description: string
  primaryCTA: { text: string; href: string }
  secondaryCTA: { text: string; href: string }
  image: string
}

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/data/hero.json")
      .then((r) => r.json())
      .then(setData)
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/hero.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Hero saved")
    else toast.error("Failed to save")
  }

  if (!data) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <AdminHeader title="Hero Section" description="Edit homepage hero content" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-300">Badge</Label>
              <Input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Title</Label>
                <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
              </div>
              <div>
                <Label className="text-slate-300">Title Highlight</Label>
                <Input value={data.titleHighlight} onChange={(e) => setData({ ...data, titleHighlight: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-slate-300">Description</Label>
              <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={3} />
            </div>
            <ImageUpload label="Hero Image" value={data.image} onChange={(v) => setData({ ...data, image: v })} folder="assets/img" />
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">CTAs</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Primary Text</Label>
              <Input value={data.primaryCTA.text} onChange={(e) => setData({ ...data, primaryCTA: { ...data.primaryCTA, text: e.target.value } })} className="bg-slate-800 border-slate-700 text-white" />
              <Label className="text-slate-300">Primary Href</Label>
              <Input value={data.primaryCTA.href} onChange={(e) => setData({ ...data, primaryCTA: { ...data.primaryCTA, href: e.target.value } })} className="bg-slate-800 border-slate-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Secondary Text</Label>
              <Input value={data.secondaryCTA.text} onChange={(e) => setData({ ...data, secondaryCTA: { ...data.secondaryCTA, text: e.target.value } })} className="bg-slate-800 border-slate-700 text-white" />
              <Label className="text-slate-300">Secondary Href</Label>
              <Input value={data.secondaryCTA.href} onChange={(e) => setData({ ...data, secondaryCTA: { ...data.secondaryCTA, href: e.target.value } })} className="bg-slate-800 border-slate-700 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
