import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { isAllowedFile, readDataFileAsync, writeDataFileAsync, ALLOWED_FILES } from "@/lib/admin-data"

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

const fallbackMap: Record<string, unknown> = {
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

type Params = { params: Promise<{ file: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { file } = await params
  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: `Invalid file. Allowed: ${ALLOWED_FILES.join(", ")}` }, { status: 400 })
  }
  try {
    const data = await readDataFileAsync(file)
    return NextResponse.json(data)
  } catch {
    const fb = fallbackMap[file]
    if (fb !== undefined) return NextResponse.json(fb)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { file } = await params
  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 })
  }
  try {
    const body = await req.json()
    await writeDataFileAsync(file, body)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Failed to write file" }, { status: 500 })
  }
}
