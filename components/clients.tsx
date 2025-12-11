"use client"

import Image from "next/image"
import clientsData from "@/data/clients.json"

export function Clients() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold tracking-wider uppercase mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clientsData.clients.map((client, index) => (
            <div
              key={index}
              className="group relative grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 hover:scale-110 p-4 rounded-xl hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain brightness-200 hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
