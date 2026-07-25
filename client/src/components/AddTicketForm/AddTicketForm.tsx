import { useState } from 'react';
import type { Ticket } from '../../types/ticket';

interface AddTicketFormProps {
  onAddTicket: (title: string, description: string, priority: Ticket['priority']) => void;
}

function AddTicketForm({ onAddTicket }: AddTicketFormProps) {
  const [title, setTitle] = useState('');
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim() === '') return;
    onAddTicket(title, 'Description for the new ticket', 'Low'); // Default priority set to 'Low'
    setTitle('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter ticket title"
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
}

export default AddTicketForm;
