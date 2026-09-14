import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, DollarSign, Calendar, ArrowRight } from "lucide-react"
import vacanciesData from "@/data/vacancies.json"

export const metadata: Metadata = {
  title: "Careers - Vacancies",
  description: "Join The Dime Technology — explore open positions in Engineering, Mobile, DevOps and more. Apply now!",
}

export default function VacanciesPage() {
  const vacancies = vacanciesData.vacancies.filter((v) => v.published)

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <section className="pt-28 pb-12 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Careers at DimeTech
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{vacanciesData.sectionTitle}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{vacanciesData.sectionSubtitle}</p>
          <p className="text-cyan-400 text-sm mt-4 font-medium">{vacancies.length} Open Position{vacancies.length !== 1 ? "s" : ""} • Apply before deadline</p>
        </div>
      </section>

      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {vacancies.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50">
              <p className="text-slate-400">No vacancies open right now. Check back soon!</p>
              <Button asChild className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900">
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {vacancies.map((job) => (
                <div
                  key={job.id}
                  className="group p-6 md:p-8 rounded-2xl bg-slate-900 border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                      {job.employmentType}
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                      {job.department}
                    </Badge>
                    {job.featured && <Badge className="bg-yellow-500 text-slate-900 border-0">Featured</Badge>}
                    {!job.published && <Badge variant="destructive">Draft</Badge>}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{job.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{job.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-slate-400 bg-slate-800/50 rounded-xl p-3 border border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> {job.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-cyan-400" /> {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400" /> Deadline: {job.deadline}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold">
                      <Link href={`/vacancies/${job.slug}`}>
                        View & Apply <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      <a href={`mailto:${job.applyEmail}?subject=Application for ${encodeURIComponent(job.title)}`}>Email</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
