import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import TicketCard from '../components/TicketCard/TicketCard';
import { tickets } from '../data/tickets';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h1>Issue Flow</h1>
        <section className="statistics-grid">
          <StatisticsCard title="Open Tickets" value={12} />
          <StatisticsCard title="In Progress" value={5} />
          <StatisticsCard title="Closed Tickets" value={18} />
          <StatisticsCard title="Critical Tickets" value={2} />
        </section>
        <section>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              title={ticket.title}
              priority={ticket.priority}
              status={ticket.status}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
