CREATE TABLE IF NOT EXISTS lines (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  pdf_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY,
  line_id INTEGER NOT NULL REFERENCES lines(id),
  origin_town TEXT NOT NULL,
  destination_town TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  stops_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schedules_line ON schedules(line_id);
