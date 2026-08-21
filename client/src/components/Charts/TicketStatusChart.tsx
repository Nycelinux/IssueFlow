import { Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts';
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
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" label outerRadius={90}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#fff',
          }}
          labelStyle={{
            color: '#fff',
          }}
          itemStyle={{
            color: '#fff',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TicketStatusChart;
