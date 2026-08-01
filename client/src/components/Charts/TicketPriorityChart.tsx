import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import './TicketStatusChart.scss';

interface TicketPriorityChartProps {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

function TicketPriorityChart({ low, medium, high, critical }: TicketPriorityChartProps) {
  const data = [
    {
      priority: 'Low',
      tickets: low,
      color: '#3b82f6',
    },
    {
      priority: 'Medium',
      tickets: medium,
      color: '#f59e0b',
    },
    {
      priority: 'High',
      tickets: high,
      color: '#10b981',
    },
    {
      priority: 'Critical',
      tickets: critical,
      color: '#ef4444',
    },
  ];
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="priority" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="tickets" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TicketPriorityChart;
