interface DashboardHeaderProps {
  ticketCount: number;
  openTickets: number;
  testId?: string;
}

function DashboardHeader({ ticketCount, openTickets, testId }: DashboardHeaderProps) {
  const today = new Date();
  const formattedDay = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left" data-testId={testId}>
        <h1 data-testId="dashboard-title">Welcome Back</h1>
        <p data-testId="dashboard-description">
          Manage your Software Issues effecently and keep track o your team's progress.
        </p>
        <span className="dashboard-data">{formattedDay}</span>
      </div>

      <div className="dashboard-header-right" data-testId={testId}>
        <div className="dashboard-info-card">
          <h2 data-testId="totalTicket-title">Total Tickets </h2>
          <p data-testId="totalTicket-count"> {ticketCount} tickets</p>
        </div>

        <div className="dashboard-info-card" data-testId={testId}>
          <h2 data-testId="openTickets-title">Open Tickets </h2>
          <p data-testId="openTickets-count">{openTickets} tickets</p>
        </div>
      </div>
    </header>
  );
}
export default DashboardHeader;
