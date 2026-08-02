import type { Ticket } from "../../types/ticket";
import './StatusBadge.scss';

interface StatusBadgeProps{
    status: Ticket['status'];
}

function StatusBadge({status}: StatusBadgeProps){
    return(
        <span className={`status-badge ${status.toLowerCase().replace(' ','-')}`}>{status}</span>
    );
}

export default StatusBadge;

