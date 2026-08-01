import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import TicketDetails from './pages/TicketDetails';
import NotFound from './pages/NotFound';
import EditTicket from './pages/EditTickets';
import Tickets from './pages/Tickets';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
      <Route path="/" element={<Dashboard />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/tickets/:id/edit" element={<EditTicket />} />
      <Route path="/tickets/:id" element={<TicketDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
