import { ActivityList, type Activity } from '@/entities/activity';
import type { Day } from '@/entities/day';
import { Button } from '@/shared/ui/Button';
import { formatDayDate } from '@/shared/lib/dates';
import styles from './Itinerary.module.scss';

export function Itinerary({
    day,
    index,
    activities,
    openModal,
}: {
    day: Day;
    index: number;
    activities: Activity[];
    openModal: () => void;
}) {

    const formattedDate = formatDayDate(day.date);

    return (
        <div className={styles.dayCard}>
            <div className={styles.dayCardHeader} key={day.id}>
                <div className={styles.dayCardHeaderTitle}>
                    <div className={styles.dayCardIndex}>{index + 1}</div>
                    <h3>
                        {formattedDate}
                        <span className={styles.dayCardHeaderTitleSeparator}>·</span>
                        {day.title ?? 'Без названия'}
                    </h3>
                </div>
                <div className={styles.dayCardHeaderRight}>
                    /amount
                    <Button variant="primary" type='button' onClick={openModal}>+ Активность</Button>
                </div>
            </div>
            <ActivityList activities={activities}></ActivityList>

        </div>
    );
}
