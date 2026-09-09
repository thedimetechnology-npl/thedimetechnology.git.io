export const dynamic = "force-dynamic"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 bg-slate-950">
        <div className="max-w-6xl mx-auto p-6 md:p-8">{children}</div>
      </main>
      <Toaster richColors />
    </div>
  )
}
