import sqlite3 from "sqlite3";
const dbPath = process.env.DB_PATH || "./issueflow.db";
const sqlite = sqlite3.verbose();
export const db = new sqlite.Database(dbPath, (error) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`Connected to sqlite db: ${dbPath}`);
});

db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
        )
        `,
    (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Table tickets ready");
      }
    },
  );
  db.run(
    `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL
        )
        `,
    (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Table tickets ready");
      }
    },
  );
});

db.all("SELECT name FROM sqlite_master WHERE type='table'", (error, rows) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(rows);
});
