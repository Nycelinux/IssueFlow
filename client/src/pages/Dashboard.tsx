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

function Dashboard() {
  const { tickets, addTicket, updateTicket, toggleTicketStatus } = useTicket();

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
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }

  return (
    <div className="dashboard">
      <DashboardHeader ticketCount={tickets.length} />
      <section className="statistics-grid">
        <StatisticsCard title="Open Tickets" value={statistics.openTickets} />
        <StatisticsCard title="In Progress" value={statistics.progressTickets} />
        <StatisticsCard title="Closed Tickets" value={statistics.closedTickets} />
        <StatisticsCard title="Critical" value={statistics.criticalTickets} />
      </section>
      <section className="dashboard-content">
        <h2>Recent Tickets</h2>
        {recentTickets.length === 0 ? (
          <p>No tickets available. Create a new ticket to get started.</p>
        ) : (
          recentTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={handleEdit}
              onToggleStatus={toggleTicketStatus}
              onDelete={() => {}}
            />
          ))
        )}
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
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}

export default Dashboard;
