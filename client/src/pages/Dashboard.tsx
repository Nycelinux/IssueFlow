import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import TicketCard from '../components/TicketCard/TicketCard';
import { useState } from 'react';
import { tickets as initialTickets } from '../data/tickets';
import AddTicketForm from '../components/AddTicketForm/AddTicketForm';
import type { Ticket } from '../types/ticket';
import SearchBar from '../components/SearchBar/SearchBar';

function Dashboard() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);
  const openTickets = tickets.filter((ticket) => ticket.status === 'Open').length;
  const closedTickets = tickets.filter((ticket) => ticket.status === 'Closed').length;
  const progressTickets = tickets.filter((ticket) => ticket.status === 'In Progress').length;
  const criticalTickets = tickets.filter((ticket) => ticket.priority === 'Critical').length;
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
        <h1>Issue Flow</h1>
        <section className="statistics-grid">
          <StatisticsCard title="Open Tickets" value={openTickets} />
          <StatisticsCard title="In Progress" value={progressTickets} />
          <StatisticsCard title="Closed Tickets" value={closedTickets} />
          <StatisticsCard title="Critical Tickets" value={criticalTickets} />
        </section>
        <section>
          {showAddTicketForm && <AddTicketForm onAddTicket={addTicket} />}

          {tickets
            .filter((ticket) => ticket.title.toLowerCase().includes(search.toLowerCase()))
            .map((ticket) => (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                onDelete={deleteTicket}
                title={ticket.title}
                description={ticket.description}
                priority={ticket.priority}
                status={ticket.status}
                onToggleStatus={toggleTicketStatus}
              />
            ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
