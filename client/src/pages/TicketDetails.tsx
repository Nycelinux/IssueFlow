import { useParams } from 'react-router-dom';

function TicketDetails() {
  const { id } = useParams();
  return (
    <main>
      <h1>Ticked {id}</h1>
      <p> Details coming soon...</p>
    </main>
  );
}

export default TicketDetails;
