import { useState, useEffect } from 'react';
import AddTicketForm from '../components/AddTicketForm/AddTicketForm';
import Modal from '../components/Modal/Modal';

import Toast from '../components/Toast/Toast';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { useTicket } from '../hooks/useTickets';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import type { Ticket } from '../types/ticket';
import TicketCard from '../components/TicketCard/TicketCard';
import { getTicketStatistics } from '../components/utils/statistics';
import { useTicketModal } from '../components/Modal/TicketModalContext';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialogPrompts';
import QuickActions from '../components/QuickActions/QuickActions';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import '../styles/layout/_dashboard.scss';
import EmptyState from '../components/EmptyState/EmptyState';

function Dashboard() {
  const { tickets, addTicket, updateTicket, toggleTicketStatus, deleteTicket } = useTicket();

  const [toastMessage, setToastMessage] = useState('');
  const { open, openModal, closeModal } = useTicketModal();

  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        openModal();
      }
      if (event.key === 'Escape') {
        closeModal();
        setEditingTicket(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  console.log(tickets);

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
      closeModal();
      setToastMessage('Ticket updated successfully!');
      return;
    } else {
      await addTicket(title, description, priority);
      closeModal();
      setToastMessage('Ticket created successfully!');
    }
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }

  const recentTickets = [...tickets].sort((a, b) => b.id - a.id).slice(0, 5);
  const statistics = getTicketStatistics(tickets);
  const [deleteTicketId, setDeleteTicketId] = useState<number | null>(null);
  //test data
  const activities = [
    {
      id: 1,
      text: 'Ticket #58 created',
      date: 'today',
    },
    { id: 2, text: 'Ticket #76 updated', date: 'yesterday' },
    { id: 3, text: 'Ticket #45 closed', date: '2 days ago' },
  ];
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }

  return (
    <div className="dashboard">
      <DashboardHeader ticketCount={tickets.length} openTickets={statistics.openTickets} />
      <section className="statistics-grid">
        <StatisticsCard
          title="Open Tickets"
          value={statistics.openTickets}
          description="Currently wanting to be resolved"
          icon={'\uD83D\uDFE2'}
          color="#10b981"
        />
        <StatisticsCard
          title="In Progress"
          value={statistics.progressTickets}
          description="Currently being worked on"
          icon={'\u2699\uFE0F'}
          color="#3b82f6"
        />
        <StatisticsCard
          title="Closed Tickets"
          value={statistics.closedTickets}
          description="Successfully completed"
          icon={'\u2705'}
          color="#6b7280"
        />
        <StatisticsCard
          title="Critical"
          value={statistics.criticalTickets}
          description="Need immediate attention"
          icon={'\uD83D\uDEA8'}
          color="#ef4444"
        />
      </section>

      <section className="dashboard-main">
        <div className="dashboard-content">
          <h2>Recent Tickets</h2>
          {recentTickets.length === 0 ? (
            <EmptyState
              title="No tickets available"
              text=" Create your first Ticket to get started..."
              buttonText="Create Ticket"
              onButtonClick={openModal}
            />
          ) : (
            recentTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleEdit}
                onToggleStatus={toggleTicketStatus}
                onDelete={(id) => setDeleteTicketId(id)}
              />
            ))
          )}
        </div>
        <QuickActions />
        <ActivityFeed activities={activities} />
      </section>

      <Modal isOpen={open} title="Add New Ticket" onClose={closeModal}>
        <AddTicketForm
          submitButtonText="Ceate Ticket"
          onAddTicket={handleSaveTicket}
          onClose={closeModal}
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
        title="Confirm Delete"
        message="Are you sure you want to delete this ticket?"
        onConfirm={() => {
          if (deleteTicketId !== null) {
            deleteTicket(deleteTicketId);
            setDeleteTicketId(null);
          }
        }}
        onCancel={() => setDeleteTicketId(null)}
      />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}

export default Dashboard;
