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

export function getAllTickets() {
  return tickets;
}

export function getTicket(id: number) {
  return tickets.find((ticket) => ticket.id === id);
}

export function createTicket(
  title: string,
  description: string,
  priority: Ticket["priority"],
): Ticket {
  const newTicket: Ticket = {
    id: Date.now(),
    title,
    description,
    priority,
    status: "Open",
  };
  tickets.push(newTicket);
  return newTicket;
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
