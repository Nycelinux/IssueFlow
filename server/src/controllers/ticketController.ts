import { Request, Response } from "express";
import * as ticketService from "../services/ticketService.js";

export async function getTickets(req: Request, res: Response) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch {
    res.sendStatus(500);
  }
}

export function getSingleTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = ticketService.getTicket(id);
  if (!ticket) {
    return res.status(404).json({ message: "ticket not found" });
  }
  res.json(ticket);
}

export async function createTicket(req: Request, res: Response) {
  try {
    const ticket = await ticketService.createTicket(
      req.body.title,
      req.body.description,
      req.body.priority,
    );
    res.status(201).json(ticket);
  } catch {
    res.sendStatus(500);
  }
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
