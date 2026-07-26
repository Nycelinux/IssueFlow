import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import TicketDetails from './pages/TicketDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tickets/:id" element={<TicketDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
