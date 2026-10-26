import { TabButton } from '@/shared/ui/TabButton';
import styles from './TripTabs.module.scss';

export default function TripTabs({
    percent,
    totalItems,
    packedItems,
}: {
    percent: number;
    totalItems: number;
    packedItems: number;
}) {
    return (
        <nav className={styles.tabs}>
            <TabButton to="overview" icon="/icons/bar/alert.svg">
                Обзор
            </TabButton>
            <TabButton to="itinerary" icon="/icons/bar/compass.svg">
                Маршрут
            </TabButton>
            <TabButton
                to="budget"
                icon="/icons/bar/wallet.svg"
                badge={percent > 0 ? `${percent}%` : '—'}
            >
                Бюджет
            </TabButton>
            <TabButton
                to="packing"
                icon="/icons/bar/backpack.svg"
                badge={totalItems > 0 ? `${packedItems}/${totalItems}` : '—'}
            >
                Сборы
            </TabButton>
        </nav>
    );
}
