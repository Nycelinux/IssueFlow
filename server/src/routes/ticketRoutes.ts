import { Router } from "express";
import { validateTicket } from "../middleware/validateTickets.js";
import {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = Router();

router.get("/", getTickets);
router.post("/", validateTicket, createTicket);
router.get("/:id", getSingleTicket);
router.put("/:id", validateTicket, updateTicket);
router.delete("/:id", deleteTicket);

export default router;
