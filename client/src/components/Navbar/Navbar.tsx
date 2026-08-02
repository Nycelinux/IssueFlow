import { useLocation } from 'react-router-dom';
import { useTicketModal } from '../Modal/TicketModalContext';
import './Navbar.scss';

function Navbar() {
  const { openModal } = useTicketModal();
  const location = useLocation();
  const pathname = location.pathname;
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/tickets': 'Tickets',
    '/settings': 'Settings',
  };

  const title = titles[pathname] ?? '';

  const showNewTicketButton = pathname === '/dashboard' || pathname === '/';
  return (
    <header className="navbar">
      <h1>{title}</h1>
      {showNewTicketButton && <button onClick={openModal}> + New Ticket</button>}
    </header>
  );
}
export default Navbar;
