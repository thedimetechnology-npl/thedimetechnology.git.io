import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import fs from "fs"
import path from "path"

function getR2(): any {
  try {
    // @ts-ignore - Cloudflare bindings
    if (typeof process !== "undefined" && (process.env as any).R2) return (process.env as any).R2
    // @ts-ignore
    const g: any = globalThis
    if (g?.R2) return g.R2
    if (g?.__cloudflare_context__?.env?.R2) return g.__cloudflare_context__.env.R2
    if (g?.__env__?.R2) return g.__env__.R2
  } catch {}
  return null
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const folder = (formData.get("folder") as string) || "uploads"

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif", "image/jpg"]
  if (!allowed.includes(file.type) && !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files allowed" }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // sanitize filename
  const ext = path.extname(file.name) || ".png"
  const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, "_") || "image"
  const unique = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6)
  const filename = `${base}-${unique}${ext}`

  const safeFolder = folder.replace(/[^a-zA-Z0-9/_\-]/g, "").replace(/^\/+/, "")
  const r2Key = `${safeFolder}/${filename}`.replace(/\/+/g, "/")

  // Try R2 first (on Cloudflare Workers)
  const R2 = getR2()
  if (R2) {
    try {
      await R2.put(r2Key, buffer, { httpMetadata: { contentType: file.type } })
      // Return R2-served URL via our API route
      const publicPath = `/api/r2/${r2Key}`
      return NextResponse.json({ success: true, url: publicPath, filename, storage: "r2" })
    } catch (e: any) {
      // fallback to fs
    }
  }

  // Fallback to filesystem (local dev)
  try {
    const targetDir = path.join(process.cwd(), "public", safeFolder)
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })
    const filePath = path.join(targetDir, filename)
    fs.writeFileSync(filePath, buffer)
    const publicPath = `/${safeFolder}/${filename}`.replace(/\/+/g, "/")
    return NextResponse.json({ success: true, url: publicPath, filename, storage: "fs" })
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to save file: " + e.message }, { status: 500 })
  }
}
