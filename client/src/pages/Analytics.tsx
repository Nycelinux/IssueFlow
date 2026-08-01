import Sidebar from '../components/Sidebar/Sidebar';
import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import { useTicket } from '../hooks/useTickets';
import { getTicketStatistics } from '../components/utils/statistics';
import TicketStatusChart from '../components/Charts/TicketStatusChart';
import Navbar from '../components/Navbar/Navbar';
import TicketPriorityChart from '../components/Charts/TicketPriorityChart';

function Analytics() {
  const { tickets } = useTicket();
  const statistics = getTicketStatistics(tickets);
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h1>Analytics</h1>
        <section className="statistics-grid">
          <StatisticsCard title="Open Tickets" value={statistics.openTickets} />
          <StatisticsCard title="In Progress" value={statistics.progressTickets} />
          <StatisticsCard title="Closed Tickets" value={statistics.closedTickets} />
          <StatisticsCard title="Critical Tickets" value={statistics.criticalTickets} />
        </section>
        <section className="chart-container">
          <h2>Ticket Status</h2>
          <TicketStatusChart
            open={statistics.openTickets}
            progress={statistics.progressTickets}
            closed={statistics.closedTickets}
          />
          <section className="chart-container">
            <h2>Ticket Priorities</h2>
            <TicketPriorityChart
              low={statistics.lowPriority}
              medium={statistics.mediumPriority}
              high={statistics.highPriority}
              critical={statistics.criticalTickets}
            />
          </section>
        </section>
      </main>
    </div>
  );
}

export default Analytics;
