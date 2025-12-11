"use client"

import { useState } from "react"
import techData from "@/data/tech-stack.json"

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="tech" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Technologies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{techData.sectionTitle}</h2>
          <p className="text-slate-400 text-lg">{techData.sectionSubtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {techData.categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === index
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 shadow-lg shadow-cyan-500/30"
                  : "bg-slate-800/50 border border-cyan-500/20 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techData.categories[activeCategory].items.map((tech, index) => (
            <div
              key={index}
              className="group p-4 rounded-2xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 text-center transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors group-hover:scale-110">
                <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {tech.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-white">{tech}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 shadow-2xl shadow-cyan-500/30">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-slate-900 mb-2">{techData.summary.technologies}</p>
              <p className="text-slate-900/70 font-medium">Technologies</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-slate-900 mb-2">{techData.summary.projects}</p>
              <p className="text-slate-900/70 font-medium">Projects Delivered</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-slate-900 mb-2">{techData.summary.experience}</p>
              <p className="text-slate-900/70 font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
