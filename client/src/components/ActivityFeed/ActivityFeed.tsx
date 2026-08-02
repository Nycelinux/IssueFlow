import './ActivityFeed.scss';

interface Activity {
  id: number;
  text: string;
  date: string;
}

interface ActivityProps {
  activities: Activity[];
}

function ActivityFeed({ activities }: ActivityProps) {
  return (
    <div className="activity-feed">
      <h2> Recent activity</h2>

      {activities.length === 0 ? (
        <p>No activity yet</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <p>{activity.text}</p>
            <span>{activity.date}</span>
          </div>
        ))
      )}
    </div>
  );
}
export default ActivityFeed;
