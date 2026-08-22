import { Router } from "express";
import { validateTicket } from "../middleware/validateTickets.js";
import {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", authenticateToken, getTickets);
router.get("/dashboard", getTickets);
router.post(
  "/",
  authenticateToken,
  requireRole("Admin", "Developer"),
  validateTicket,
  createTicket,
);
router.get("/:id", authenticateToken, getSingleTicket);
router.put(
  "/:id",
  authenticateToken,
  requireRole("Admin", "Developer"),
  validateTicket,
  updateTicket,
);
router.delete("/:id", authenticateToken, requireRole("Admin"), deleteTicket);

export default router;
