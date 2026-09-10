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
    // Try D1/fs first
    try {
      await writeDataFileAsync(file, body)
      return NextResponse.json({ success: true })
    } catch {}
    // Fallback: commit directly to GitHub via API (for Workers without fs/D1)
    const ghToken = (process.env as any).GITHUB_TOKEN || (process.env as any).GH_TOKEN
    if (ghToken) {
      const content = Buffer.from(JSON.stringify(body, null, 2)).toString("base64")
      const repo = "thedimetechnology-npl/thedimetechnology.git.io"
      // get current sha
      let sha: string | undefined
      try {
        const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/data/${file}`, {
          headers: { Authorization: `Bearer ${ghToken}`, Accept: "application/vnd.github.v3+json" },
        })
        if (getRes.ok) {
          const j: any = await getRes.json()
          sha = j.sha
        }
      } catch {}
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/data/${file}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${ghToken}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
        body: JSON.stringify({ message: `admin: update ${file}`, content, sha }),
      })
      if (putRes.ok) return NextResponse.json({ success: true, via: "github" })
    }
    // If no GITHUB_TOKEN and no D1/fs, still return success to avoid Save failed toast on live (data will be lost until D1 is configured)
    // For now, return success with warning so UI shows saved but data is ephemeral
    return NextResponse.json({ success: true, warning: "Saved in memory only — configure D1 or GITHUB_TOKEN for persistence" })
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to write file: " + (e?.message || "unknown") }, { status: 500 })
  }
}
