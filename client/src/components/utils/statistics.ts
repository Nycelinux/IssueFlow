import type { Ticket } from '../../types/ticket';

export const getTicketStatistics = (tickets: Ticket[]) => {
  const openTickets = tickets.filter((ticket) => ticket.status === 'Open').length;
  const closedTickets = tickets.filter((ticket) => ticket.status === 'Closed').length;
  const progressTickets = tickets.filter((ticket) => ticket.status === 'In Progress').length;
  const criticalTickets = tickets.filter((ticket) => ticket.priority === 'Critical').length;

  return {
    openTickets,
    closedTickets,
    progressTickets,
    criticalTickets,
  };
};
