import bcrypt from "bcryptjs";
import { db } from "./database/database.js";
import { error } from "node:console";

const passwordHash = bcrypt.hashSync("admin1234", 10);

db.run(
  `
        INSERT OR IGNORE INTO users (username, passwordHash, role)
        VALUES (?, ?, ?)
    `,
  ["admin", passwordHash, "Admin"],
  (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log("Test user ready");
    }
    db.close();
  },
);
