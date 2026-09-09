"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/admin-header"
import { toast } from "sonner"
import { Trash2, Mail } from "lucide-react"

type Msg = { id: string; name: string; email: string; organization?: string; country?: string; phone?: string; message: string; createdAt: string }

export default function MessagesAdmin() {
  const [data, setData] = useState<Msg[] | null>(null)

  const load = async () => {
    const res = await fetch("/api/admin/messages")
    if (res.ok) setData(await res.json())
  }
  useEffect(() => { load() }, [])

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Deleted")
      load()
    } else toast.error("Failed")
  }

  if (data === null) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <AdminHeader title="Messages" description={`${data.length} inquiries from contact form`} />
      {data.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-16 text-center">
            <Mail className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No messages yet. Contact form submissions will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data.map((m) => (
            <Card key={m.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-white text-base">{m.name} <span className="text-slate-500 font-normal">— {m.email}</span></CardTitle>
                  <p className="text-xs text-slate-500 mt-1">{new Date(m.createdAt).toLocaleString()} {m.country ? `• ${m.country}` : ""} {m.phone ? `• ${m.phone}` : ""} {m.organization ? `• ${m.organization}` : ""}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => remove(m.id)} className="text-red-400 shrink-0"><Trash2 className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-slate-800/50 p-3 rounded-xl border border-slate-800">{m.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
