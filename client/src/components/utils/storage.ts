import type { Ticket } from '../../types/ticket';

const STORAGE_KEY = 'issueflow-tickets';

export function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function loadTickets() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data) as Ticket[];
}
