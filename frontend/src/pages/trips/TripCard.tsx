import { Link } from 'react-router';
import styles from './TripCard.module.scss';
import { Badge } from '@/shared/ui/Badge';
import {
    BUDGET_STATUS_COLORS,
    COLORS,
    getBudgetState,
    getTripStatusMeta,
    type Trip,
} from '@/entities/trip';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { formatDateRange } from '@/shared/lib/dates';

export default function TripCard({
    trip,
    spent,
}: {
    trip: Trip;
    spent: number;
}) {
    const { status, percent } = getBudgetState(spent, trip.budgetTotal);
    const statusMeta = getTripStatusMeta(trip.status);
    const statusColors = COLORS[statusMeta.color];
    const { packingItemsCount, packedItemsCount = 0 } = trip;

    return (
        <Link
            to={`/trips/${trip.id}`}
            className={styles.tripItem}
            key={trip.id}
        >
            <div className={styles.tripItemHeader}>
                <div
                    className={styles.tripItemEmoji}
                    style={{ backgroundColor: trip.titleColor }}
                >
                    {trip.emoji}
                </div>
                <Badge color={statusColors}>
                    <span
                        className={styles.tripItemStatusBadge}
                        style={{ color: statusColors.color }}
                    >
                        •
                    </span>
                    {statusMeta.label}
                </Badge>
            </div>

            <h3 className={styles.tripItemTitle}>{trip.title}</h3>

            <div className={styles.tripItemDetails}>
                <div>
                    <img src="/icons/shared/map-pin.svg" alt="map-pin" />
                    {trip.destinations.join(', ')}
                </div>
                <div>
                    <img src="/icons/shared/calendar.svg" alt="calendar" />
                    {formatDateRange(trip.startDate, trip.endDate)}
                </div>
                <div style={{ width: '100%', height: '8px' }}>
                    <ProgressBar progress={percent} tone={status} />
                </div>
                <div className={styles.tripItemProgressDetails}>
                    <div>
                        Бюджет:{' '}
                        <span style={{ color: BUDGET_STATUS_COLORS[status] }}>
                            {status === 'unset' ? '—' : `${percent}%`}
                        </span>
                    </div>
                    <div>
                        Собрано:{' '}
                        {packingItemsCount
                            ? `${packedItemsCount}/${packingItemsCount}`
                            : '—'}
                    </div>
                </div>
            </div>
        </Link>
    );
}
