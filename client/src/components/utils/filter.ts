import type { Ticket } from '../../types/ticket';

export function filterTickets(
  tickets: Ticket[],
  priority: 'All' | Ticket['priority'],
  status: 'All' | Ticket['status'],
) {
  return tickets.filter((ticket) => {
    const priorityMatches = priority === 'All' || ticket.priority === priority;

    const statusMatches = status === 'All' || ticket.status === status;

    return priorityMatches && statusMatches;
  });
}
