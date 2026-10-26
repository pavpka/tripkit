import styles from './AboutTripCard.module.scss';
import type { Trip } from '@/entities/trip';

export default function AboutTripCard({ trip }: { trip: Trip }) {
    return (
        <div className={styles.aboutTripCard}>
            <div className={styles.aboutTripCardTitle}>О поездке</div>
            <table className={styles.aboutTripCardTable}>
                <tbody>
                    <tr>
                        <td>Направления</td>
                        <td>ввв</td>
                    </tr>
                    <tr>
                        <td>Даты</td>
                        <td>ввв</td>
                    </tr>
                    <tr>
                        <td>Участники</td>
                        <td>Х человек</td>
                    </tr>
                    <tr>
                        <td>Валюта</td>
                        <td>в</td>
                    </tr>
                    <tr>
                        <td>Бюджет</td>
                        <td>ввв</td>
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
