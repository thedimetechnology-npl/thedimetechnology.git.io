import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

export const ALLOWED_FILES = [
  "site-config.json",
  "hero.json",
  "about.json",
  "services.json",
  "process.json",
  "stats.json",
  "team.json",
  "testimonials.json",
  "clients.json",
  "tech-stack.json",
  "blogs.json",
] as const

export type AllowedFile = (typeof ALLOWED_FILES)[number]

export function isAllowedFile(name: string): name is AllowedFile {
  return (ALLOWED_FILES as readonly string[]).includes(name)
}

export function getDataPath(file: string) {
  return path.join(DATA_DIR, file)
}

export function readDataFile(file: AllowedFile) {
  const full = getDataPath(file)
  const raw = fs.readFileSync(full, "utf-8")
  return JSON.parse(raw)
}

export function writeDataFile(file: AllowedFile, data: unknown) {
  const full = getDataPath(file)
  fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n", "utf-8")
}

// Async D1-aware versions for Workers (fallback to fs locally)
export async function readDataFileAsync(file: AllowedFile): Promise<any> {
  try {
    const { d1Get } = await import("./d1")
    const v = await d1Get(file)
    if (v !== null) return v
  } catch {}
  // fallback to fs
  return readDataFile(file)
}

export async function writeDataFileAsync(file: AllowedFile, data: unknown): Promise<void> {
  try {
    const { d1Put } = await import("./d1")
    const ok = await d1Put(file, data)
    if (ok) return
  } catch {}
  writeDataFile(file, data)
}

// messages handling (contact form)
export type ContactMessage = {
  id: string
  name: string
  email: string
  organization?: string
  country?: string
  phone?: string
  message: string
  createdAt: string
}

export function getMessagesPath() {
  return path.join(DATA_DIR, "messages.json")
}

export function readMessages(): ContactMessage[] {
  const p = getMessagesPath()
  if (!fs.existsSync(p)) return []
  try {
    const raw = fs.readFileSync(p, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function appendMessage(msg: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const msgs = readMessages()
  const newMsg: ContactMessage = {
    ...msg,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
  }
  msgs.unshift(newMsg)
  fs.writeFileSync(getMessagesPath(), JSON.stringify(msgs, null, 2) + "\n", "utf-8")
  return newMsg
}

export function deleteMessage(id: string) {
  const msgs = readMessages()
  const filtered = msgs.filter((m) => m.id !== id)
  fs.writeFileSync(getMessagesPath(), JSON.stringify(filtered, null, 2) + "\n", "utf-8")
  return filtered
}
