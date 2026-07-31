import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Ticket } from '../types/ticket';
import { getTicketById, getTickets } from '../api/tickets';

function TicketDetails() {
  const { id } = useParams();
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
  return (
    <div className="ticket-details">
      <Link to="/">... Back to dashboard</Link>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <div>
        Priority: <strong>{ticket.priority}</strong>
      </div>
      <div>
        Status: <strong>{ticket.status}</strong>
      </div>
    </div>
  );
}

export default TicketDetails;
