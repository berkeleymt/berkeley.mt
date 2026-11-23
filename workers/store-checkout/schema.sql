-- Units left to sell per design/size. Doesn't include stock held in open checkouts or sold.
CREATE TABLE IF NOT EXISTS stock (
  product TEXT NOT NULL,
  size TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty >= 0),
  PRIMARY KEY (product, size)
);
-- Shirts left per size across all designs, minus mystery shirts sold but not yet packed.
-- Every shirt sale takes from here too, so mystery orders can't oversell.
CREATE TABLE IF NOT EXISTS pool (
  size TEXT PRIMARY KEY,
  free INTEGER NOT NULL CHECK (free >= 0)
);
-- status: held (checkout open, stock taken) -> paid | released (stock returned)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  session TEXT UNIQUE,
  status TEXT NOT NULL,
  delivery TEXT NOT NULL,
  items TEXT NOT NULL,
  take TEXT NOT NULL,
  created INTEGER NOT NULL,
  expires INTEGER NOT NULL,
  paid_at INTEGER,
  total INTEGER,
  customer TEXT,
  packed INTEGER NOT NULL DEFAULT 0,
  picks TEXT
);
CREATE INDEX IF NOT EXISTS orders_status ON orders (status);
