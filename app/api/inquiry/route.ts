import { NextRequest, NextResponse } from "next/server"

const WHATSAPP_TO = "9779801024024" // your number without +
const WHATSAPP_TO_DISPLAY = "+977 9801024024"

function formatWhatsAppMessage(data: {
  name: string
  email: string
  organization?: string
  message: string
}) {
  const lines = [
    `*New Inquiry — The Dime Technology* 🚀`,
    ``,
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Organization:* ${data.organization || "—"}`,
    ``,
    `*Message:*`,
    data.message,
    ``,
    `— Sent from thedimetechnology.com.np contact bot`,
    `Time: ${new Date().toLocaleString("en-NP", { timeZone: "Asia/Kathmandu" })}`,
  ]
  return lines.join("\n")
}

async function sendViaWhatsAppCloud(message: string) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const to = process.env.WHATSAPP_TO || WHATSAPP_TO

  if (!token || !phoneId) return { skipped: true, reason: "WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID not set" }

  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message, preview_url: false },
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { success: false, error: data, status: res.status }
  }
  return { success: true, data }
}

async function sendViaUltraMsg(message: string) {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID
  const token = process.env.ULTRAMSG_TOKEN
  if (!instanceId || !token) return { skipped: true }

  const to = process.env.WHATSAPP_TO || WHATSAPP_TO
  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`
  const params = new URLSearchParams({
    token,
    to,
    body: message,
    priority: "10",
  })

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  const data = await res.json().catch(() => ({}))
  return { success: res.ok, data, status: res.status }
}

async function sendViaCallMeBot(message: string) {
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!apikey) return { skipped: true }
  const phone = process.env.WHATSAPP_TO || WHATSAPP_TO
  // CallMeBot expects phone with country code and text encoded
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apikey}`
  const res = await fetch(url)
  const text = await res.text().catch(() => "")
  return { success: res.ok, data: text, status: res.status }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, organization, message } = body || {}

    // basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 chars)" }, { status: 400 })
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message is required (min 10 chars)" }, { status: 400 })
    }

    const clean = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: (organization || "").trim(),
      message: message.trim(),
    }

    const waMessage = formatWhatsAppMessage(clean)
    const waLink = `https://wa.me/${WHATSAPP_TO}?text=${encodeURIComponent(waMessage)}`

    // Try providers in order: Cloud API -> UltraMsg -> CallMeBot
    let provider: string | null = null
    let providerResult: any = null

    const cloud = await sendViaWhatsAppCloud(waMessage)
    if (!cloud.skipped) {
      provider = "whatsapp-cloud"
      providerResult = cloud
      if (cloud.success) {
        console.log("[inquiry] WhatsApp Cloud sent", cloud.data)
      } else {
        console.warn("[inquiry] WhatsApp Cloud failed", cloud)
      }
    } else {
      const ultra = await sendViaUltraMsg(waMessage)
      if (!ultra.skipped) {
        provider = "ultramsg"
        providerResult = ultra
      } else {
        const callme = await sendViaCallMeBot(waMessage)
        if (!callme.skipped) {
          provider = "callmebot"
          providerResult = callme
        }
      }
    }

    const isDemo = !provider || (providerResult && !providerResult.success)

    // Always log for debugging / Vercel logs
    console.log("[inquiry] New inquiry", {
      ...clean,
      waLink,
      provider,
      providerResult,
      demo: isDemo,
    })

    // Respond
    if (isDemo) {
      // No provider configured or failed — still succeed but tell frontend it's demo mode
      return NextResponse.json(
        {
          success: true,
          demo: true,
          message: `Inquiry received! WhatsApp bot is in demo mode. Configure WHATSAPP_TOKEN to auto-send to ${WHATSAPP_TO_DISPLAY}.`,
          waLink,
          inquiry: clean,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        demo: false,
        message: `Inquiry sent to WhatsApp ${WHATSAPP_TO_DISPLAY} via ${provider}!`,
        waLink,
        provider,
        inquiry: clean,
      },
      { status: 200 }
    )
  } catch (err: any) {
    console.error("[inquiry] error", err)
    return NextResponse.json({ error: "Server error", details: err?.message }, { status: 500 })
  }
}
