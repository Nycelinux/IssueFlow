import type { Ticket } from '../../types/ticket';

export function paginateTickets(
  tickets: Ticket[],
  currentPage: number,
  ticketsPerPage: number,
): Ticket[] {
  if (currentPage <= 0) return [];
  const start = (currentPage - 1) * ticketsPerPage;
  return tickets.slice(start, start + ticketsPerPage);
}
