import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import FilterBar from '../components/FilterBar/FilterBar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import TicketCard from '../components/TicketCard/TicketCard';
import { useState } from 'react';
import { tickets as initialTickets } from '../data/tickets';
import AddTicketForm from '../components/AddTicketForm/AddTicketForm';
import type { Ticket } from '../types/ticket';
import SearchBar from '../components/SearchBar/SearchBar';
import { getTicketStatistics } from '../components/utils/statistics';
import { searchTickets } from '../components/utils/search';
import Modal from '../components/Modal/Modal';
import { filterTickets } from '../components/utils/filter';
import { sortTickets } from '../components/utils/sort';

function Dashboard() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Priority'>('Newest');
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'All' | Ticket['priority']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Ticket['status']>('All');
  const statistics = getTicketStatistics(tickets);
  const searchedTickets = searchTickets(tickets, search);
  const filteredTickets = filterTickets(searchedTickets, priorityFilter, statusFilter);
  const visibleTickets = sortTickets(filteredTickets, sortBy);

  function addTicket(title: string, description: string, priority: Ticket['priority']) {
    const newTicket: Ticket = {
      id: Date.now(),
      title,
      description,
      priority,
      status: 'Open',
    };
    setTickets((previousTickets) => [newTicket, ...previousTickets]);
  }
  function deleteTicket(id: number) {
    setTickets((previousTickets) => previousTickets.filter((ticket) => ticket.id !== id));
  }
  function handleEdit(id: number) {
    const ticketToEdit = tickets.find((ticket) => ticket.id === id);
    if (ticketToEdit) {
      setEditingTicket(ticketToEdit);
    }
  }

  function saveEditedTicket(updatedTicket: Ticket) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket)),
    );
    setEditingTicket(null);
  }

  function updateTicket(
    id: number,
    title: string,
    description: string,
    priority: Ticket['priority'],
  ) {
    setTickets((previousTicket) =>
      previousTicket.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              title,
              description,
              priority,
            }
          : ticket,
      ),
    );
    setEditingTicket(null);
  }

  function handleSaveTicket(title: string, description: string, priority: Ticket['priority']) {
    if (!editingTicket) {
      addTicket(title, description, priority);
      return;
    }
    updateTicket(editingTicket.id, title, description, priority);
    setShowAddTicketForm(false);
  }

  function toggleTicketStatus(id: number) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status:
                ticket.status === 'Open'
                  ? 'In Progress'
                  : ticket.status === 'In Progress'
                    ? 'Closed'
                    : 'Open',
            }
          : ticket,
      ),
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar onNewTicket={() => setShowAddTicketForm(true)} />
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterBar
          priority={priorityFilter}
          status={statusFilter}
          sortBy={sortBy}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
        />
        <h1>Issue Flow</h1>
        <section className="statistics-grid">
          <StatisticsCard title="Open Tickets" value={statistics.openTickets} />
          <StatisticsCard title="In Progress" value={statistics.progressTickets} />
          <StatisticsCard title="Closed Tickets" value={statistics.closedTickets} />
          <StatisticsCard title="Critical Tickets" value={statistics.criticalTickets} />
        </section>
        <section>
          <Modal
            isOpen={showAddTicketForm}
            title="Add New Ticket"
            onClose={() => setShowAddTicketForm(false)}
          >
            <AddTicketForm
              submitButtonText="Ceate Ticket"
              onAddTicket={handleSaveTicket}
              onClose={() => setShowAddTicketForm(false)}
            />
          </Modal>
          <Modal
            isOpen={editingTicket !== null}
            title="Edit Ticket"
            onClose={() => setEditingTicket(null)}
          >
            {editingTicket && (
              <AddTicketForm
                initialTicket={editingTicket}
                submitButtonText="save changes"
                onAddTicket={handleSaveTicket}
                onClose={() => setEditingTicket(null)}
              />
            )}
          </Modal>
          {editingTicket && (
            <div className="edit-ticket-form">
              im dashboard ausgewählt zum editieren: <strong>{editingTicket.title}</strong>
              <button onClick={() => setEditingTicket(null)}>Close</button>
            </div>
          )}
          {filteredTickets.length === 0 ? (
            <div className="empty-state">
              <h2>No tickets found.</h2>
              <p>Try adjusting your search or adding a new ticket.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                onDelete={deleteTicket}
                ticket={ticket}
                onEdit={handleEdit}
                onToggleStatus={toggleTicketStatus}
              />
            ))
          )}
          {visibleTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={deleteTicket}
              onEdit={handleEdit}
              onToggleStatus={toggleTicketStatus}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
