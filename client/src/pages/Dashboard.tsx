import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import TicketCard from '../components/TicketCard/TicketCard';
import { useState, useEffect } from 'react';
import AddTicketForm from '../components/AddTicketForm/AddTicketForm';
import { getTicketStatistics } from '../components/utils/statistics';
import { searchTickets } from '../components/utils/search';
import Modal from '../components/Modal/Modal';
import { filterTickets } from '../components/utils/filter';
import { sortTickets } from '../components/utils/sort';
import Toolbar from '../components/Toolbar/Toolbar';
import Toast from '../components/Toast/Toast';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialogPrompts';
import TicketStatusChart from '../components/Charts/TicketStatusChart';
import { useTicket } from '../hooks/useTickets';

import type { Ticket } from '../types/ticket';

function Dashboard() {
  const { tickets, addTicket, deleteTicket, updateTicket, toggleTicketStatus } = useTicket();

  const [deleteTicketId, setDeleteTicketId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Priority'>('Newest');
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'All' | Ticket['priority']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Ticket['status']>('All');

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        setShowAddTicketForm(true);
      }
      if (event.key === 'Escape') {
        setShowAddTicketForm(false);
        setEditingTicket(null);
        setDeleteTicketId(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  console.log(tickets);

  const statistics = getTicketStatistics(tickets);
  const searchedTickets = searchTickets(tickets, search);
  const filteredTickets = filterTickets(searchedTickets, priorityFilter, statusFilter);
  const visibleTickets = sortTickets(filteredTickets, sortBy);

  function handleEdit(id: number) {
    const ticketToEdit = tickets.find((ticket) => ticket.id === id);
    if (ticketToEdit) {
      setEditingTicket(ticketToEdit);
    }
  }

  async function handleSaveTicket(
    title: string,
    description: string,
    priority: Ticket['priority'],
  ) {
    if (editingTicket) {
      await updateTicket({ ...editingTicket, title, description, priority });
      setEditingTicket(null);
      return;
    }
    await addTicket(title, description, priority);
    setShowAddTicketForm(false);
  }

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar onNewTicket={() => setShowAddTicketForm(true)} />
        <DashboardHeader ticketCount={visibleTickets.length} />
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
        <section className="statistics-grid">
          <StatisticsCard title="Open Tickets" value={statistics.openTickets} />
          <StatisticsCard title="In Progress" value={statistics.progressTickets} />
          <StatisticsCard title="Closed Tickets" value={statistics.closedTickets} />
          <StatisticsCard title="Critical Tickets" value={statistics.criticalTickets} />
        </section>
        <section className="chart-container">
          <TicketStatusChart
            open={statistics.openTickets}
            progress={statistics.progressTickets}
            closed={statistics.closedTickets}
          />
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
          <ConfirmDialog
            isOpen={deleteTicketId !== null}
            title="Delete Ticket"
            message="Are you sure youwant to Delete ths Ticket?"
            onCancel={() => setDeleteTicketId(null)}
            onConfirm={() => {
              if (deleteTicketId !== null) {
                deleteTicket(deleteTicketId);
                setDeleteTicketId(null);
              }
            }}
          />
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
                onDelete={(id) => setDeleteTicketId(id)}
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
