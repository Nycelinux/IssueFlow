import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTicket } from './useTickets';
import type { Ticket } from '../types/ticket';
import * as ticketApi from '../api/tickets';

vi.mock('../api/tickets.ts');
const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Navbar Bug',
    description: 'Navbar broken',
    priority: 'Critical',
    status: 'Open',
    createdAt: '2026-08-03T12:00:00.000Z',
    updatedAt: '2026-08-03T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Login Bug',
    description: 'Login does not work',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-08-04T12:00:00.000Z',
    updatedAt: '2026-08-04T12:00:00.000Z',
  },
];

describe('useTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ticketApi.getTickets).mockResolvedValue(tickets);
    vi.mocked(ticketApi.createticket).mockResolvedValue(tickets[0]);
    vi.mocked(ticketApi.deleteTicket).mockResolvedValue(undefined);
    vi.mocked(ticketApi.updateTicket).mockResolvedValue(tickets[0]);
  });
  it('loads tickets when hook is mounted', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });
    expect(ticketApi.getTickets).toHaveBeenCalledTimes(1);
  });

  it('adds a ticket and refresh the tickets', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(async () => {
      expect(result.current.tickets).toHaveLength(2);
      await act(async () => {
        await result.current.addTicket('New Ticket', 'Something is broken', 'Critical');
      });
      expect(ticketApi.createticket).toHaveBeenCalledWith({
        title: 'New Ticket',
        description: 'Something is broken',
        priority: 'Critical',
      });
    });
    expect(ticketApi.getTickets).toHaveBeenCalledTimes(2);
  });

  it('deletes a ticket and refreshes a ticket', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });

    await act(async () => {
      await result.current.deleteTicket(1);
    });

    expect(ticketApi.deleteTicket).toHaveBeenCalledWith(1);
    expect(ticketApi.getTickets).toHaveBeenCalledTimes(2);
  });

  it('updates a ticket and refresh the tickets', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });

    const updatedTicket = { ...tickets[0], title: 'updated login Bug' };
    await act(async () => {
      await result.current.updateTicket(updatedTicket);
    });

    expect(ticketApi.updateTicket).toHaveBeenCalledWith(updatedTicket);
    expect(ticketApi.getTickets).toHaveBeenCalledTimes(2);
  });

  it('change open status in Progress', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });

    await act(async () => {
      await result.current.toggleTicketStatus(1);
    });
    expect(ticketApi.updateTicket).toHaveBeenCalledWith({ ...tickets[0], status: 'In Progress' });
  });

  it('change open status in closed', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });

    await act(async () => {
      await result.current.toggleTicketStatus(2);
    });
    expect(ticketApi.updateTicket).toHaveBeenCalledWith({ ...tickets[1], status: 'Closed' });
  });

  it('does nothing when ticket does not exist', async () => {
    const { result } = renderHook(() => useTicket());

    await waitFor(() => {
      expect(result.current.tickets).toHaveLength(2);
    });

    await act(async () => {
      await result.current.toggleTicketStatus(999);
    });
    expect(ticketApi.updateTicket).not.toHaveBeenCalled();
  });
});
