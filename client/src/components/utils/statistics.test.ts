import { describe, it, expect } from 'vitest';
import { getTicketStatistics } from './statistics';
import type { Ticket } from '../../types/ticket';

const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Navbar',
    description: 'Navbar test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
  {
    id: 2,
    title: 'Sidebar',
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
    title: 'pagination',
    description: 'pagination test',
    createdAt: '',
    updatedAt: '',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 5,
    title: 'storage',
    description: 'storage test',
    createdAt: '',
    updatedAt: '',
    status: 'Open',
    priority: 'Medium',
  },
];

describe('statistics Tests ideal scenario', () => {
  it('should test priority and status', () => {
    const result = getTicketStatistics(tickets);
    expect(result.openTickets).toBe(2);
    expect(result.closedTickets).toBe(1);
    expect(result.progressTickets).toBe(2);
    expect(result.criticalTickets).toBe(1);

    expect(result.lowPriority).toBe(1);
    expect(result.highPriority).toBe(1);
    expect(result.mediumPriority).toBe(2);
  });
});

describe('statistics Tests empty array', () => {
  it('should text empty ticket', () => {
    const emptyTickets: Ticket[] = [];
    const result = getTicketStatistics(emptyTickets);
    expect(result.openTickets).toBe(0);
    expect(result.closedTickets).toBe(0);
    expect(result.progressTickets).toBe(0);
    expect(result.criticalTickets).toBe(0);

    expect(result.lowPriority).toBe(0);
    expect(result.highPriority).toBe(0);
    expect(result.mediumPriority).toBe(0);
  });
});

describe('statistics Tests openTickets', () => {
  it('should test status', () => {
    const opentickets = getTicketStatistics(tickets);
    expect(opentickets.openTickets).toBe(2);
  });
});

describe('statistics Tests highPriority ', () => {
  it('should Test priority', () => {
    const result = getTicketStatistics(tickets);
    expect(result.mediumPriority).toBe(2);
  });
});

describe('statistics Tests mixed priorites', () => {
  it('should test tickets with pixed priorities', () => {
    const extendedTickets: Ticket[] = [
      ...tickets,
      {
        id: 6,
        title: 'added ticket',
        description: 'added ticket test',
        createdAt: '',
        updatedAt: '',
        status: 'In Progress',
        priority: 'High',
      },
      {
        id: 7,
        title: 'addedd ticket 2',
        description: 'added ticket rest 2 ',
        createdAt: '',
        updatedAt: '',
        status: 'Open',
        priority: 'Medium',
      },
    ];
    const results = getTicketStatistics(extendedTickets);
    expect(results.lowPriority).toBe(1);
    expect(results.highPriority).toBe(2);
    expect(results.mediumPriority).toBe(3);
    expect(results.criticalTickets).toBe(1);
  });
});

describe('statistics Tests corner case', () => {
  it('should not crash by faulty data', () => {
    const extendedTickets = [
      ...tickets,
      {
        id: 6,
        title: 'added ticket',
        description: 'added ticket test',
        createdAt: '',
        updatedAt: '',
        status: '',
        priority: '',
      } as unknown as Ticket,
    ];
    const results = getTicketStatistics(extendedTickets);
    expect(results).toBeDefined();
    expect(results.openTickets).toBe(2);
    expect(results.highPriority).toBe(1);
  });
});
