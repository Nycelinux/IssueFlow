import './StatisticsCard.scss';

interface StatisticsCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
  color: string;
  testId?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  description,
  icon,
  color,
  testId,
}) => {
  return (
    <div
      className="statistics-card"
      style={{ borderLeft: `5px solid ${color}` }}
      data-testId={testId}
    >
      <div className="statistics-card-header">
        <span className="statistics-card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
};

export default StatisticsCard;
