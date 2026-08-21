import { useEffect, useState } from 'react';
import type { Ticket } from '../types/ticket';
import {
  getTickets,
  createticket,
  deleteTicket as deleteTicketApi,
  updateTicket as updateTicketApi,
} from '../api/tickets';

export function useTicket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  async function refreshTickets() {
    try {
      const data = await getTickets();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refreshTickets();
  }, []);

  async function addTicket(title: string, description: string, priority: Ticket['priority']) {
    await createticket({
      title,
      description,
      priority,
    });
    await refreshTickets();
  }

  async function deleteTicket(id: number) {
    await deleteTicketApi(id);
    await refreshTickets();
  }

  async function updateTicket(ticket: Ticket) {
    await updateTicketApi(ticket);
    await refreshTickets();
  }

  async function toggleTicketStatus(id: number) {
    const currentTicket = tickets.find((ticket) => ticket.id === id);
    if (!currentTicket) return;

    const newStatus: Ticket['status'] =
      currentTicket.status === 'Open'
        ? 'In Progress'
        : currentTicket.status === 'In Progress'
          ? 'Closed'
          : 'Open';

    await updateTicket({
      ...currentTicket,
      status: newStatus,
    });
  }

  return {
    tickets,
    loading,
    addTicket,
    deleteTicket,
    updateTicket,
    toggleTicketStatus,
    refreshTickets,
  };
}
