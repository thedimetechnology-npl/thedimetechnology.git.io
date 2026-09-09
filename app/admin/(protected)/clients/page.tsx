"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type ClientsData = { sectionTitle: string; clients: { name: string; logo: string }[] }

export default function ClientsAdmin() {
  const [data, setData] = useState<ClientsData | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch("/api/admin/data/clients.json").then((r) => r.json()).then(setData) }, [])
  const save = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch("/api/admin/data/clients.json", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    setSaving(false)
    if (res.ok) toast.success("Clients saved")
    else toast.error("Save failed")
  }
  if (!data) return <p className="text-slate-400">Loading...</p>
  return (
    <div>
      <AdminHeader title="Clients" saving={saving} onSave={save} />
      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white">Section</CardTitle></CardHeader>
          <CardContent><Label className="text-slate-300">Section Title</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} className="bg-slate-800 border-slate-700 text-white mt-1" /></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader><CardTitle className="text-white flex items-center justify-between">Clients <Button size="sm" variant="outline" onClick={() => setData({ ...data, clients: [...data.clients, { name: "", logo: "/assets/img/clients/" }] })} className="border-slate-700"><Plus className="h-4 w-4 mr-1" />Add</Button></CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.clients.map((c, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="flex-1"><Label className="text-slate-300">Name</Label><Input value={c.name} onChange={(e) => { const arr = [...data.clients]; arr[i] = { ...arr[i], name: e.target.value }; setData({ ...data, clients: arr }) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <div className="flex-[2]"><Label className="text-slate-300">Logo Path</Label><Input value={c.logo} onChange={(e) => { const arr = [...data.clients]; arr[i] = { ...arr[i], logo: e.target.value }; setData({ ...data, clients: arr }) }} className="bg-slate-800 border-slate-700 text-white mt-1" /></div>
                <Button variant="ghost" size="icon" onClick={() => setData({ ...data, clients: data.clients.filter((_, idx) => idx !== i) })} className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
