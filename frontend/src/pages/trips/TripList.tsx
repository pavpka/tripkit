import { useQuery } from '@tanstack/react-query';
import { expenses } from '@/mocks/data';
import { sumExpense } from '@/entities/expense';
import { tripQueries } from '@/entities/trip';
import TripCard from './TripCard';

export default function TripList() {
    const { data: trips, isPending, isError } = useQuery(tripQueries.list());

    if (isPending) return <div>Загрузка...</div>;
    if (isError) return <div>Не удалось загрузить поездки</div>;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                margin: '20px 0',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 356px)',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}
            >
                {trips.map((trip) => {
                    const spent = sumExpense(
                        expenses.filter((e) => e.tripId === trip.id),
                    );
                    return <TripCard key={trip.id} trip={trip} spent={spent} />;
                })}
            </div>
        </div>
    );
}
