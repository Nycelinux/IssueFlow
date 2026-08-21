import type { Ticket } from '../../types/ticket';

export const searchTickets = (tickets: Ticket[], search: string): Ticket[] => {
  return tickets.filter((ticket) => ticket.title.toLowerCase().includes(search.toLowerCase()));
};
