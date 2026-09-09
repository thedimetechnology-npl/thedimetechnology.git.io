import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const files = ["site-config.json","hero.json","about.json","services.json","process.json","stats.json","team.json","testimonials.json","clients.json","tech-stack.json","blogs.json"]

for (const f of files) {
  const p = path.join("data", f)
  if (!fs.existsSync(p)) continue
  const raw = fs.readFileSync(p, "utf-8")
  // escape single quotes for SQL
  const escaped = raw.replace(/'/g, "''")
  const sql = `INSERT INTO data_store (key, value) VALUES ('${f}', '${escaped}') ON CONFLICT(key) DO UPDATE SET value = excluded.value;`
  // write temp sql
  fs.writeFileSync("tmp.sql", sql)
  console.log(`Seeding ${f}...`)
  try {
    execSync(`npx wrangler d1 execute dime-db --remote --file=tmp.sql`, { stdio: "inherit" })
  } catch (e) {
    console.error(`Failed ${f}`, e.message)
  }
}
console.log("Done")
