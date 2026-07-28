import { error } from "node:console";
import { db } from "../database/database.js";
import { resolve } from "node:dns";
import { rejects } from "node:assert/strict";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Closed";
}

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

export function getTicket(id: number): Promise<Ticket | undefined> {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM tickets WHERE id =?`, [id], (error, row: Ticket) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
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

export function deleteTicket(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM tickets WHERE id =?
      `,
      [id],
      function (error) {
        if (error) {
          reject(error);
          return;
        }
        resolve(this.changes > 0);
      },
    );
  });
}

export function updateTicket(
  id: number,
  title: string,
  description: string,
  priority: Ticket["priority"],
  status: Ticket["status"],
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        UPDATE tickets
        SET tile=?, description =?, priority=?, status=?
        WHERE id=?
      `,
      [title, description, priority, status, id],
      function (error) {
        if (error) {
          reject(error);
          return;
        }
        resolve(this.changes > 0);
      },
    );
  });
}
