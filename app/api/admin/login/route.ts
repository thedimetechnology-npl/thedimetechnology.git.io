import { NextRequest, NextResponse } from "next/server"
import { verifyCredentials, createSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
  }
  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
  await createSession(username)
  return NextResponse.json({ success: true })
}
