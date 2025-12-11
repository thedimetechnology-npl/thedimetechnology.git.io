"use client"

import Image from "next/image"
import { Linkedin, Github, Mail } from "lucide-react"
import teamData from "@/data/team.json"

export function Team() {
  return (
    <section id="team" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet the Experts</h2>
          <p className="text-slate-400 text-lg">
            Our team is a diverse group of dedicated professionals united by a passion for innovation and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-cyan-300 text-sm font-medium">{member.role}</p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
