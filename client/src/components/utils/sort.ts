import type { Ticket } from '../../types/ticket';

export function sortTickets(tickets: Ticket[], sortBy: 'Newest' | 'Oldest' | 'Priority') {
  const sorted = [...tickets];

  switch (sortBy) {
    case 'Newest':
      return sorted.sort((a, b) => b.id - a.id);

    case 'Oldest':
      return sorted.sort((a, b) => a.id - b.id);

    case 'Priority': {
      const order = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return sorted.sort((a, b) => order[b.priority] - order[a.priority]);
    }
    default:
      return sorted;
  }
}
