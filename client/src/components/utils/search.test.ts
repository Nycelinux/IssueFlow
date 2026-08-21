import { describe, it, expect } from 'vitest';
import { searchTickets } from './search';
import type { Ticket } from '../../types/ticket';

const upper = 'UPPER';
const lower = 'lower';
const mixed = 'MixED';
const tickets: Ticket[] = [
  {
    id: 1,
    title: 'MixED',
    description: 'Navbar test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
  {
    id: 2,
    title: 'lower',
    description: 'Sidebar test',
    createdAt: '',
    updatedAt: '',
    status: 'In Progress',
    priority: 'Critical',
  },
  {
    id: 3,
    title: 'Search',
    description: 'Search test',
    createdAt: '',
    updatedAt: '',
    status: 'Closed',
    priority: 'Low',
  },
  {
    id: 4,
    title: 'Login Test page Error',
    description: 'Login button doesnot work',
    createdAt: '',
    updatedAt: '',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 5,
    title: 'UPPER',
    description: 'UPPER test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
];

describe('search test', () => {
  it('should work for upper, lower and mixed case', () => {
    const searchUpper = searchTickets(tickets, upper);
    const searchLower = searchTickets(tickets, lower);
    const searchMixed = searchTickets(tickets, mixed);

    expect(searchUpper).toContainEqual(tickets[4]);
    expect(searchLower).toContainEqual(expect.objectContaining({ title: lower }));
    expect(searchMixed).toHaveLength(1);
    expect(searchMixed[0].title).toBe('MixED');
  });
});

describe('search test all Tickets', () => {
  it('should reurn all tickets', () => {
    const allTickets = searchTickets(tickets, '');
    expect(allTickets).toHaveLength(5);
  });
});

describe('search Test empty', () => {
  it('should return no tickets', () => {
    const noTickets = searchTickets(tickets, 'xyz1234');
    expect(noTickets).toHaveLength(0);
  });
});

describe('search Test substring', () => {
  it('should return ticket by substrings', () => {
    const results = searchTickets(tickets, 'log');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(4);
    expect(results[0].title).toBe('Login Test page Error');
  });
});
