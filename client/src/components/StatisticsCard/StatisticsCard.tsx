import './StatisticsCard.scss';

interface StatisticsCardProps {
  title: string;
  value: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
  return (
    <div className="statistics-card">
      <h3 className="statistics-card__title">{title}</h3>
      <p className="statistics-card__value">{value}</p>
    </div>
  );
};

export default StatisticsCard;
