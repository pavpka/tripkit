import { DayList } from '@/widgets/dayList';
import { NoDayCard, NoDayCardActivity } from '@/widgets/noDayCard';
import { useOutletContext } from 'react-router';
import type { TripDetailsContext } from '../../model/types';
import { ActivityModal } from '@/widgets/modals/activityModal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dayQueries, type Day } from '@/entities/day';
import styles from './ItineraryTab.module.scss';
import { AssignActivityDndProvider } from '@/features/activity-dnd';
import { SummaryCard } from '@/widgets/summary-card';
import { getCurrencySymbol } from '@/shared/lib/money';

export default function ItineraryTab() {

    const { trip, places } = useOutletContext<TripDetailsContext>();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);

    const {
        data: days,
        isPending,
        isError,
    } = useQuery(dayQueries.byTrip(trip.id));

    if (isPending) return <div>Загрузка...</div>;
    if (isError) return <div>Не удалось загрузить дни</div>;

    const openModal = (day: Day | null) => {
        setModalIsOpen(true);
        setSelectedDay(day);
    };
    const closeModal = () => setModalIsOpen(false);

    let maxOrder = -1;
    let waitingBookingCount = 0;
    let plannedAmount = 0;
    places.forEach(activity => {
        if (activity.bookingStatus === 'todo') {
            waitingBookingCount++;
        }
        plannedAmount += activity.costEstimate ?? 0;

        if (activity.order > maxOrder) {
            maxOrder = activity.order;
        }
    });
    const newOrder = maxOrder + 1;

    return (
        <div className={styles.itineraryTab}>
            <AssignActivityDndProvider tripId={trip.id} renderDragOverlay={(activity) => <NoDayCardActivity activity={activity} withGrip={false} />}>
                <DayList days={days} activities={places} openModal={openModal} />
                <div className={styles.itineraryTabRight}>
                    <NoDayCard activities={places} openModal={() => openModal(null)} />
                    <SummaryCard activitiesCount={places.length} daysCount={days.length} waitingBookingCount={waitingBookingCount} plannedAmount={plannedAmount + getCurrencySymbol(trip.currency)} />
                </div>
            </AssignActivityDndProvider>
            {modalIsOpen && (
                <ActivityModal onClose={closeModal} thisDay={selectedDay} order={newOrder} />
            )}
        </div>
    );
}
