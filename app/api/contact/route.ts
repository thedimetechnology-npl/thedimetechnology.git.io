import { NextRequest, NextResponse } from "next/server"
import { appendMessage } from "@/lib/admin-data"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, organization, country, phone, message } = body
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const saved = appendMessage({ name, email, organization, country, phone, message })
  return NextResponse.json({ success: true, id: saved.id })
}

export async function GET() {
  return NextResponse.json({ status: "ok" })
}
