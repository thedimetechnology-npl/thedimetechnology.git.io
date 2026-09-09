export function getDB(): any {
  try {
    // @ts-ignore - Cloudflare bindings
    if (typeof process !== "undefined" && (process as any).env?.DB) return (process as any).env.DB
    // @ts-ignore
    const g: any = globalThis
    if (g?.DB) return g.DB
    if (g?.__cloudflare_context__?.env?.DB) return g.__cloudflare_context__.env.DB
    if (g?.__env__?.DB) return g.__env__.DB
  } catch {}
  return null
}

export async function d1Get(key: string): Promise<any | null> {
  const DB = getDB()
  if (!DB) return null
  try {
    const row = await DB.prepare("SELECT value FROM data_store WHERE key = ?").bind(key).first()
    if (!row) return null
    return JSON.parse(row.value as string)
  } catch {
    return null
  }
}

export async function d1Put(key: string, value: any): Promise<boolean> {
  const DB = getDB()
  if (!DB) return false
  try {
    const str = JSON.stringify(value)
    await DB.prepare("INSERT INTO data_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(key, str).run()
    return true
  } catch {
    return false
  }
}

export async function d1Init(): Promise<void> {
  const DB = getDB()
  if (!DB) return
  await DB.exec("CREATE TABLE IF NOT EXISTS data_store (key TEXT PRIMARY KEY, value TEXT)")
}
