import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Ticket } from '../../types/ticket';
import TicketCard from './TicketCard';
import { MemoryRouter } from 'react-router-dom';

const ticket: Ticket = {
  id: 1,
  title: 'Navbar Bug',
  description: 'Navbar broken',
  priority: 'Critical',
  status: 'Open',
  createdAt: '2026-08-03T12:00:00.000Z',
  updatedAt: '2026-08-03T12:00:00.000Z',
};

function renderTicketCard(props = {}) {
  return render(
    <MemoryRouter>
      <TicketCard ticket={ticket} {...props} />
    </MemoryRouter>,
  );
}

describe('TicketCard', () => {
  it('renders ticket title', () => {
    renderTicketCard();
    expect(screen.getByText('Navbar Bug')).toBeInTheDocument();
  });
  it('rinders ticket desciption', () => {
    renderTicketCard();
    expect(screen.getByText('Navbar broken')).toBeInTheDocument();
  });
  it('rinders status bdge', () => {
    renderTicketCard();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Open/i)).toBeInTheDocument();
  });
  it('rinders priorits bdge', () => {
    renderTicketCard();
    expect(screen.getByText(/Priority:/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical/i)).toBeInTheDocument();
  });
  it('calls onDelete when deletebutton is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderTicketCard({ onDelete });
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderTicketCard({ onEdit });
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(1);
  });
  it('calls when button is clicked', async () => {
    const user = userEvent.setup();
    const onToggleStatus = vi.fn();
    renderTicketCard({ onToggleStatus });
    await user.click(screen.getByRole('button', { name: /change status/i }));
    expect(onToggleStatus).toHaveBeenCalledTimes(1);
    expect(onToggleStatus).toHaveBeenCalledWith(1);
  });
  it('links to ticket detail page', async () => {
    renderTicketCard();
    const link = screen.getByRole('link',{name: 'Navbar Bug'});
    expect(link).toHaveAttribute('href', '/tickets/1');
  });
});
