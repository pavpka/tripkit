import { Link } from 'react-router';
import styles from './TripHeader.module.scss';
import { Button } from '@/shared/ui/Button';
import { COLORS, getTripDaysCount, getTripStatusMeta, type Trip } from '@/entities/trip';
import { Badge } from '@/shared/ui/Badge';
import { formatDateRange } from '@/shared/lib/dates';

export default function TripHeader({ trip }: { trip: Trip }) {

    const statusMeta = getTripStatusMeta(trip.status);
    const statusColors = COLORS[statusMeta.color];
    return (
        <div className={styles.tripHeader}>
            <div className={styles.tripHeaderLeft}>
                <div
                    className={styles.icon}
                    style={{ backgroundColor: trip?.titleColor }}
                >
                    {trip?.emoji}
                </div>
                <div>
                    <div className={styles.tripHeaderBackLink}>
                        <Link to="/trips">
                            <img src="/icons/shared/chevron-left.svg" alt="chevron-left" className={styles.chevronLeftIcon} />
                            Поездки</Link>
                    </div>
                    <h1 className={`heading ${styles.tripTitle}`}>
                        {trip?.title}
                    </h1>
                    <div className={styles.tripHeaderInfo}>
                        <div>📅 {formatDateRange(trip.startDate, trip.endDate)} · {getTripDaysCount(trip)} дней</div>
                        <div>📍 {trip.destinations.join(', ')}</div>
                        <div>👥 {trip.travelersCount}</div>
                        <Badge color={statusColors}>
                            <div className={styles.tripItemStatusBadge}>
                                <div
                                    className={styles.tripItemStatusBadgeDot}
                                    style={{ backgroundColor: statusColors.color }}
                                />
                                <span className={styles.tripItemStatusBadgeLabel}>{statusMeta.label}</span>
                            </div>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <Button variant="secondary" onClick={() => { }} type="button">
                    <img src="/icons/shared/edit.svg" alt="edit" />
                    <span className={styles.btnText}>Изменить</span>
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => { }}
                    type="button"
                    disabled={true}
                >
                    <img
                        src="/icons/shared/arrow-right.svg"
                        alt="arrow-right"
                    />
                    <span>В путь</span>
                </Button>
                <div className={styles.btnCancel}>
                    <Button
                        variant="secondary"
                        onClick={() => { }}
                        type="button"
                    >
                        <span>Отменить поездку</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
