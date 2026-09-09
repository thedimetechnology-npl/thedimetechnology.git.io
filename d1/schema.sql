-- Generic store for all JSON files (site-config, hero, blogs, etc.)
CREATE TABLE IF NOT EXISTS data_store (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- Messages table (alternative to JSON file)
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  country TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
