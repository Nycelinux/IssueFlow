import type { Ticket } from '../../types/ticket';

interface FilterBarProps {
  priority: 'All' | Ticket['priority'];
  status: 'All' | Ticket['status'];
  sortBy: 'Newest' | 'Oldest' | 'Priority';

  onPriorityChange: (value: 'All' | Ticket['priority']) => void;
  onStatusChange: (value: 'All' | Ticket['status']) => void;

  onSortChange: (value: 'Newest' | 'Oldest' | 'Priority') => void;
}

function FilterBar({
  priority,
  status,
  sortBy,
  onPriorityChange,
  onStatusChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as 'All' | Ticket['priority'])}
      >
        <option value="All">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as 'All' | Ticket['status'])}
      >
        <option value="All">All status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as 'Newest' | 'Oldest' | 'Priority')}
      >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="Priority">Priority</option>
      </select>
    </div>
  );
}

export default FilterBar;
