import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>IssueFlow</h2>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
