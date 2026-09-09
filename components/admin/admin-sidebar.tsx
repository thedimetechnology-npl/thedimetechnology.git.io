"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  Zap,
  Info,
  Briefcase,
  Workflow,
  BarChart3,
  Users,
  MessageSquareQuote,
  Handshake,
  Cpu,
  Mail,
  LogOut,
  Home,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/site-config", label: "Site Config", icon: Settings },
  { href: "/admin/hero", label: "Hero", icon: Zap },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/process", label: "Process", icon: Workflow },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/clients", label: "Clients", icon: Handshake },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Cpu },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-slate-900">
            D
          </div>
          <div>
            <p className="font-semibold text-white text-sm">The Dime Technology</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Home className="h-4 w-4" />
          View Website
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
