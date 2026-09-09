"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type Member = { name: string; role: string; image: string; linkedin: string; github: string; email: string; website: string }

export default function TeamAdmin() {
  const [data, setData] = useState<Member[] | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/team.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/team.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Team saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Team" description={`${data.length} members`} saving={saving} onSave={save} />
      <div className="grid gap-4">
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setData([...data, { name: "", role: "", image: "/assets/img/team/", linkedin: "#", github: "#", email: "#", website: "#" }])} className="border-slate-700 text-white"><Plus className="h-4 w-4 mr-2" />Add Member</Button>
        </div>
        {data.map((m, i) => (
          <Card key={i} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-base">{m.name || `Member #${i + 1}`} — {m.role}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setData(data.filter((_, idx) => idx !== i))} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-slate-300">Name</Label><Input value={m.name} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], name: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Role</Label><Input value={m.role} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], role: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div className="md:col-span-2"><ImageUpload label="Image" value={m.image} onChange={(v) => { const arr = [...data]; arr[i] = { ...arr[i], image: v }; setData(arr) }} folder="assets/img/team" /></div>
              <div><Label className="text-slate-300">LinkedIn</Label><Input value={m.linkedin} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], linkedin: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Github</Label><Input value={m.github} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], github: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Email</Label><Input value={m.email} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], email: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
              <div><Label className="text-slate-300">Website</Label><Input value={m.website} onChange={(e) => { const arr = [...data]; arr[i] = { ...arr[i], website: e.target.value }; setData(arr) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
