import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Ticket } from '../types/ticket';
import { getTicketById } from '../api/tickets';
import { useTicket } from '../hooks/useTickets';
import '../styles/TicketDetails.scss';

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteTicket, updateTicket, toggleTicketStatus } = useTicket();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTicket() {
      try {
        if (!id) return;
        const data = await getTicketById(Number(id));
        setTicket(data);
      } catch {
        setError('Ticket could not be loaded');
      } finally {
        setLoading(false);
      }
    }
    loadTicket();
  }, [id]);

  if (loading) {
    return <p>Loading ticket...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!ticket) {
    return <p>Ticket not found...</p>;
  }

  async function handleDelete() {
    if (!ticket) return;
    const confirmed = window.confirm('are you sure you want to delete this ticket?');
    if (!confirmed) return;
    await deleteTicket(ticket.id);
    navigate('/');
  }

  function handleEdit() {
    navigate(`/tickets/${id}/edit`);
  }

  async function handleStatusChange() {
    if (!ticket) return;
    await toggleTicketStatus(ticket.id);
    const updated = await getTicketById(ticket.id);
    setTicket(updated);
  }

  return (
    <div className="ticket-details">
      <Link className="back-link" to="/">
        ... Back to dashboard
      </Link>
      <div className="ticket-details-card">
        <h1>{ticket.title}</h1>
        <p>{ticket.description}</p>

        <div className="ticket-info">
          <div>
            Priority: <strong>{ticket.priority}</strong>
          </div>
          <div>
            Status: <strong>{ticket.status}</strong>
          </div>
        </div>
        <div className="ticket-actions">
          <button onClick={handleStatusChange}> Change Status</button>
          <button onClick={handleEdit}> edit ticket</button>
          <button onClick={handleDelete}> Delete ticket</button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
