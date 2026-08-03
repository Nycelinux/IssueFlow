import { db } from "../database/database.js";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
  updatedAt: string;
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
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    db.run(
      `INSERT INTO tickets
      (title, description,priority,status,createdAt,updatedAt)
      VALUES(?,?,?,?,?,?)`,
      [title, description, priority, "Open", createdAt, updatedAt],
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
          createdAt,
          updatedAt,
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
): Promise<Ticket | undefined> {
  return new Promise((resolve, reject) => {
    const updatedAt = new Date().toISOString();
    db.run(
      `
        UPDATE tickets
        SET title=?, description =?, priority=?, status=?, updatedAt=?
        WHERE id=?
      `,
      [title, description, priority, status, updatedAt, id],
      function (error) {
        if (error) {
          reject(error);
          return;
        }
        if (this.changes === 0) {
          resolve(undefined);
          return;
        }
        return getTicket(id).then(resolve).catch(reject);
      },
    );
  });
}
