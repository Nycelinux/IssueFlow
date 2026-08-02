import StatisticsCard from '../components/StatisticsCard/StatisticsCard';
import { useTicket } from '../hooks/useTickets';
import { getTicketStatistics } from '../components/utils/statistics';
import TicketStatusChart from '../components/Charts/TicketStatusChart';
import TicketPriorityChart from '../components/Charts/TicketPriorityChart';

function Analytics() {
  const { tickets } = useTicket();
  const statistics = getTicketStatistics(tickets);
  return (
    <div className="dashboard">
      <main>
        <h1>Analytics</h1>
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
