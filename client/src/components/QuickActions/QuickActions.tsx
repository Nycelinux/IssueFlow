import { useNavigate } from 'react-router-dom';
import { useTicketModal } from '../Modal/TicketModalContext';
import './QuickActions.scss';

function QuickActions() {
  const navigate = useNavigate();
  const { openModal } = useTicketModal();
  return (
    <div className="quick-action">
      <h2>Quick Actions</h2>
      <button onClick={openModal}> New Ticket</button>
      <button onClick={() => navigate('/tickets')}> {'\uD83C\uDFAB'} All Tickets</button>
      <button onClick={() => navigate('/analytics')}> {'\uD83D\uDCCA'} Analytics</button>
      <button onClick={() => navigate('/settings')}> {'\u2699\uFE0F'} Settings</button>
    </div>
  );
}
export default QuickActions;
