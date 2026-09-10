import { NextResponse } from "next/server"

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dime-technology-secret-key-change-in-production-32chars!"
}
function toBase64Url(str: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(str).toString("base64url")
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
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

export async function GET() {
  const payload = JSON.stringify({ username: "test", exp: Date.now() + 86400000 })
  const b64 = toBase64Url(payload)
  const sig = await sign(b64)
  return NextResponse.json({ b64, sig, secretPrefix: getSecret().slice(0,4), payload })
}
