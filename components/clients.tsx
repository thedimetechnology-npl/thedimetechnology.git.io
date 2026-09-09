"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import fallbackData from "@/data/clients.json"

export function Clients() {
  const [clientsData, setClientsData] = useState(fallbackData)
  useEffect(() => {
    fetch("/api/public/data/clients.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j && j.clients) setClientsData(j) })
      .catch(() => {})
  }, [])
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 sm:mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {clientsData.clients.map((client, index) => (
            <div
              key={index}
              className="group relative grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 hover:scale-110 p-3 sm:p-4 rounded-xl hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={120}
                height={60}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain brightness-200 hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
