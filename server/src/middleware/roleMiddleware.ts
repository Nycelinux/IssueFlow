import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest, UserRole } from "./authMiddleware.js";

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: " Access denied" });
    }
    next();
  };
}
