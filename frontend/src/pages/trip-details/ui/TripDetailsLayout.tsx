import { Outlet, useParams } from 'react-router';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import TripTabs from './TripTabs';
import TripHeader from './TripHeader';
import { TripsHeader } from '@/widgets/trips-header';
import { groupExpensesByCategory, sumExpense } from '@/entities/expense';
import { getBudgetState, tripQueries } from '@/entities/trip';
import { packingItemQueries } from '@/entities/packing-item';
import { activityQueries } from '@/entities/activity';
import { ApiError } from '@/shared/api';
import type { TripDetailsContext } from '../model/types';
import TripNotFound from './TripNotFound';
import { expensesQueries } from '@/entities/expense';

export default function TripDetailsLayout() {
    const { tripId = '' } = useParams();
    const tripQuery = useQuery(tripQueries.detail(tripId));
    const packingItemsQuery = useQuery(packingItemQueries.byTrip(tripId));
    const placesQuery = useQuery(activityQueries.byTrip(tripId));

    const expensesQuery = useQuery(expensesQueries.byTrip(tripId));

    const expensesByCategory = useMemo(
        () => groupExpensesByCategory(expensesQuery.data ?? [], tripQuery.data?.currency ?? 'RUB'),
        [expensesQuery.data, tripQuery.data?.currency],
    );

    if (tripQuery.error instanceof ApiError && tripQuery.error.status === 404)
        return <TripNotFound />;
    if (tripQuery.isError) return <div>Не удалось загрузить поездку</div>;
    if (
        tripQuery.isPending ||
        packingItemsQuery.isPending ||
        placesQuery.isPending ||
        expensesQuery.isPending
    )
        return <div>Загрузка...</div>;

    const trip = tripQuery.data;
    const packingItems = packingItemsQuery.data ?? [];
    const places = placesQuery.data ?? [];
    const expenses = expensesQuery.data ?? [];



    const spent = sumExpense(expenses);
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
                            expenses,
                            expensesByCategory,
                        } satisfies TripDetailsContext
                    }
                />
            </div>
        </div>
    );
}
