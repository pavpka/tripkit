import { useQuery } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import type { Activity } from '@/entities/activity';
import { dayQueries } from '@/entities/day';
import { Itinerary } from './Itinerary';

export function DayList({
    tripId,
    activities,
}: {
    tripId: TripId;
    activities: Activity[];
}) {
    const {
        data: days,
        isPending,
        isError,
    } = useQuery(dayQueries.byTrip(tripId));

    if (isPending) return <div>Загрузка...</div>;
    if (isError) return <div>Не удалось загрузить дни</div>;

    return (
        <div className="day-list">
            {days.map((day) => (
                <div className="day-card" key={day.id}>
                    <Itinerary
                        day={day}
                        activities={activities.filter(
                            (activity) => activity.dayId === day.id,
                        )}
                    />
                </div>
            ))}
        </div>
    );
}
