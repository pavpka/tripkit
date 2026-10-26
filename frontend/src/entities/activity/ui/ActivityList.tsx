import ActivityItem from './ActivityItem';
import type { Activity } from '../model';

export default function ActivityList({
    activities,
}: {
    activities: Activity[];
}) {
    return (
        <div className="activity-list">
            {activities.length}
            {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
        </div>
    );
}
