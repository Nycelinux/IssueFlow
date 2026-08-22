import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type UserRole = "Admin" | "Developer" | "Viewer";
export interface AuthenticatedUser {
  id: number;
  username: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
