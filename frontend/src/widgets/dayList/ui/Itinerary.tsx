import { ActivityList, type Activity } from '@/entities/activity';
import type { Day } from '@/entities/day';
import { Button } from '@/shared/ui/Button';
import { ActivityModal } from '@/widgets/modals/activityModal';
import { useState } from 'react';
import { formatDayDate } from '@/shared/lib/dates';

export function Itinerary({
    day,
    index,
    activities,
}: {
    day: Day;
    index: number;
    activities: Activity[];
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const formattedDate = formatDayDate(day.date);
    let maxOrder = -1;
    activities.forEach(activity => {
        if (activity.order > maxOrder) {
            maxOrder = activity.order;
        }
    });
    const newOrder = maxOrder + 1;

    return (
        <div>
            <div className="day-card" key={day.id}>
                <h3>{index + 1} {formattedDate} <span>•</span> {day.title ?? 'Без названия'}</h3>
                <ActivityList activities={activities}></ActivityList>
                <Button variant="primary" type='button' onClick={openModal}>+ Активность</Button>
            </div>
            {modalIsOpen && (
                <ActivityModal onClose={closeModal} thisDay={day} order={newOrder} />
            )}
        </div>
    );
}
