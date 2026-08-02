interface DashboardHeaderProps {
  ticketCount: number;
  openTickets: number;
}

function DashboardHeader({ ticketCount, openTickets }: DashboardHeaderProps) {
  const today = new Date();
  const formattedDay = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <h1>Welcome Back</h1>
        <p>Manage your Software Issues effecently and keep track o your team's progress.</p>
        <span className="dashboard-data">{formattedDay}</span>
      </div>

      <div className="dashboard-header-right">
        <div className="dashboard-info-card">
          <h2>{ticketCount} tickets</h2>
          <p>Total Tickets</p>
        </div>

        <div className="dashboard-info-card">
          <h2>{openTickets}</h2>
          <p>Open Tickets</p>
        </div>
      </div>
    </header>
  );
}
export default DashboardHeader;
