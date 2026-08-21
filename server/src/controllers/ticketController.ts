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

export async function getSingleTicket(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const ticket = await ticketService.getTicket(id);
    if (!ticket) {
      return res.status(404).json({ message: "ticket not found" });
    }
    res.json(ticket);
  } catch {
    res.sendStatus(500);
  }
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

export async function deleteTicket(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deleted = await ticketService.deleteTicket(id);
    if (!deleted) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
}

export async function updateTicket(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedTicket = await ticketService.updateTicket(
      id,
      req.body.title,
      req.body.description,
      req.body.priority,
      req.body.status,
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "update failed" });
  }
}
