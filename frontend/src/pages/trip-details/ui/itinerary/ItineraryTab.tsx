import { DayList } from '@/widgets/dayList';
import { NoDayCard } from '@/widgets/noDayCard';
import { useOutletContext } from 'react-router';
import type { TripDetailsContext } from '../../model/types';

export default function ItineraryTab() {
    const { trip, places } = useOutletContext<TripDetailsContext>();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                width: '100%',
            }}
        >
            <div style={{ width: '70%' }}>
                <DayList tripId={trip.id} activities={places} />
            </div>
            <div style={{ width: '30%' }}>
                <div
                    style={{
                        border: '1px solid #fff',
                        margin: '10px',
                        borderRadius: '10px',
                    }}
                >
                    {/*создать отдельный компонент для без дня*/}
                    <NoDayCard activities={places} />
                    <p>Перетащи в нужный день</p>
                </div>
                <div>сводка</div>
            </div>
        </div>
    );
}
