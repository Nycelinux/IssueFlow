import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardHeader from './DashboardHeader';

describe('Dashboardheader', () => {
  it('renders ticket count', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByText(/12 tickets/i)).toBeInTheDocument();
  });

  it('renders welcome back text', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('renders open ticket count', () => {
    render(<DashboardHeader ticketCount={12} openTickets={5} />);
    expect(screen.getByText(/Open tickets/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
