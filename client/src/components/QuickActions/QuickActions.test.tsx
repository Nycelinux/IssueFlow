import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuickActions from './QuickActions';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useTicketModal } from '../Modal/TicketModalContext';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

vi.mock('../Modal/TicketModalContext', () => ({
  useTicketModal: vi.fn(),
}));

describe('QuickActions', () => {
  const navigateMock = vi.fn();
  const openModalMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    vi.mocked(useTicketModal).mockReturnValue({
      open: false,
      openModal: openModalMock,
      closeModal: vi.fn(),
    });
  });
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all tickets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new ticket/i })).toBeInTheDocument();
  });

  it('contains four buttons', () => {
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('opens the new ticket modal', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /new ticket/i }));
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  it('navigates to tickets', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /all tickets/i }));
    expect(navigateMock).toHaveBeenCalledWith('/tickets');
  });

  it('navigates to analytics', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /analytics/i }));
    expect(navigateMock).toHaveBeenCalledWith('/analytics');
  });

  it('navigates to settings', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: /settings/i }));
    expect(navigateMock).toHaveBeenCalledWith('/settings');
  });
});
