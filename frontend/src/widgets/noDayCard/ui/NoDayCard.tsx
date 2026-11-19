import { type Activity } from '@/entities/activity';
import { Button } from '@/shared/ui/Button';
import styles from './NoDayCard.module.scss';
import { DraggableActivity } from '@/features/activity-dnd';
import { NoDayCardActivity } from './NoDayCardActivity';

export function NoDayCard({ activities, openModal }: { activities: Activity[], openModal: () => void }) {

    const noDay = activities.filter((activity) => activity.dayId === null);
    return noDay.length > 0 ? (
        <div className={styles.noDayCard}>
            <div className={styles.noDayCardHeader}>
                <h3>📥 Без дня</h3>
                <Button variant="primary" type='button' onClick={openModal}>+ Активность</Button>
            </div>
            {noDay.map((activity) => (
                <DraggableActivity activity={activity} key={activity.id}>
                    <NoDayCardActivity activity={activity} />
                </DraggableActivity>
            ))}
            <p className={styles.noDayCardNote}>Перетащи в нужный день</p>
        </div>
    ) : null;
}
