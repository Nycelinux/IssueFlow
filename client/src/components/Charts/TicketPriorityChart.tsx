import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
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

export default TicketPriorityChart;
