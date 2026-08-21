import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Ticket } from '../types/ticket';
import { getTicketById } from '../api/tickets';
import { useTicket } from '../hooks/useTickets';
import '../styles/EditTickets.scss';

function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTicket } = useTicket();

  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function loadTicket() {
      if (!id) return;
      const data = await getTicketById(Number(id));
      setTicket(data);
    }
    loadTicket();
  }, [id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ticket) return;
    await updateTicket(ticket);
    navigate(`/tickets/${ticket.id}`);
  }

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-ticket-page">
      <div className="edit-ticket-card">
        <h1>Edit Ticket</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={ticket.title}
            onChange={(event) => setTicket({ ...ticket, title: event.target.value })}
          />
          <textarea
            value={ticket.description}
            onChange={(event) => setTicket({ ...ticket, description: event.target.value })}
          />
          <select
            value={ticket.priority}
            onChange={(event) =>
              setTicket({ ...ticket, priority: event.target.value as Ticket['priority'] })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditTicket;
