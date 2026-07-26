import { useState } from 'react';
import type { Ticket } from '../../types/ticket';

interface AddTicketFormProps {
  onAddTicket: (title: string, description: string, priority: Ticket['priority']) => void;
  onClose?: () => void;
  initialTicket?: Ticket;
  editingTicket?: Ticket | null; // Optional prop for editing an existing ticket
  submitButtonText?: string;
  onSaveEdit?: (ticket: Ticket) => void; // Optional prop to indicate if the form is for editing an existing ticket
}

function AddTicketForm({
  onAddTicket,
  onClose,
  editingTicket,
  onSaveEdit,
  submitButtonText,
}: AddTicketFormProps) {
  const [title, setTitle] = useState(editingTicket?.title ?? '');
  const [description, setDescription] = useState(editingTicket?.description ?? '');
  const [priority, setPriority] = useState<Ticket['priority']>(editingTicket?.priority ?? 'Low');
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim() === '') return;
    if (editingTicket && onSaveEdit) {
      onSaveEdit({
        ...editingTicket,
        title,
        description,
        priority,
      });
      return;
    }

    onAddTicket(title, description, priority);
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
      <button type="submit">{editingTicket ? 'Save Changes ' : 'Add Ticket'}</button>
    </form>
  );
}

export default AddTicketForm;
