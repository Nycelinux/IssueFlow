import type { Ticket } from '../types/ticket';

export const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Navbar Bug',
    description: 'The navbar does not collapse on mobile devices.',
    priority: 'Medium',
    status: 'Closed',
  },
  {
    id: 2,
    title: 'Login Issue',
    description: 'Users are unable to log in with valid credentials.',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Final Ticket',
    description: 'This is the final ticket for the sprint.',
    priority: 'Low',
    status: 'In Progress',
  },
];
