import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './TicketStatusChart.scss';

interface TicketStatusChartProps {
  open: number;
  progress: number;
  closed: number;
}

const COLORS = ['#3b82f6', '#f59e0b', '#10b981'];
function TicketStatusChart({ open, progress, closed }: TicketStatusChartProps) {
  const data = [
    { name: 'Open', value: open },
    { name: 'In Progress', value: progress },
    { name: 'Closed', value: closed },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={90}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TicketStatusChart;
