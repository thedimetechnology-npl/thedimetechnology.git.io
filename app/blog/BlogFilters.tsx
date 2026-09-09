"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export default function BlogFilters({
  categories,
  tags,
  initialQ,
  initialCat,
  initialTag,
}: {
  categories: string[]
  tags: string[]
  initialQ: string
  initialCat: string
  initialTag: string
}) {
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(initialQ)

  const push = (next: Record<string, string>) => {
    const p = new URLSearchParams(sp.toString())
    Object.entries(next).forEach(([k, v]) => {
      if (!v) p.delete(k)
      else p.set(k, v)
    })
    router.push(`/blog?${p.toString()}`)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 mt-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push({ q })}
          placeholder="Search projects, skills, companies..."
          className="pl-10 bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <Select value={initialCat || "all"} onValueChange={(v) => push({ category: v === "all" ? "" : v })}>
        <SelectTrigger className="w-full lg:w-[200px] bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={initialTag || "all"} onValueChange={(v) => push({ tag: v === "all" ? "" : v })}>
        <SelectTrigger className="w-full lg:w-[200px] bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Tag" /></SelectTrigger>
        <SelectContent><SelectItem value="all">All Tags</SelectItem>{tags.slice(0, 30).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
      </Select>
      <Button onClick={() => push({ q })} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">Search</Button>
      {(initialQ || initialCat || initialTag) && (
        <Button variant="outline" onClick={() => { setQ(""); router.push("/blog") }} className="border-slate-700 text-white"><X className="h-4 w-4 mr-1" /> Clear</Button>
      )}
    </div>
  )
}
