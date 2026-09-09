import { NextRequest, NextResponse } from "next/server"
import { isAllowedFile, ALLOWED_FILES } from "@/lib/admin-data"

import siteConfig from "@/data/site-config.json"
import hero from "@/data/hero.json"
import about from "@/data/about.json"
import services from "@/data/services.json"
import process from "@/data/process.json"
import stats from "@/data/stats.json"
import team from "@/data/team.json"
import testimonials from "@/data/testimonials.json"
import clients from "@/data/clients.json"
import techStack from "@/data/tech-stack.json"
import blogs from "@/data/blogs.json"

const dataMap: Record<string, unknown> = {
  "site-config.json": siteConfig,
  "hero.json": hero,
  "about.json": about,
  "services.json": services,
  "process.json": process,
  "stats.json": stats,
  "team.json": team,
  "testimonials.json": testimonials,
  "clients.json": clients,
  "tech-stack.json": techStack,
  "blogs.json": blogs,
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: `Invalid file. Allowed: ${ALLOWED_FILES.join(", ")}` }, { status: 400 })
  }
  const data = dataMap[file]
  if (data === undefined) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
}
