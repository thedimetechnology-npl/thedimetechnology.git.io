import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { isAllowedFile, readDataFile, writeDataFile, ALLOWED_FILES } from "@/lib/admin-data"

type Params = { params: Promise<{ file: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { file } = await params
  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: `Invalid file. Allowed: ${ALLOWED_FILES.join(", ")}` }, { status: 400 })
  }
  try {
    const data = readDataFile(file)
    return NextResponse.json(data)
  } catch (e) {
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
    writeDataFile(file, body)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Failed to write file" }, { status: 500 })
  }
}
