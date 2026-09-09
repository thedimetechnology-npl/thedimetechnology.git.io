"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"

type SiteConfig = {
  company: { name: string; shortName: string; tagline: string; description: string; logo: string; freelanceLink: string; videoUrl: string; youtubeUrl: string }
  contact: { address: string; phone: string; email: string; workingHours: string }
  social: { facebook: string; twitter: string; instagram: string; linkedin: string }
  navigation: { href: string; label: string }[]
  footerLinks: { quickLinks: string[]; legal: { label: string; href: string }[] }
}

export default function SiteConfigAdmin() {
  const [data, setData] = useState<SiteConfig | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/data/site-config.json").then((r) => r.json()).then(setData)
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/site-config.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Site config saved")
    else toast.error("Save failed")
  }

  if (!data) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <AdminHeader title="Site Configuration" description="Global company & contact settings" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Company</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Name</Label>
              <Input value={data.company.name} onChange={(e) => setData({ ...data, company: { ...data.company, name: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Short Name</Label>
              <Input value={data.company.shortName} onChange={(e) => setData({ ...data, company: { ...data.company, shortName: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Tagline</Label>
              <Input value={data.company.tagline} onChange={(e) => setData({ ...data, company: { ...data.company, tagline: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Logo (letter)</Label>
              <Input value={data.company.logo} onChange={(e) => setData({ ...data, company: { ...data.company, logo: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea value={data.company.description} onChange={(e) => setData({ ...data, company: { ...data.company, description: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" rows={2} />
            </div>
            <div>
              <Label className="text-slate-300">Freelance Link</Label>
              <Input value={data.company.freelanceLink} onChange={(e) => setData({ ...data, company: { ...data.company, freelanceLink: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">YouTube URL</Label>
              <Input value={data.company.youtubeUrl} onChange={(e) => setData({ ...data, company: { ...data.company, youtubeUrl: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-slate-300">Video URL</Label>
              <Input value={data.company.videoUrl} onChange={(e) => setData({ ...data, company: { ...data.company, videoUrl: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Address</Label>
              <Input value={data.contact.address} onChange={(e) => setData({ ...data, contact: { ...data.contact, address: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Phone</Label>
              <Input value={data.contact.phone} onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Email</Label>
              <Input value={data.contact.email} onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Working Hours</Label>
              <Input value={data.contact.workingHours} onChange={(e) => setData({ ...data, contact: { ...data.contact, workingHours: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Facebook</Label>
              <Input value={data.social.facebook} onChange={(e) => setData({ ...data, social: { ...data.social, facebook: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Twitter</Label>
              <Input value={data.social.twitter} onChange={(e) => setData({ ...data, social: { ...data.social, twitter: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Instagram</Label>
              <Input value={data.social.instagram} onChange={(e) => setData({ ...data, social: { ...data.social, instagram: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">LinkedIn</Label>
              <Input value={data.social.linkedin} onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value } })} className="bg-slate-800 border-slate-700 text-white mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
