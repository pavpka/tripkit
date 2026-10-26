import styles from './StatusCard.module.scss';
import { StatusBar } from '@/shared/ui/StatusBar';
import {
    getStatusHint,
    getTripStatusMeta,
    type Trip,
} from '@/entities/trip';

export default function StatusCard({
    trip,
    bookedCount,
}: {
    trip: Trip;
    bookedCount: number;
}) {
    const tripStatusIndex = getTripStatusMeta(trip.status).index;
    const hint = getStatusHint(trip, bookedCount);

    return (
        <div className={styles.statusCard}>
            <div className={styles.statusCardHeader}>
                <div className={styles.statusCardTitle}>Статус</div>
                <span className={styles.statusCardHint}>{hint}</span>
            </div>
            <div
                style={{
                    opacity: tripStatusIndex === 0 ? 0.5 : 1,
                    cursor: tripStatusIndex === 0 ? 'not-allowed' : 'pointer',
                }}
            >
                <StatusBar step={tripStatusIndex} />
            </div>
        </div>
    );
}
