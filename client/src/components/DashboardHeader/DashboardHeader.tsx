interface DashboardHeaderProps {
  ticketCount: number;
}

function DashboardHeader({ ticketCount }: DashboardHeaderProps) {
  const today = new Date();
  return (
    <header className="dashboard-header">
      <div>
        <h1>Issue Flow</h1>
        <p>Manage your Software Issues</p>
      </div>

      <div className="dashboard-header-info">
        <p>{today.toLocaleDateString()}</p>
        <span>{ticketCount} tickets</span>
      </div>
    </header>
  );
}
export default DashboardHeader;
