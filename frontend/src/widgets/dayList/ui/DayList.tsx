import type { Activity } from '@/entities/activity';
import { type Day } from '@/entities/day';
import { Itinerary } from './Itinerary';
import styles from './DayList.module.scss';

export function DayList({
    days,
    activities,
    openModal,
}: {
    days: Day[];
    activities: Activity[];
    openModal: (day: Day) => void;
}) {

    return (
        <div className={styles.dayList}>
            {days.map((day, index) => (
                <Itinerary key={day.id}
                    openModal={() => openModal(day)}
                    day={day}
                    index={index}
                    activities={activities.filter(
                        (activity) => activity.dayId === day.id,
                    )}
                />
            ))}
        </div>
    );
}
