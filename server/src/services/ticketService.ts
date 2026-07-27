import { error } from "node:console";
import { db } from "../database/database.js";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Closed";
}

const tickets: Ticket[] = [
  {
    id: 1,
    title: "Navbar Bug",
    description: "Bug in Navbar",
    priority: "Medium",
    status: "Open",
  },
  {
    id: 2,
    title: "Login Issue",
    description: "No resl issue",
    priority: "High",
    status: "Closed",
  },
];

export function getAllTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tickets", (error, rows: Ticket[]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

export function getTicket(id: number) {
  return tickets.find((ticket) => ticket.id === id);
}

export function createTicket(
  title: string,
  description: string,
  priority: Ticket["priority"],
): Promise<Ticket> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tickets
      (title, description,priority,status)
      VALUES(?,?,?,?)`,
      [title, description, priority, "Open"],
      function (error) {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          id: this.lastID,
          title,
          description,
          priority,
          status: "Open",
        });
      },
    );
  });
}

export function deleteTicket(id: number): boolean {
  const index = tickets.findIndex((ticket) => ticket.id === id);
  if (index === -1) {
    return false;
  }
  tickets.splice(index, 1);
  return true;
}

export function updateTicket(
  id: number,
  title: string,
  description: string,
  priority: Ticket["priority"],
  status: Ticket["status"],
): Ticket | undefined {
  const ticket = tickets.find((ticket) => ticket.id === id);
  if (!ticket) {
    return undefined;
  }
  ticket.title = title;
  ticket.description = description;
  ticket.priority = priority;
  ticket.status = status;
  return ticket;
}
