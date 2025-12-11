"use client"

import Image from "next/image"
import statsData from "@/data/stats.json"

const gradients = [
  "from-cyan-400 to-blue-400",
  "from-blue-400 to-indigo-400",
  "from-teal-400 to-cyan-400",
  "from-indigo-400 to-blue-400",
]

export function Stats() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Image with floating animation */}
          <div className="relative">
            <div className="animate-float">
              <Image
                src={statsData.image || "/placeholder.svg"}
                alt="Company Statistics"
                width={500}
                height={400}
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {statsData.stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 group"
              >
                <p
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </p>
                <p className="text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
