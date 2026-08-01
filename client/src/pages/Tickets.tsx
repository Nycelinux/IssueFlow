import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Tickets.scss';
import { useTicket } from '../hooks/useTickets';

function Tickets() {
  const { tickets } = useTicket();
  const [search, setSearch] = useState('');
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="tickets-page">
      <h1>Tickets</h1>
      <input
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="tickets-list">
        {filteredTickets.map((ticket) => (
          <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="ticket-item">
            <h2>{ticket.title}</h2>
            <p>{ticket.status}</p>
            <span>{ticket.priority}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Tickets;
