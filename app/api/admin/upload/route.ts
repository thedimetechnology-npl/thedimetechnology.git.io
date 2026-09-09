import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import fs from "fs"
import path from "path"

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

  // folder inside public: e.g. uploads, assets/img/team, assets/img/testimonials, etc.
  // whitelist folders to prevent path traversal
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_\-]/g, "").replace(/^\/+/, "")
  const targetDir = path.join(process.cwd(), "public", safeFolder)
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })

  const filePath = path.join(targetDir, filename)
  fs.writeFileSync(filePath, buffer)

  const publicPath = `/${safeFolder}/${filename}`.replace(/\/+/g, "/")
  return NextResponse.json({ success: true, url: publicPath, filename })
}
