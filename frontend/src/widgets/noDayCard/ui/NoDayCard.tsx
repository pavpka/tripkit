import { getActivityBgColor, getActivityIcon, type Activity } from '@/entities/activity';
import { Button } from '@/shared/ui/Button';
import styles from './NoDayCard.module.scss';

export function NoDayCard({ activities, openModal }: { activities: Activity[], openModal: () => void }) {

    const noDay = activities.filter((activity) => activity.dayId === null);
    return noDay.length > 0 ? (
        <div className={styles.noDayCard}>
            <div className={styles.noDayCardHeader}>
                <h3>📥 Без дня</h3>
                <Button variant="primary" type='button' onClick={openModal}>+ Активность</Button>
            </div>
            {noDay.map((activity) => (
                <div className={styles.noDayCardActivity} key={activity.id}>
                    <div className={styles.noDayCardActivityIcon}
                        style={{ backgroundColor: getActivityBgColor(activity.type) }}>
                        <img
                            src={`/icons/activities/${getActivityIcon(activity.type)}`}
                            alt={activity.type}
                        />
                    </div>
                    <h4>{activity.title}</h4>
                </div>
            ))}
            <p className={styles.noDayCardNote}>Перетащи в нужный день</p>
        </div>
    ) : null;
}
