import { cookies } from "next/headers"
import crypto from "crypto"

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

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
}

export async function createSession(username: string) {
  const payload = JSON.stringify({ username, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  const b64 = Buffer.from(payload).toString("base64url")
  const sig = sign(b64)
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
  const expected = sign(b64)
  if (sig !== expected) return null
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString())
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
export function verifyTokenFromValue(token: string | undefined): boolean {
  if (!token) return false
  const [b64, sig] = token.split(".")
  if (!b64 || !sig) return false
  const expected = sign(b64)
  if (sig !== expected) return false
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString())
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

export const ADMIN_COOKIE_NAME = SESSION_COOKIE
