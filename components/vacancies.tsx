"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Briefcase, Clock, DollarSign, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import fallbackData from "@/data/vacancies.json"

type Vacancy = (typeof fallbackData.vacancies)[number]

export function Vacancies() {
  const [data, setData] = useState(fallbackData)

  useEffect(() => {
    fetch("/api/public/data/vacancies.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && Array.isArray(j.vacancies)) setData(j)
      })
      .catch(() => {})
  }, [])

  const published = data.vacancies.filter((v) => v.published)

  if (published.length === 0) return null

  return (
    <section id="vacancies" className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Careers • Vacancies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">{data.sectionTitle}</h2>
          <p className="text-slate-400 text-lg">{data.sectionSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.slice(0, 6).map((job) => (
            <div
              key={job.id}
              className="group p-6 rounded-2xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-xs">
                  {job.employmentType}
                </Badge>
                {job.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 text-xs border-0">Featured</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2">
                {job.title}
              </h3>
              <p className="text-cyan-400 text-sm font-medium mb-3">{job.department}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{job.description}</p>

              <div className="space-y-2 mb-5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>{job.experience}</span>
                  <span className="mx-1">•</span>
                  <DollarSign className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold">
                  <Link href={`/vacancies/${job.slug}`}>
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:text-white">
                  <a href={job.applyLink?.startsWith("#") ? job.applyLink : job.applyLink} target={job.applyLink?.startsWith("#") ? undefined : "_blank"}>
                    Apply
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {published.length > 3 && (
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:text-cyan-300">
              <Link href="/vacancies">
                View All Openings ({published.length}) <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
