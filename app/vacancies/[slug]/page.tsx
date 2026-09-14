import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, Mail, ExternalLink, CheckCircle2 } from "lucide-react"
import vacanciesData from "@/data/vacancies.json"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return vacanciesData.vacancies.filter((v) => v.published).map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = vacanciesData.vacancies.find((v) => v.slug === slug)
  if (!job) return { title: "Vacancy Not Found" }
  return {
    title: `${job.title} — Careers`,
    description: job.description,
  }
}

export default async function VacancyDetailPage({ params }: Props) {
  const { slug } = await params
  const job = vacanciesData.vacancies.find((v) => v.slug === slug && v.published)
  if (!job) notFound()

  const isExpired = new Date(job.deadline) < new Date()

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <section className="pt-28 pb-8 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <Link href="/vacancies" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Vacancies
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
              {job.employmentType}
            </Badge>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              {job.department}
            </Badge>
            {job.featured && <Badge className="bg-yellow-500 text-slate-900 border-0">Featured</Badge>}
            {isExpired && <Badge variant="destructive">Expired</Badge>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{job.title}</h1>
          <p className="text-slate-400 leading-relaxed">{job.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" /> Location
              </p>
              <p className="text-sm text-white font-medium mt-1">{job.location}</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> Experience
              </p>
              <p className="text-sm text-white font-medium mt-1">{job.experience}</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-cyan-400" /> Salary
              </p>
              <p className="text-sm text-white font-medium mt-1">{job.salary}</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-cyan-400" /> Deadline
              </p>
              <p className="text-sm text-white font-medium mt-1">{job.deadline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold" disabled={isExpired}>
              <a href={job.applyLink?.startsWith("#") ? "/#contact" : job.applyLink} target={job.applyLink?.startsWith("#") ? undefined : "_blank"}>
                {isExpired ? "Applications Closed" : "Apply Now"} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              <a href={`mailto:${job.applyEmail}?subject=Application for ${encodeURIComponent(job.title)} - ${job.slug}`}>
                <Mail className="mr-2 h-4 w-4" /> Email Your CV
              </a>
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">Posted: {job.postedDate} • Send CV to {job.applyEmail}</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-400" /> Responsibilities
            </h3>
            <ul className="space-y-3">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-400" /> Requirements
            </h3>
            <ul className="space-y-3">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Benefits & Perks</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {job.benefits.map((b, i) => (
                <div key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-cyan-400">✓</span> {b}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <h3 className="text-white font-semibold mb-2">Interested? We’d love to hear from you.</h3>
            <p className="text-slate-400 text-sm mb-4">Send your CV and portfolio to {job.applyEmail} or apply via the button below.</p>
            <div className="flex justify-center gap-3">
              <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">
                <a href={`mailto:${job.applyEmail}?subject=Application for ${encodeURIComponent(job.title)}`}>Apply via Email</a>
              </Button>
              <Button asChild variant="outline" className="border-slate-700 text-white">
                <Link href="/vacancies">Browse More Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
