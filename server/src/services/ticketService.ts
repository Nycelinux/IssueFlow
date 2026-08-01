import { db } from "../database/database.js";

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
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
    db.run(
      `INSERT INTO tickets
      (title, description,priority,status,createdAt)
      VALUES(?,?,?,?,?)`,
      [title, description, priority, "Open", createdAt],
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
    db.run(
      `
        UPDATE tickets
        SET title=?, description =?, priority=?, status=?
        WHERE id=?
      `,
      [title, description, priority, status, id],
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
