import './TicketCard.scss';

interface TicketCardProps {
  title: string;
  priority: string;
  status: string;
}

const TicketCard: React.FC<TicketCardProps> = ({ title, priority, status }) => {
  return (
    <div className="ticket-card">
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TicketCard;
