import { NextRequest, NextResponse } from "next/server"
import { isAllowedFile, readDataFile, ALLOWED_FILES } from "@/lib/admin-data"

export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: `Invalid file. Allowed: ${ALLOWED_FILES.join(", ")}` }, { status: 400 })
  }
  try {
    const data = readDataFile(file)
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ error: "Failed to read" }, { status: 500 })
  }
}
