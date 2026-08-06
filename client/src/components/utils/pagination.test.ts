import { describe, it, expect } from 'vitest';
import { paginateTickets } from './pagination';

const tickets = [{ id: 1 }, { id: 2 }, { id: 75 }, { id: 4 }] as any;

describe('paginateTickets ideal scenario', () => {
  it('returns correct page items', () => {
    const result = paginateTickets(tickets, 2, 2);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(75);
    expect(result[0].id).toEqual(75);
  });
});

describe('paginateTickets Edge Case - page 1', () => {
  it('currentPage 1 should not contain ticket 3', () => {
    const ticketsPage1 = paginateTickets(tickets, 1, 2);
    expect(ticketsPage1).toHaveLength(2);
    expect(ticketsPage1).not.toContainEqual({ id: 75 });
  });
});

describe('paginate Tickets Edge Case - non existing page', () => {
  it('', () => {
    const ticketsPage3 = paginateTickets(tickets, 3, 2);
    expect(ticketsPage3).toHaveLength(0);
    expect(ticketsPage3).not.toContainEqual({ id: 4 });
  });
});

describe('paginateTickets Corner case- Invalid inputs', () => {
  it('should handle negative page numbers gracefully', () => {
    const result = paginateTickets(tickets, -1, 2);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
