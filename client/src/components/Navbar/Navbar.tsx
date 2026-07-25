import './Navbar.scss';

interface NavbarProps {
  onNewTicket?: () => void;
}

function Navbar({ onNewTicket }: NavbarProps) {
  return (
    <header className="navbar">
      <h1>Dashboard</h1>
      <button onClick={onNewTicket}> + New Ticket</button>
    </header>
  );
}
export default Navbar;
