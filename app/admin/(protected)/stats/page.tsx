"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type Stat = { value: string; label: string }
type Data = { image: string; stats: Stat[] }

export default function StatsAdmin() {
  const [data, setData] = useState<Data | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/stats.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/stats.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Stats saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Stats" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white">Settings</CardTitle></CardHeader>
          <CardContent>
            <Label className="text-slate-300">Image Path</Label>
            <Input value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" />
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white flex items-center justify-between">Stats <Button size="sm" variant="outline" onClick={() => setData({ ...data, stats: [...data.stats, { value: "", label: "" }] })} className="border-slate-700"><Plus className="h-4 w-4 mr-1" />Add</Button></CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.stats.map((s, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="flex-1"><Label className="text-slate-300">Value</Label><Input value={s.value} onChange={(e) => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: e.target.value }; setData({ ...data, stats: arr }) }} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="50+" /></div>
                <div className="flex-[2]"><Label className="text-slate-300">Label</Label><Input value={s.label} onChange={(e) => { const arr = [...data.stats]; arr[i] = { ...arr[i], label: e.target.value }; setData({ ...data, stats: arr }) }} className="bg-slate-800 border-slate-700 text-white mt-1" placeholder="Successful Projects" /></div>
                <Button variant="ghost" size="icon" onClick={() => setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
