import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import TicketCard from '../components/TicketCard/TicketCard';
import { useState, useEffect } from 'react';
import { tickets as initialTickets } from '../data/tickets';
import AddTicketForm from '../components/AddTicketForm/AddTicketForm';
import type { Ticket } from '../types/ticket';
import { getTicketStatistics } from '../components/utils/statistics';
import { searchTickets } from '../components/utils/search';
import Modal from '../components/Modal/Modal';
import { filterTickets } from '../components/utils/filter';
import { sortTickets } from '../components/utils/sort';
import Toolbar from '../components/Toolbar/Toolbar';
import Toast from '../components/Toast/Toast';
import { saveTickets, loadTickets } from '../components/utils/storage';

function Dashboard() {
  const [tickets, setTickets] = useState(() => {
    return loadTickets() ?? initialTickets;
  });
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Priority'>('Newest');
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'All' | Ticket['priority']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Ticket['status']>('All');
  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

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
    showToast(' Ticket created');
  }
  function deleteTicket(id: number) {
    setTickets((previousTickets) => previousTickets.filter((ticket) => ticket.id !== id));
    showToast('ticket deleted');
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
    showToast('Ticket updated');
  }

  function handleSaveTicket(title: string, description: string, priority: Ticket['priority']) {
    if (!editingTicket) {
      addTicket(title, description, priority);
      return;
    }
    updateTicket(editingTicket.id, title, description, priority);
    setShowAddTicketForm(false);
  }

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
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
        <Toolbar
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          priority={priorityFilter}
          status={statusFilter}
          sortBy={sortBy}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
          ticketCount={visibleTickets.length}
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
          {visibleTickets.length === 0 ? (
            <div className="empty-state">
              <h2>No tickets found.</h2>
              <p>Try adjusting your search or adding a new ticket.</p>
            </div>
          ) : (
            visibleTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={deleteTicket}
                onEdit={handleEdit}
                onToggleStatus={toggleTicketStatus}
              />
            ))
          )}
        </section>
        {toastMessage && <Toast message={toastMessage} />}
      </main>
    </div>
  );
}

export default Dashboard;
