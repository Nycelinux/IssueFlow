import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTickets, getTicketById, createticket, deleteTicket, updateTicket } from './tickets';
import type { Ticket } from '../types/ticket';

describe('Ticket API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getTickets fetches tickets', async () => {
    const tickets = [{ id: 1, title: 'Login Bug' }];
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(tickets), { status: 200 }),
    );
    const result = await getTickets();
    expect(result).toEqual(tickets);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getTicketsById fetches one ticket', async () => {
    const tickets = [{ id: 1, title: 'Login Bug' }];
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(tickets), { status: 200 }),
    );
    const result = await getTicketById(1);
    expect(result).toEqual(tickets);
  });

  it('createTickets sends POST request', async () => {
    const newTickets = {
      title: 'New Bug',
      description: 'Something is broken',
      priority: 'Critical',
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 10, ...newTickets }), { status: 200 }),
    );
    const result = await createticket(newTickets);
    expect(result.title).toBe('New Bug');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('deleteTickets sends delete request', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
    await deleteTicket(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('updateTickets sends PUT request', async () => {
    const tickets: Ticket = {
      id: 1,
      title: 'Updated Bug',
      description: 'description updated',
      priority: 'Medium',
      status: 'Open',
      createdAt: '',
      updatedAt: '',
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(tickets), { status: 200 }),
    );
    const result = await updateTicket(tickets);
    expect(result).toEqual(tickets);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'PUT' }),
    );
  });

  it('throws error when api request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));
    await expect(getTickets()).rejects.toThrow();
  });
});
