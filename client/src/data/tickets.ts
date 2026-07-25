import type { Ticket } from '../types/ticket';

export const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Navbar Bug',
    priority: 'Medium',
    status: 'Closed',
  },
  {
    id: 2,
    title: 'Login Issue',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Final Ticket',
    priority: 'Low',
    status: 'In Progress',
  },
];
