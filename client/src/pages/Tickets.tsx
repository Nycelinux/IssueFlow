import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Tickets.scss';
import { useTicket } from '../hooks/useTickets';
import type { Ticket } from '../types/ticket';
import { searchTickets } from '../components/utils/search';
import { sortTickets } from '../components/utils/sort';
import Toolbar from '../components/Toolbar/Toolbar';
import TicketCard from '../components/TicketCard/TicketCard';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialogPrompts';

function Tickets() {
  const { tickets, deleteTicket, toggleTicketStatus } = useTicket();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Priority'>('Newest');
  const [statusFilter, setStatusFilter] = useState<'All' | Ticket['status']>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Ticket['priority']>('All');
  const [deleteTicketId, setDeleteTicketId] = useState<number | null>(null);
  const searchedTickets = searchTickets(tickets, search);
  const filteredTickets = searchedTickets.filter((ticket) => {
    if (statusFilter !== 'All' && ticket.status !== statusFilter) {
      return false;
    }
    if (priorityFilter !== 'All' && ticket.priority !== priorityFilter) {
      return false;
    }
    return true;
  });
  const visibleTickets = sortTickets(filteredTickets, sortBy);

  return (
    <div className="tickets-page">
      <h1>Tickets</h1>

      <Toolbar
        search={search}
        sortBy={sortBy}
        status={statusFilter}
        priority={priorityFilter}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSortChange={setSortBy}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        ticketCount={visibleTickets.length}
      />
      {visibleTickets.length === 0 ? (
        <div className="no-tickets-message">
          <h2>No tickets found.</h2>
          <p> Try changing your filters</p>
        </div>
      ) : (
        visibleTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onDelete={(id) => setDeleteTicketId(id)}
            onToggleStatus={toggleTicketStatus}
          />
        ))
      )}

      <ConfirmDialog
        isOpen={deleteTicketId !== null}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket?"
        onConfirm={() => {
          if (deleteTicketId !== null) {
            deleteTicket(deleteTicketId);
            setDeleteTicketId(null);
          }
        }}
        onCancel={() => setDeleteTicketId(null)}
      />
    </div>
  );
}
export default Tickets;
