import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Tickets.scss';
import { useTicket } from '../hooks/useTickets';
import type { Ticket } from '../types/ticket';
import { searchTickets } from '../components/utils/search';
import { sortTickets } from '../components/utils/sort';
import Toolbar from '../components/Toolbar/Toolbar';
import TicketCard from '../components/TicketCard/TicketCard';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialogPrompts';
import { paginateTickets } from '../components/utils/pagination';
import { useSettings } from '../hooks/useSettings';
import Pagination from '../components/Pagination/Pagination';
import EmptyState from '../components/EmptyState/EmptyState';

function Tickets() {
  const { tickets, deleteTicket, toggleTicketStatus } = useTicket();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { settings } = useSettings();
  const navigate = useNavigate();
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

  const sortedTickets = sortTickets(filteredTickets, sortBy);
  const visibleTickets = paginateTickets(sortedTickets, currentPage, settings.ticketsPerPage);
  const totalPages = Math.ceil(sortedTickets.length / settings.ticketsPerPage);
  function handleEdit(id: number) {
    const ticketToEdit = tickets.find((ticket) => ticket.id === id);
    if (ticketToEdit) {
      navigate(`/tickets/${id}/edit`);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, priorityFilter, statusFilter, settings.ticketsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
        <EmptyState
          title="No tickets found"
          text="Try changing your filters  or create a new ticket"
        />
      ) : (
        visibleTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={handleEdit}
            onDelete={(id) => setDeleteTicketId(id)}
            onToggleStatus={toggleTicketStatus}
          />
        ))
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

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
