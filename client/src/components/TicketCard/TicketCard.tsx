import './TicketCard.scss';
import type { Ticket } from '../../types/ticket';
import { Link } from 'react-router-dom';

interface TicketCardProps {
  ticket: Ticket;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onEdit?: (id: number) => void;
  testId?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onDelete, onEdit, onToggleStatus }) => {
  return (
    <div className="ticket-card" data-testId={`ticket-card-${ticket.id}`}>
      <h3 data-testId={`ticket-card-link-${ticket.id}`}>
        <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
      </h3>
      <p data-testId={`ticket-description-${ticket.id}`}>{ticket.description}</p>
      <span
        className={`priority ${ticket.priority.toLowerCase()}`}
        data-testId={`ticket-priority-${ticket.id}`}
      >
        Priority: {ticket.priority}
      </span>
      <p data-testId={`ticket-status-${ticket.id}`}>Status: {ticket.status}</p>
      <div className="ticket-actions" data-testId={`ticket-actions-${ticket.id}`}>
        <button onClick={() => onDelete?.(ticket.id)} data-testId={`ticket-deleteBtn-${ticket.id}`}>
          Delete
        </button>
        <button onClick={() => onEdit?.(ticket.id)} data-testId={`ticket-editBtn-${ticket.id}`}>
          Edit
        </button>
        <button
          onClick={() => onToggleStatus?.(ticket.id)}
          data-testId={`ticket-changestatusBtn-${ticket.id}`}
        >
          Change status
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
