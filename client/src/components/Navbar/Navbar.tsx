import { useLocation, useNavigate } from 'react-router-dom';
import { useTicketModal } from '../Modal/TicketModalContext';
import { useAuth } from '../../auth/AuthContext';
import './Navbar.scss';

function Navbar() {
  const { openModal } = useTicketModal();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/tickets': 'Tickets',
    '/settings': 'Settings',
  };

  const title = titles[pathname] ?? '';

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const showNewTicketButton = pathname === '/dashboard' || pathname === '/';
  return (
    <header className="navbar">
      <h1>{title}</h1>
      <div className="navbar-action">
        {user && (
          <span className="navbar-user">
            {user.username} ({user.role})
          </span>
        )}

        {showNewTicketButton && user && (user.role === 'Admin' || user.role === 'Developer') && (
          <button onClick={openModal} data-testId="newTicket-button">
            {' '}
            + New Ticket
          </button>
        )}
        <button onClick={handleLogout} data-testid="logout-button">
          {' '}
          Logout
        </button>
      </div>
    </header>
  );
}
export default Navbar;
