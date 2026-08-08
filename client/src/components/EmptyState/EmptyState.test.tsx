import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmptyState from './EmptyState';
const user = userEvent.setup();
describe('Empty State', () => {
  it('renders title', () => {
    render(
      <EmptyState
        title="No Tickets"
        text="Create your first Tickets"
        buttonText="Create Ticket"
        onButtonClick={() => {}}
      />,
    );
    expect(screen.getByText(/no tickets/i)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <EmptyState
        title="No Tickets"
        text="Create your first Tickets"
        buttonText="Create Ticket"
        onButtonClick={() => {}}
      />,
    );
    expect(screen.getByText(/create your first ticket/i)).toBeInTheDocument();
  });

  it('renders button', () => {
    render(
      <EmptyState
        title="No Tickets"
        text="Create your first Tickets"
        buttonText="Create Ticket"
        onButtonClick={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: /create ticket/i })).toBeInTheDocument();
  });
  it('calls callback when button clicked', async () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No Tickets"
        text="Create your first Tickets"
        buttonText="Create Ticket"
        onButtonClick={onClick}
      />,
    );
    await user.click(screen.getByRole('button', { name: /create ticket/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
