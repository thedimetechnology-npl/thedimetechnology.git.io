"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

type Props = {
  label?: string
  value: string
  onChange: (url: string) => void
  folder?: string // e.g. "assets/img/testimonials" or "uploads"
}

export function ImageUpload({ label = "Image", value, onChange, folder = "uploads" }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", folder)
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || "Upload failed")
      onChange(j.url)
      toast.success("Image uploaded")
    } catch (e: any) {
      toast.error(e.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) uploadFile(f)
    e.target.value = ""
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) uploadFile(f)
  }

  return (
    <div className="space-y-2">
      <Label className="text-slate-300">{label}</Label>
      {/* Preview */}
      {value ? (
        <div className="relative group w-fit">
          <img src={value} alt="preview" className="h-20 w-auto rounded-xl border border-slate-700 bg-slate-800 object-contain p-1" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title="Clear"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}

      {/* URL input + upload */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/assets/img/testimonials/image.jpg or https://..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="border-slate-700 text-white hover:bg-slate-700 shrink-0"
          title="Upload image"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{uploading ? "Uploading..." : "Upload"}</span>
        </Button>
      </div>

      {/* Drag & drop area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-dashed cursor-pointer text-xs transition-colors ${dragOver ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"}`}
      >
        <Upload className="h-4 w-4" />
        Drag & drop image here or click to browse (max 5MB, JPG/PNG/WEBP/SVG)
      </div>

      <input ref={inputRef} type="file" accept="image/*,.svg" className="hidden" onChange={onFile} />
    </div>
  )
}
