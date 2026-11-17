import { Badge } from '@/shared/ui/Badge';
import { getActivityBgColor, getActivityIcon, getBookedStatusLabel, type Activity } from '../model';
import styles from './ActivityItem.module.scss';
import { formatTime } from '@/shared/lib/time';

export default function ActivityItem({ activity }: { activity: Activity }) {
    return (
        <div className={styles.activityItemContainer}>
            <p className={styles.activityItemTime}>{formatTime(activity.startTime)}</p>
            <div className={styles.activityItem}>
                <div className={styles.activityItemTitle}>
                    <div className={styles.activityItemTitleIcon}
                        style={{ backgroundColor: getActivityBgColor(activity.type) }}>
                        <img
                            src={`/icons/activities/${getActivityIcon(activity.type)}`}
                            alt={activity.type}
                        />
                    </div>
                    <div>
                        <h3>{activity.title}</h3>
                        <span className={styles.activityItemSubtitle}>{activity.address}</span>
                        {activity.note && activity.address && (<span> • </span>)}
                        <span className={styles.activityItemSubtitle}>{activity.note}</span>
                    </div>
                </div>
                <div className={styles.activityItemDetails}>
                    <p>{activity.costEstimate}</p>
                    <Badge color={{ color: '#000', badgeColor: '#E6F0FF' }}>{(activity.bookingStatus) ? getBookedStatusLabel(activity.bookingStatus) : 'Запланировано'}</Badge>
                </div>
            </div>
        </div>
    );
}
