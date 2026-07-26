import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar';
import type { Ticket } from '../../types/ticket';
import type React from 'react';

interface ToolbarProps {
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priority: 'All' | Ticket['priority'];
  status: 'All' | Ticket['status'];
  sortBy: 'Newest' | 'Oldest' | 'Priority';

  onPriorityChange: (value: 'All' | Ticket['priority']) => void;
  onStatusChange: (value: 'All' | Ticket['status']) => void;

  onSortChange: (value: 'Newest' | 'Oldest' | 'Priority') => void;

  ticketCount: number;
}

function Toolbar({
  search,
  onSearchChange,
  priority,
  status,
  sortBy,
  onPriorityChange,
  onStatusChange,
  onSortChange,
  ticketCount,
}: ToolbarProps) {
  return (
    <section className="toolbar">
      <SearchBar value={search} onChange={onSearchChange} placeholder="search Tickets..." />

      <FilterBar
        priority={priority}
        status={status}
        sortBy={sortBy}
        onPriorityChange={onPriorityChange}
        onStatusChange={onStatusChange}
        onSortChange={onSortChange}
      />

      <p className="ticket-counter">
        Showig {ticketCount} ticket
        {ticketCount !== 1 ? 's' : ''}
      </p>
    </section>
  );
}

export default Toolbar;
