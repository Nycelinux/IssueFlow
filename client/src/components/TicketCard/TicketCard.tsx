import './TicketCard.scss';
import type { Ticket } from '../../types/ticket';
import { Link } from 'react-router-dom';

interface TicketCardProps {
  ticket: Ticket;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDelete, onEdit, onToggleStatus }) => {
  return (
    <Link to={`/tickets/${ticket.id}`}>
      <div className="ticket-card">
        <h3>{ticket.title}</h3>
        <p>{ticket.description}</p>
        <span className={`priority ${ticket.priority.toLowerCase()}`}>
          Priority: {ticket.priority}
        </span>
        <p>Status: {ticket.status}</p>
        <div className="ticket-actions">
          <button onClick={() => onDelete?.(ticket.id)}>Delete</button>
          <button onClick={() => onEdit?.(ticket.id)}>Edit</button>
          <button onClick={() => onToggleStatus?.(ticket.id)}>Change status</button>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
