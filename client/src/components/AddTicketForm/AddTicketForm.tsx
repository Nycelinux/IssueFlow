import { useState } from 'react';
import type { Ticket } from '../../types/ticket';

interface AddTicketFormProps {
  onAddTicket: (title: string, description: string, priority: Ticket['priority']) => void;
  onClose?: () => void;
  initialTicket?: Ticket;
  submitButtonText?: string;
  testId?: string;
}

function AddTicketForm({
  onAddTicket,
  onClose,
  initialTicket,
  submitButtonText,
  testId,
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
    <form onSubmit={handleSubmit} data-testId={testId}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter ticket title"
          data-testId="ticketTitle"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter ticket description"
          data-testId="ticketDescription"
        />
      </div>
      <div>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Ticket['priority'])}
        >
          <option value="Low" data-testId="status-low">
            Low
          </option>
          <option value="Medium" data-testId="status-medium">
            Medium
          </option>
          <option value="High" data-testId="status-high">
            High
          </option>
          <option value="Critical" data-testId="status-critical">
            Critical
          </option>
        </select>
      </div>
      <button type="submit" data-testId={testId}>
        {submitButtonText ?? (initialTicket ? 'Save Changes ' : 'Add Ticket')}
      </button>
    </form>
  );
}

export default AddTicketForm;
