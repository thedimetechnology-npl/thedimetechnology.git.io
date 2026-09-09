"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type Step = { icon: string; title: string; description: string }
type Data = { sectionTitle: string; sectionSubtitle: string; steps: Step[]; heroFlow: { step: string; icon: string }[] }
const ICONS = ["MessageSquare", "Pencil", "Code2", "CheckCircle"]

export default function ProcessAdmin() {
  const [data, setData] = useState<Data | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/process.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/process.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Process saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Process" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white">Section Header</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-slate-300">Title</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
            <div><Label className="text-slate-300">Subtitle</Label><Input value={data.sectionSubtitle} onChange={(e) => setData({ ...data, sectionSubtitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white flex items-center justify-between">Steps <Button size="sm" variant="outline" onClick={() => setData({ ...data, steps: [...data.steps, { icon: "MessageSquare", title: "", description: "" }] })} className="border-slate-700"><Plus className="h-4 w-4 mr-1" />Add</Button></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {data.steps.map((s, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-800/50 space-y-3">
                <div className="flex justify-between"><span className="text-cyan-400 text-sm">Step {i + 1}</span><Button variant="ghost" size="icon" onClick={() => setData({ ...data, steps: data.steps.filter((_, idx) => idx !== i) })} className="text-red-400 h-8 w-8"><Trash2 className="h-4 w-4" /></Button></div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div><Label className="text-slate-300">Title</Label><Input value={s.title} onChange={(e) => { const arr = [...data.steps]; arr[i] = { ...arr[i], title: e.target.value }; setData({ ...data, steps: arr }) }} className="bg-slate-900 border-slate-700 text-white mt-1" /></div>
                  <div><Label className="text-slate-300">Icon</Label><Select value={s.icon} onValueChange={(v) => { const arr = [...data.steps]; arr[i] = { ...arr[i], icon: v }; setData({ ...data, steps: arr }) }}><SelectTrigger className="bg-slate-900 border-slate-700 text-white mt-1"><SelectValue /></SelectTrigger><SelectContent>{ICONS.map((ic) => <SelectItem key={ic} value={ic}>{ic}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <div><Label className="text-slate-300">Description</Label><Textarea value={s.description} onChange={(e) => { const arr = [...data.steps]; arr[i] = { ...arr[i], description: e.target.value }; setData({ ...data, steps: arr }) }} className="bg-slate-900 border-slate-700 text-white mt-1" rows={2} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
