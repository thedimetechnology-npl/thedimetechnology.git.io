"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Code, Search, Users, Wrench, Rocket, Lightbulb, ArrowRight } from "lucide-react"
import fallbackData from "@/data/services.json"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Search,
  Users,
  Wrench,
  Rocket,
  Lightbulb,
}

const gradients = [
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-teal-500 to-cyan-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-teal-500",
  "from-blue-500 to-cyan-500",
]

export function Services() {
  const [servicesData, setServicesData] = useState(fallbackData)
  useEffect(() => {
    fetch("/api/public/data/services.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j && j.services) setServicesData(j) })
      .catch(() => {})
  }, [])
  return (
    <section id="services" className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">{servicesData.sectionTitle}</h2>
          <p className="text-slate-400 text-lg">{servicesData.sectionSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon]
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {IconComponent && <IconComponent className="h-7 w-7 text-slate-900" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all hover:text-cyan-300"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
