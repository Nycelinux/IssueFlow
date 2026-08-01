import { BarChart, Bar, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import './TicketStatusChart.scss';

interface TicketStatusChartProps {
  open: number;
  progress: number;
  closed: number;
}

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
    },
    {
      priority: 'Medium',
      tickets: medium,
    },
    {
      priority: 'High',
      tickets: high,
    },
    {
      priority: 'Critical',
      tickets: critical,
    },
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981'];
  function TicketStatusChart({ open, progress, closed }: TicketStatusChartProps) {
    const data = [
      { name: 'Open', value: open },
      { name: 'In Progress', value: progress },
      { name: 'Closed', value: closed },
    ];
    console.log('chart data: ' + data);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="priority" />
          <YAxis allowDecimals={true} />
          <Tooltip />
          <Bar dataKey="tickets" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
export default TicketPriorityChart;
