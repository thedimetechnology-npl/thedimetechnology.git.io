import { NextRequest, NextResponse } from "next/server"

function getR2(): any {
  try {
    // @ts-ignore
    if (typeof process !== "undefined" && (process.env as any).R2) return (process.env as any).R2
    // @ts-ignore
    const g: any = globalThis
    if (g?.R2) return g.R2
    if (g?.__cloudflare_context__?.env?.R2) return g.__cloudflare_context__.env.R2
  } catch {}
  return null
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params
  const r2Key = key.join("/")
  const R2 = getR2()
  if (R2) {
    const obj = await R2.get(r2Key)
    if (!obj) return new NextResponse("Not found", { status: 404 })
    const headers = new Headers()
    if (obj.httpMetadata?.contentType) headers.set("Content-Type", obj.httpMetadata.contentType)
    else headers.set("Content-Type", "application/octet-stream")
    headers.set("Cache-Control", "public, max-age=31536000, immutable")
    return new NextResponse(obj.body, { headers })
  }
  // Fallback: try filesystem (local dev)
  return new NextResponse("Not found - R2 not configured", { status: 404 })
}
