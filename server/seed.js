import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
  )
`);

db.exec(`
    INSERT INTO messages (message)
    VALUES
    ('Message 1'),
    ('A second message'),
    ('And a third'),
    ('Keep adding for a fourth'),
    ('I think five is enough')
`);