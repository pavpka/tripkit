import { Outlet, useParams } from 'react-router';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import TripTabs from './TripTabs';
import TripHeader from './TripHeader';
import { TripsHeader } from '@/widgets/trips-header';
import { groupExpensesByCategory, sumExpense } from '@/entities/expense';
import { expenses } from '@/mocks/data';
import { getBudgetState, tripQueries } from '@/entities/trip';
import { packingItemQueries } from '@/entities/packing-item';
import { activityQueries } from '@/entities/activity';
import { ApiError } from '@/shared/api';
import type { TripDetailsContext } from '../model/types';
import TripNotFound from './TripNotFound';

export default function TripDetailsLayout() {
    const { tripId = '' } = useParams();
    const tripQuery = useQuery(tripQueries.detail(tripId));
    const packingItemsQuery = useQuery(packingItemQueries.byTrip(tripId));
    const placesQuery = useQuery(activityQueries.byTrip(tripId));

    const tripExpenses = useMemo(
        () => expenses.filter((e) => e.tripId === tripId),
        [tripId],
    );
    const expensesByCategory = useMemo(
        () => groupExpensesByCategory(tripExpenses),
        [tripExpenses],
    );

    if (tripQuery.error instanceof ApiError && tripQuery.error.status === 404)
        return <TripNotFound />;
    if (tripQuery.isError) return <div>Не удалось загрузить поездку</div>;
    if (
        tripQuery.isPending ||
        packingItemsQuery.isPending ||
        placesQuery.isPending
    )
        return <div>Загрузка...</div>;

    const trip = tripQuery.data;
    const packingItems = packingItemsQuery.data ?? [];
    const places = placesQuery.data ?? [];

    const spent = sumExpense(tripExpenses);
    const { status, percent, remaining } = getBudgetState(
        spent,
        trip.budgetTotal,
    );
    const packedItems = packingItems.filter((item) => item.packed).length;
    const totalItems = packingItems.length;

    return (
        <div className="trip-detail-layout">
            {/*<Link to="/trips" style={{ marginBottom: '20px', display: 'block' }}>← Back to Trips</Link> */}
            <TripsHeader> </TripsHeader>
            <TripHeader trip={trip} />
            <TripTabs
                percent={percent}
                totalItems={totalItems}
                packedItems={packedItems}
            />

            <div className="tab-content">
                <Outlet
                    context={
                        {
                            status,
                            percent,
                            remaining,
                            totalItems,
                            packedItems,
                            trip,
                            spent,
                            places,
                            tripExpenses,
                            expensesByCategory,
                        } satisfies TripDetailsContext
                    }
                />
            </div>
        </div>
    );
}
