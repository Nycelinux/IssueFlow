import { useState } from 'react';
import type { Ticket } from '../../types/ticket';

interface AddTicketFormProps {
  onAddTicket: (
    title: string,
    description: string,
    priority: Ticket['priority'],
  ) => void | Promise<void>;
  onClose?: () => void;
  initialTicket?: Ticket;
  submitButtonText?: string;
}

function AddTicketForm({
  onAddTicket,
  onClose,
  initialTicket,

  submitButtonText,
}: AddTicketFormProps) {
  const [title, setTitle] = useState(initialTicket?.title ?? '');
  const [description, setDescription] = useState(initialTicket?.description ?? '');
  const [priority, setPriority] = useState<Ticket['priority']>(initialTicket?.priority ?? 'Low');
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim() === '') return;

    await onAddTicket(title, description, priority);
    // Default priority set to 'Low'
    setTitle('');
    setDescription('');
    setPriority('Low');
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter ticket title"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter ticket description"
        />
      </div>
      <div>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Ticket['priority'])}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <button type="submit">
        {submitButtonText ?? (initialTicket ? 'Save Changes ' : 'Add Ticket')}
      </button>
    </form>
  );
}

export default AddTicketForm;
