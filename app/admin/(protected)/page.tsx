import Link from "next/link"
import { Settings, Zap, Info, Briefcase, Workflow, BarChart3, Users, MessageSquareQuote, Handshake, Cpu, Mail, ArrowRight, FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const cards = [
  { href: "/admin/site-config", label: "Site Config", desc: "Company info, contact, navigation", icon: Settings, color: "from-cyan-500 to-blue-500" },
  { href: "/admin/hero", label: "Hero Section", desc: "Badge, title, CTAs", icon: Zap, color: "from-amber-500 to-orange-500" },
  { href: "/admin/about", label: "About", desc: "Story, values, images", icon: Info, color: "from-emerald-500 to-teal-500" },
  { href: "/admin/services", label: "Services", desc: "6 service cards", icon: Briefcase, color: "from-violet-500 to-purple-500" },
  { href: "/admin/process", label: "Process", desc: "Work steps & flow", icon: Workflow, color: "from-blue-500 to-indigo-500" },
  { href: "/admin/stats", label: "Stats", desc: "KPIs & hero image", icon: BarChart3, color: "from-pink-500 to-rose-500" },
  { href: "/admin/team", label: "Team", desc: "8 members", icon: Users, color: "from-cyan-500 to-teal-500" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Client feedback", icon: MessageSquareQuote, color: "from-yellow-500 to-amber-500" },
  { href: "/admin/clients", label: "Clients", desc: "Trusted logos", icon: Handshake, color: "from-green-500 to-emerald-500" },
  { href: "/admin/tech-stack", label: "Tech Stack", desc: "Categories & colors", icon: Cpu, color: "from-red-500 to-orange-500" },
  { href: "/admin/blogs", label: "Blogs", desc: "SEO blog & portfolio", icon: FileText, color: "from-teal-500 to-cyan-500" },
  { href: "/admin/messages", label: "Messages", desc: "Contact inquiries", icon: Mail, color: "from-slate-600 to-slate-800" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">Manage all content for The Dime Technology website. Changes are saved directly to JSON files.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all group h-full">
              <CardHeader>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-2`}>
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white flex items-center justify-between">
                  {c.label}
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </CardTitle>
                <CardDescription className="text-slate-400">{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Info</CardTitle>
          <CardDescription>How the admin works</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-slate-400 space-y-2 leading-relaxed">
          <p>• Each section edits a JSON file under <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">/data</code>. Saving overwrites the file on disk.</p>
          <p>• Images are paths under <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">/public/assets/...</code> – upload via URL string for now.</p>
          <p>• Login is protected by cookie session. Default credentials <b className="text-white">thedimetechnology / Info@dime2012</b>. Override via <code className="bg-slate-800 px-1.5 py-0.5 rounded">ADMIN_USERNAME</code> & <code className="bg-slate-800 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code> env vars.</p>
          <p>• Contact form submissions are stored in <code className="bg-slate-800 px-1.5 py-0.5 rounded">data/messages.json</code> and visible under Messages.</p>
        </CardContent>
      </Card>
    </div>
  )
}
