import { useTicketModal } from '../Modal/TicketModalContext';
import './Navbar.scss';

function Navbar() {
  const { openModal } = useTicketModal();
  return (
    <header className="navbar">
      <h1>Dashboard</h1>
      <button onClick={openModal}> + New Ticket</button>
    </header>
  );
}
export default Navbar;
