import { cookies } from "next/headers"

const SESSION_COOKIE = "admin_session"
const SESSION_MAX_AGE = 60 * 60 * 24 // 24h

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dime-technology-secret-key-change-in-production-32chars!"
}

function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "thedimetechnology",
    password: process.env.ADMIN_PASSWORD || "Info@dime2012",
  }
}

export function verifyCredentials(username: string, password: string) {
  const creds = getCredentials()
  return username === creds.username && password === creds.password
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
  // Workers: Web Crypto
  const subtle = (globalThis as any).crypto?.subtle || (crypto as any)?.subtle
  if (subtle) {
    const key = await subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
    const sig = await subtle.sign("HMAC", key, enc.encode(payload))
    return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")
  }
  // Node fallback
  const nodeCrypto: any = await import("crypto")
  const c = nodeCrypto.default || nodeCrypto
  return c.createHmac("sha256", secret).update(payload).digest("hex")
}

export async function createSession(username: string) {
  const payload = JSON.stringify({ username, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  const b64 = toBase64Url(payload)
  const sig = await sign(b64)
  const token = `${b64}.${sig}`
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  const [b64, sig] = token.split(".")
  if (!b64 || !sig) return null
  const expected = await sign(b64)
  if (sig !== expected) return null
  try {
    const payload = JSON.parse(fromBase64Url(b64))
    if (payload.exp < Date.now()) return null
    return { username: payload.username }
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<{ username: string } | null> {
  return getSession()
}

// For middleware / route handlers that have request.cookies
export async function verifyTokenFromValue(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const [b64, sig] = token.split(".")
  if (!b64 || !sig) return false
  const expected = await sign(b64)
  if (sig !== expected) return false
  try {
    const payload = JSON.parse(fromBase64Url(b64))
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

export const ADMIN_COOKIE_NAME = SESSION_COOKIE
