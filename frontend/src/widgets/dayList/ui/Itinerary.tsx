import { ActivityList, type Activity } from '@/entities/activity';
import type { Day } from '@/entities/day';

export function Itinerary({
    day,
    activities,
}: {
    day: Day;
    activities: Activity[];
}) {
    return (
        <div className="day-card" key={day.id}>
            <h3>{day.title ?? 'Без названия'}</h3>
            <p>{day.date}</p>
            <ActivityList activities={activities}></ActivityList>
        </div>
    );
}
