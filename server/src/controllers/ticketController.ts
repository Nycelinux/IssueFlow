import { Request, Response } from "express";
import * as ticketService from "../services/ticketService.js";

export function getTickets(req: Request, res: Response) {
  const tickets = ticketService.getAllTickets();
  res.json(tickets);
}

export function getSingleTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = ticketService.getTicket(id);
  if (!ticket) {
    return res.status(404).json({ message: "ticket not found" });
  }
  res.json(ticket);
}

export function createTicket(req: Request, res: Response) {
  const { title, description, priority } = req.body;
  const ticket = ticketService.createTicket(title, description, priority);
  res.status(201).json(ticket);
}

export function deleteTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = ticketService.deleteTicket(id);
  if (!deleted) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
}

export function updateTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = ticketService.updateTicket(
    id,
    req.body.title,
    req.body.description,
    req.body.priority,
    req.body.status,
  );
  if (!ticket) {
    return res.sendStatus(404);
  }
  res.json(ticket);
}
