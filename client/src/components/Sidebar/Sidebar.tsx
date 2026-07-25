import './Sidebar.scss';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>IssueFlow</h2>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#">Tickets</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>
  );
}

export default Sidebar;
