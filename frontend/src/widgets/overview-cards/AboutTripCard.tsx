import styles from './AboutTripCard.module.scss';
import type { Trip } from '@/entities/trip';
import { formatDateRange } from '@/shared/lib/dates';
import { getTripDaysCount } from '@/entities/trip';
import { Badge } from '@/shared/ui/Badge';

export default function AboutTripCard({ trip }: { trip: Trip }) {
    return (
        <div className={styles.aboutTripCard}>
            <div className={styles.aboutTripCardTitle}>О поездке</div>
            <table className={styles.aboutTripCardTable}>
                <tbody>
                    <tr>
                        <td>Направления</td>
                        <td>
                            <div className={styles.destinationsBadges}>
                                {trip.destinations.map((place, index) =>
                                    <Badge key={index} color={{
                                        badgeColor: '#f4efe9'
                                    }}>
                                        {place}
                                    </Badge>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Даты</td>
                        <td>{formatDateRange(trip.startDate, trip.endDate, 'long')} {trip.startDate && trip.endDate && ` · ${getTripDaysCount(trip)} дней`}</td>
                    </tr>
                    <tr>
                        <td>Участники</td>
                        <td>{trip.travelersCount} человек</td>
                    </tr>
                    <tr>
                        <td>Валюта</td>
                        <td>{trip.currency}</td>
                    </tr>
                    <tr>
                        <td>Бюджет</td>
                        <td>{trip.budgetTotal
                            ? `${trip.budgetTotal} ${trip.currency} · ${trip.budgetTotal / trip.travelersCount} ${trip.currency} на человека`
                            : '—'} </td>
                    </tr>
                    <tr>
                        <td>Заметка</td>
                        <td>{trip.coverNote ?? '—'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
