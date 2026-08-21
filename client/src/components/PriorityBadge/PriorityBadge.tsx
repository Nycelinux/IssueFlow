import type { Ticket } from "../../types/ticket";
import './PriorityBadge.scss';

interface PriorityBadgeProps{
    priority: Ticket['priority'];
}

function PriorityBadge({priority}:PriorityBadgeProps){
    return(
        <span className={`priority-badge ${priority.toLowerCase()}`}>{priority} </span>
    );
}
export default PriorityBadge;