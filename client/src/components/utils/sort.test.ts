import type { Ticket } from '../../types/ticket';
import { sortTickets } from './sort';
import { describe, it, expect } from 'vitest';

const tickets: Ticket[] = [
  {
    id: 3,
    title: 'MixED',
    description: 'Navbar test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
  {
    id: 5,
    title: 'lower Siebar test',
    description: 'Sidebar test',
    createdAt: '',
    updatedAt: '',
    status: 'In Progress',
    priority: 'Critical',
  },
  {
    id: 4,
    title: 'Search',
    description: 'Search test',
    createdAt: '',
    updatedAt: '',
    status: 'Closed',
    priority: 'Low',
  },
  {
    id: 2,
    title: 'Login Test page Error',
    description: 'Login button doesnot work',
    createdAt: '',
    updatedAt: '',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 1,
    title: 'UPPER',
    description: 'UPPER test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
];

describe('sort in order newest', () => {
  it('should sort from newest to oldest', () => {
    const result = sortTickets(tickets, 'Newest');
    expect(result).toHaveLength(5);
    expect(result[0].id).toBe(5);
    expect(result[1].id).toBe(4);
    expect(result[2].id).toBe(3);
    expect(result[3].id).toBe(2);
    expect(result[4].id).toBe(1);
  });
});

describe('sort in order oldest', () => {
  it('should sort from oldest to newwest', () => {
    const result = sortTickets(tickets, 'Oldest');
    expect(result).toHaveLength(5);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
    expect(result[3].id).toBe(4);
    expect(result[4].id).toBe(5);
  });
});

describe('sort in order priority', () => {
  it('should sort priority from highest to lowest', () => {
    const result = sortTickets(tickets, 'Priority');
    expect(result[0].priority).toBe('Critical');
    expect(result[1].priority).toBe('High');
    expect(result[2].priority).toBe('Medium');
    expect(result[3].priority).toBe('Medium');
    expect(result[4].priority).toBe('Low');
  });
});

describe('sort special case empty', () => {
  it('should rerturn empty ', () => {
    const emptyTickets: Ticket[] = [];
    const result = sortTickets(emptyTickets, 'Priority');
    expect(result).toHaveLength(0);
  });
});

describe('sort special case single Ticket', () => {
  it('should rerturn single ticket ', () => {
    const singleTicketArray: Ticket[] = [tickets[1]];
    const result = sortTickets(singleTicketArray, 'Priority');
    console.log(result[0].title);
    expect(result[0].title).toBe('lower Siebar test');
  });
});
