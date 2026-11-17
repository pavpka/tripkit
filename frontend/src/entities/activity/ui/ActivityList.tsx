import ActivityItem from './ActivityItem';
import type { Activity } from '../model';
import styles from './ActivityList.module.scss';

export default function ActivityList({
    activities,
}: {
    activities: Activity[];
}) {
    return (
        <div className={styles.activityList}>
            {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
        </div>
    );
}
