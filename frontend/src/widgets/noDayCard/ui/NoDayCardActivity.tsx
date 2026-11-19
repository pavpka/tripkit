import { getActivityBgColor, getActivityIcon, type Activity } from '@/entities/activity';
import styles from './NoDayCard.module.scss';

export function NoDayCardActivity({ activity, withGrip = true }: { activity: Activity, withGrip?: boolean }) {
    return (
        <div className={styles.noDayCardActivity}>
            <div className={styles.noDayCardActivityContent}>
                <div className={styles.noDayCardActivityIcon}
                    style={{ backgroundColor: getActivityBgColor(activity.type) }}>
                    <img src={`/icons/activities/${getActivityIcon(activity.type)}`} alt={activity.type} />
                </div>
                <h4>{activity.title}</h4>
            </div>
            {withGrip && <img src="/icons/shared/grip.svg" className={styles.noDayCardActivityGrip} />}
        </div>
    );
}