import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { deleteMessage } from "@/lib/admin-data"

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  deleteMessage(id)
  return NextResponse.json({ success: true })
}
