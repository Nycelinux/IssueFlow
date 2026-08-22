import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../database/database.js";
import { rejects } from "node:assert";
import { error } from "node:console";

type UserRole = "Admin" | "Developer" | "Viewer";

interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET || "development-secret";
export function createUser(
  username: string,
  password: string,
  role: UserRole,
): Promise<Omit<User, "passwordHash">> {
  return new Promise((resolve, reject) => {
    const passwordHash = bcrypt.hashSync(password, 10);
    db.run(
      `
            INSERT INTO users (username, passwordHash, role)
            values (?, ?, ?)
            `,
      [username, passwordHash, role],
      function (error) {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          id: this.lastID,
          username,
          role,
        });
      },
    );
  });
}

export function login(
  username: string,
  password: string,
): Promise<{ token: string; user: Omit<User, "passwordHash"> } | null> {
  return new Promise((resolve, reject) => {
    db.get(
      `
            SELECT * FROM users WHERE username = ?
            `,
      [username],
      async (error, row: User | undefined) => {
        if (error) {
          reject(error);
          return;
        }
        if (!row) {
          resolve(null);
          return;
        }
        const passwordMatches = await bcrypt.compare(
          password,
          row.passwordHash,
        );
        if (!passwordMatches) {
          resolve(null);
          return;
        }
        const user = {
          id: row.id,
          username: row.username,
          role: row.role,
        };

        const token = jwt.sign(user, JWT_SECRET, {
          expiresIn: "1h",
        });
        resolve({ token, user });
      },
    );
  });
}
