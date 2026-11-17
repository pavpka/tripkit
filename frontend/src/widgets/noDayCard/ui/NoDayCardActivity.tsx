import { getActivityBgColor, getActivityIcon, type Activity } from '@/entities/activity';
import styles from './NoDayCard.module.scss';

export function NoDayCardActivity({ activity }: { activity: Activity }) {
    return (
        <div className={styles.noDayCardActivity}>
            <div className={styles.noDayCardActivityIcon}
                style={{ backgroundColor: getActivityBgColor(activity.type) }}>
                <img src={`/icons/activities/${getActivityIcon(activity.type)}`} alt={activity.type} />
            </div>
        </div>
    );
}