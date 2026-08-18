import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardHeader from './DashboardHeader';

describe('Dashboardheader', () => {
  it('renders ticket count', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByTestId('totalTicket-count')).toHaveTextContent('12');
  });

  it('renders welcome back text', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Welcome Back');
  });

  it('renders open ticket count', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByTestId('openTickets-title')).toHaveTextContent('Open Tickets');
    expect(screen.getByTestId('openTickets-count')).toHaveTextContent('5');
  });
});
