import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import { MemoryRouter } from 'react-router-dom';

const mockUseTicket = vi.fn();
const mockUseTicketModal = vi.fn();

vi.mock('..hooks/useTickets', () => ({
  useTicket: () => mockUseTicket(),
}));

vi.mock('..components/Modal/TicketModalContext', () => ({
  useTicketModal: () => mockUseTicketModal(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    mockUseTicket.mockReturnValue({
      tickets: [],
      addTicket: vi.fn(),
      updateTicket: vi.fn(),
      toggleTicketStatus: vi.fn(),
      deleteTicket: vi.fn(),
    });

    mockUseTicketModal.mockReturnValue({ open: false, openModal: vi.fn(), closeModal: vi.fn() });
  });
  function renderDashboard() {
    return render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
  }

  it('renders statistics cards', () => {
    renderDashboard();
    expect(screen.getByText(/Open Tickets/i)).toBeInTheDocument;
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument;
    expect(screen.getByText(/Closed Tickets/i)).toBeInTheDocument;
    expect(screen.getByText(/Critical/i)).toBeInTheDocument;
  });

  it('shows empty state when there are no tickets', () => {
    renderDashboard();
    expect(screen.getByText(/No tickets available/i)).toBeInTheDocument;
    expect(screen.getByText(/Create your first Ticket/i)).toBeInTheDocument;
  });

  it('renders recent tickets when Tickets exist', () => {
    mockUseTicket.mockReturnValue({
      tickets: [
        {
          id: 1,
          title: 'Login Error',
          description: 'Cannot login',
          priority: 'High',
          status: 'Open',
          createdAt: '',
          updatedAt: '',
        },
      ],
      addTicket: vi.fn(),
      updateTicket: vi.fn(),
      toggleTicketStatus: vi.fn(),
      deleteTicket: vi.fn(),
    });
    renderDashboard();
    expect(screen.getByText(/Login Error/i)).toBeInTheDocument;
    expect(screen.getByText(/Cannot Login/i)).toBeInTheDocument;
  });

  it('opens modal when empty state button is clicked', async () => {
    const user = userEvent.setup();
    const openModal = vi.fn();

    mockUseTicketModal.mockReturnValue({
      open: false,
      openModal,
      closeModal: vi.fn(),
    });
    renderDashboard();
    await user.click(screen.getByRole('button', { name: /create ticket/i }));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  it('shows toast when oast message exists', () => {
    mockUseTicketModal.mockReturnValue({
      open: true,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });
    renderDashboard();
    expect(screen.getByText(/Add new Ticket/i)).toBeInTheDocument;
  });
});
