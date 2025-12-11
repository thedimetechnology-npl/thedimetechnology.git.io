"use client"

import type React from "react"
import { MessageSquare, Pencil, Code2, CheckCircle } from "lucide-react"
import processData from "@/data/process.json"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Pencil,
  Code2,
  CheckCircle,
}

export function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{processData.sectionTitle}</h2>
          <p className="text-slate-400 text-lg">{processData.sectionSubtitle}</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-full" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processData.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon]
              return (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 rounded-full bg-slate-800 border-4 border-cyan-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:border-cyan-500/60 group-hover:shadow-cyan-500/20 transition-all group-hover:scale-110">
                      {IconComponent && <IconComponent className="h-8 w-8 text-cyan-400" />}
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-400 px-3 py-1 rounded-full shadow-lg">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
