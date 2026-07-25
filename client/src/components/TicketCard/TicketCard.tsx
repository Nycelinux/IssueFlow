import { tickets } from '../../data/tickets';
import './TicketCard.scss';

interface TicketCardProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  id,
  title,
  description,
  priority,
  status,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <div className="ticket-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={`priority ${priority.toLowerCase()}`}>Priority: {priority}</span>
      <p>Status: {status}</p>
      <button onClick={() => onDelete?.(id)}>Delete</button>
      <button onClick={() => onToggleStatus?.(id)}>Change status</button>
    </div>
  );
};

export default TicketCard;
