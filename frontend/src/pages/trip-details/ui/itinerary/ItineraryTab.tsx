import { DayList } from '@/widgets/dayList';
import { NoDayCard } from '@/widgets/noDayCard';
import { useOutletContext } from 'react-router';
import type { TripDetailsContext } from '../../model/types';
import { ActivityModal } from '@/widgets/modals/activityModal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dayQueries, type Day } from '@/entities/day';
import styles from './ItineraryTab.module.scss';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SummaryCard } from '@/widgets/summary-card';

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
    places.forEach(activity => {
        if (activity.order > maxOrder) {
            maxOrder = activity.order;
        }
    });
    const newOrder = maxOrder + 1;
    const handleDragEnd = (event: DragEndEvent) => {
        console.log(event);
    };
    return (
        <div className={styles.itineraryTab}>
            <DndContext onDragEnd={handleDragEnd}>
                <DayList days={days} activities={places} openModal={openModal} />
                <div className={styles.itineraryTabRight}>
                    <NoDayCard activities={places} openModal={() => openModal(null)} />
                    <SummaryCard />
                </div>
            </DndContext>
            {modalIsOpen && (
                <ActivityModal onClose={closeModal} thisDay={selectedDay} order={newOrder} />
            )}
        </div>
    );
}
