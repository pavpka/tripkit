import { getTripDaysCount } from '@/entities/trip';
import styles from './OverviewTab.module.scss';
import {
    AboutTripCard,
    BudgetCard,
    InfoCard,
    NeedToBookCard,
    StatusCard,
} from '@/widgets/overview-cards';
import type { TripDetailsContext } from '../../model/types';
import { useOutletContext } from 'react-router';

export default function Overview() {
    const {
        trip,
        totalItems,
        packedItems,
        places,
        percent,
        remaining,
        spent,
        status,
    } = useOutletContext<TripDetailsContext>();
    const notBooked = places.filter((a) => a.bookingStatus !== 'booked');
    const bookedCount = places.length - notBooked.length;
    const info = [
        {
            title: 'Дней',
            icon: '📅',
            value: getTripDaysCount(trip).toString(),
        },
        {
            title: 'Мест',
            icon: '📍',
            value: places.length.toString(),
        },
        {
            title: 'Ждут брони',
            icon: '📝',
            value: notBooked.length.toString(),
        },
        {
            title: 'Собрано',
            icon: '🎒',
            value: `${packedItems}/${totalItems}`,
        },
    ];

    return (
        <div className={styles.overview}>
            <div className={styles.overviewLeft}>
                <AboutTripCard trip={trip} />
                <StatusCard trip={trip} bookedCount={bookedCount} />
            </div>
            <div className={styles.overviewRight}>
                <div className={styles.overviewCards}>
                    {info.map((item) => (
                        <div
                            className={styles.overviewCardsItem}
                            key={item.title}
                        >
                            <InfoCard
                                title={item.title}
                                icon={item.icon}
                                value={item.value}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.overviewBudget}>
                    <BudgetCard
                        status={status}
                        percent={percent}
                        remaining={remaining}
                        spent={spent}
                        total={trip.budgetTotal}
                        currency={trip.currency}
                    />
                </div>
                <div className={styles.overviewNeedToBook}>
                    <NeedToBookCard notBooked={notBooked} />
                </div>
            </div>
        </div>
    );
}
