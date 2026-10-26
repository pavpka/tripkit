import { getActivityIcon, type Activity } from '../model';

export default function ActivityItem({ activity }: { activity: Activity }) {
    return (
        <div
            style={{
                border: '1px solid #fff',
                margin: '10px',
                borderRadius: '10px',
            }}
        >
            <img
                src={`/icons/activities/${getActivityIcon(activity.type)}`}
                alt={activity.type}
                style={{ width: '20px' }}
            />
            <h3>{activity.title}</h3>
            <p>{activity.bookingStatus}</p>
            <p>{activity.startTime}</p>
            <p>{activity.address}</p>
            <p>{activity.note}</p>
            <p>{activity.costEstimate}</p>
        </div>
    );
}
