import { useQuery } from '@tanstack/react-query';
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
                    return <TripCard key={trip.id} trip={trip} />;
                })}
            </div>
        </div>
    );
}
