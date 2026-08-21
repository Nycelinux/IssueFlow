import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTicketForm from './AddTicketForm';
import type { Ticket } from '../../types/ticket';

const user = userEvent.setup();

describe('rendering test', () => {
  it('renders all from fields', () => {
    render(<AddTicketForm onAddTicket={vi.fn()} />);
    expect(screen.getByPlaceholderText(/enter ticket title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter ticket description/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('rendering test default data', () => {
  it('uses low as default priority', () => {
    render(<AddTicketForm onAddTicket={vi.fn()} />);;
    expect(screen.getByRole('combobox')).toHaveValue('Low');
  });
});

describe('rendering test props', () => {
  it('should test props', () => {
    const ticket: Ticket = {
      id: 1,
      title: 'Navbar Bug',
      description: ' Navbar broken',
      priority: 'Critical',
      status: 'Open',
      createdAt: '',
      updatedAt: '',
    };
    render(<AddTicketForm initialTicket={ticket} onAddTicket={vi.fn()} />);
    expect(screen.getByDisplayValue('Navbar Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Navbar broken')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Critical');
  });
});

describe('rendering test formular input', () => {
  it('should test formular input', async () => {
    render(<AddTicketForm onAddTicket={vi.fn()} />);;

    const input = screen.getByPlaceholderText(/title/i);
    await user.type(input, 'Login Error');
    expect(input).toHaveValue('Login Error');

    await user.type(screen.getByPlaceholderText(/description/i), 'Cannot Login');
    await user.selectOptions(screen.getByRole('combobox'), 'Critical');
    expect(screen.getByRole('combobox')).toHaveValue('Critical');
  });
});

describe('rendering test callback', () => {
  it('should test formular input with callback', async () => {
    const onAddTicketMock= vi.fn();
    render(<AddTicketForm onAddTicket={onAddTicketMock} />);;
    await user.type(screen.getByPlaceholderText(/title/i), 'Login');
    await user.type(screen.getByPlaceholderText(/description/i), 'broken');
    await user.selectOptions(screen.getByRole('combobox'), 'Critical');
    await user.click(screen.getByRole('button'));
    expect(onAddTicketMock).toHaveBeenCalledTimes(1);
    expect(onAddTicketMock).toHaveBeenCalledWith('Login', 'broken', 'Critical');
  });
});

describe('rendering edge test', () => {
  it('should test empty formular', async () => {
    const onAddTicketMock=vi.fn();
    render(<AddTicketForm onAddTicket={onAddTicketMock} />);;
    await user.click(screen.getByRole('button'));
    expect(onAddTicketMock).not.toHaveBeenCalled();
  });
});

describe('rendering test aubmit button text', () => {
  it('should test submit button', async () => {
    render(<AddTicketForm onAddTicket={vi.fn()} submitButtonText="Save Changes" />);
    expect(screen.getByRole('button')).toHaveTextContent('Save Changes');
  });
});
