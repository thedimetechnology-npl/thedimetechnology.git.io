import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dime-technology-secret-key-change-in-production-32chars!"
}
function toBase64Url(str: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(str).toString("base64url")
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
function fromBase64Url(b64: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(b64, "base64url").toString()
  const pad = b64.length % 4 ? "=".repeat(4 - b64.length % 4) : ""
  const base64 = b64.replace(/-/g, "+").replace(/_/g, "/") + pad
  return atob(base64)
}
async function sign(payload: string): Promise<string> {
  const secret = getSecret()
  const enc = new TextEncoder()
  const subtle = (globalThis as any).crypto?.subtle || (crypto as any)?.subtle
  if (subtle) {
    const key = await subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
    const sig = await subtle.sign("HMAC", key, enc.encode(payload))
    return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")
  }
  const nodeCrypto: any = await import("crypto")
  const c = nodeCrypto.default || nodeCrypto
  return c.createHmac("sha256", secret).update(payload).digest("hex")
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value || req.cookies.get("admin_session")?.value
  if (!token) return NextResponse.json({ error: "no token", hasCookie: !!cookieStore.get("admin_session")?.value })
  const [b64, sig] = token.split(".")
  const expected = await sign(b64)
  let payload: any = null
  try { payload = JSON.parse(fromBase64Url(b64)) } catch {}
  return NextResponse.json({ token: token.slice(0,20)+"...", b64: b64.slice(0,20)+"...", sig: sig.slice(0,10)+"...", expected: expected.slice(0,10)+"...", match: sig===expected, payload, now: Date.now(), secretPrefix: getSecret().slice(0,4) })
}
