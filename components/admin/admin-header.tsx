"use client"

import { Button } from "@/components/ui/button"
import { Save, Loader2 } from "lucide-react"

export function AdminHeader({ title, description, saving, onSave }: { title: string; description?: string; saving?: boolean; onSave?: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>
      {onSave && (
        <Button onClick={onSave} disabled={saving} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      )}
    </div>
  )
}
