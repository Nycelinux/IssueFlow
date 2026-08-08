import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ActivityFeed from './ActivityFeed';

const activities = [
  {
    id: 1,
    text: 'Ticket #25 created',
    date: 'today',
  },
  {
    id: 2,
    text: 'Ticket #30 updated',
    date: 'yesterday',
  },
];

describe('ActivityFeed', () => {
  it('renders heading', () => {
    render(<ActivityFeed activities={activities} />);
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
  });
  it('renders every activity', () => {
    render(<ActivityFeed activities={activities} />);
    expect(screen.getByText(/ticket #25 created/i)).toBeInTheDocument();
    expect(screen.getByText(/ticket #30 updated/i)).toBeInTheDocument();
  });
  it('renders every date', () => {
    render(<ActivityFeed activities={activities} />);
    expect(screen.getByText(/today/i)).toBeInTheDocument();
    expect(screen.getByText(/yesterday/i)).toBeInTheDocument();
  });
  it('renders correct number of activities', () => {
    const { container } = render(<ActivityFeed activities={activities} />);
    const items = container.querySelectorAll('.activity-item');
    expect(items).toHaveLength(2);
  });
  it('renders empty activity list', () => {
    const { container } = render(<ActivityFeed activities={[]} />);
    const items = container.querySelectorAll('.activity-item');
    expect(items).toHaveLength(0);
  });
});
