import type { Ticket } from '../types/ticket';

const API_URL = 'http://localhost:3001/tickets';

export async function getTickets() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to load tickets');
  }
  return response.json();
}

export async function createticket(ticket: {
  title: string;
  description: string;
  priority: string;
}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw new Error('Create failed');
  }
  return response.json();
}

export async function deleteTicket(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Delete failed');
  }
}

export async function updateTicket(ticket: Ticket) {
  const response = await fetch(`${API_URL}/${ticket.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw new Error('Update failed');
  }
  return response.json();
}


export async function getTicketById(id:number) {
  const response = await fetch(`${API_URL}/${id}`);
  if(!response.ok){
    throw new Error('Ticket not found');
  }
  return response.json();
}