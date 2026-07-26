interface DashboardHeaderProps {
  ticketCount: number;
}

function DashboardHeader({ ticketCount }: DashboardHeaderProps) {
  const today = new Date();
  return (
    <header className="dashboard-header">
      <h1>Issue Flow</h1>
      <p>Manage your Software Issues</p>
      <p>{today.toLocaleDateString()}</p>
      <p>{ticketCount} tickets</p>
    </header>
  );
}
export default DashboardHeader;
