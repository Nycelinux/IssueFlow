import { describe, it, expect,vi } from 'vitest'; 
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTicketForm from './AddTicketForm';

describe('rendering test',()=> { 
it('renders all from fields', ()=>{
render(<AddTicketForm onAddTicket={vi.fn()} />);
expect(screen.getByPlaceholderText(/enter ticket title/i)).toBeInTheDocument();
expect(screen.getByPlaceholderText(/enter ticket description/i)).toBeInTheDocument();
expect(screen.getByRole('combobox')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeInTheDocument();
});
});