"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import fallbackData from "@/data/stats.json"

const gradients = [
  "from-cyan-400 to-blue-400",
  "from-blue-400 to-indigo-400",
  "from-teal-400 to-cyan-400",
  "from-indigo-400 to-blue-400",
]

export function Stats() {
  const [statsData, setStatsData] = useState(fallbackData)
  useEffect(() => {
    fetch("/api/public/data/stats.json", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((j) => { if (j) setStatsData(j) }).catch(() => {})
  }, [])
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Stats Image with floating animation */}
          <div className="relative order-2 lg:order-1">
            <div className="animate-float">
              <Image
                src={statsData.image || "/placeholder.svg"}
                alt="Company Statistics"
                width={500}
                height={400}
                className="w-full max-w-xs sm:max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 order-1 lg:order-2">
            {statsData.stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 group"
              >
                <p
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent mb-1 sm:mb-2`}
                >
                  {stat.value}
                </p>
                <p className="text-slate-400 font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
