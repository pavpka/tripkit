import { ActivityList, type Activity } from '@/entities/activity';
import type { Day } from '@/entities/day';
import { Button } from '@/shared/ui/Button';
import { formatDayDate } from '@/shared/lib/dates';
import styles from './Itinerary.module.scss';
import { DayDropZone } from '@/features/activity-dnd';

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
        <DayDropZone dayId={day.id}>
            {(isOver) => (
                <div className={styles.dayCard} data-over={isOver || undefined}>
                    <div className={styles.dayCardHeader}>
                        <div className={styles.dayCardHeaderTitle}>
                            <div className={styles.dayCardIndex}>{index + 1}</div>
                            <h3>
                                {formattedDate}
                                <span className={styles.dayCardHeaderTitleSeparator}>·</span>
                                {day.title ?? 'Без названия'}
                            </h3>
                        </div>
                        <div className={styles.dayCardHeaderRight}>
                            <div className={styles.dayCardHeaderRightActions}>
                                /amount
                                <Button variant="primary" type='button' onClick={openModal}>+ Активность</Button>
                            </div>
                            <div className={styles.dayCardHeaderRightNote}>
                                ↓ Добавить активность в этот день
                            </div>
                        </div>
                    </div>
                    <div className={styles.dayCardActivities}>
                        <ActivityList activities={activities}></ActivityList>
                    </div>
                </div>
            )}
        </DayDropZone>
    );
}
