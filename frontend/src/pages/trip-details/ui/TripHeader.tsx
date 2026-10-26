import { Link } from 'react-router';
import styles from './TripHeader.module.scss';
import { Button } from '@/shared/ui/Button';
import type { Trip } from '@/entities/trip';

export default function TripHeader({ trip }: { trip: Trip }) {
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
                    <div>
                        <Link to="/trips">{'< Поездки'}</Link>
                    </div>
                    <h1 className={`heading ${styles.tripTitle}`}>
                        {trip?.title}
                    </h1>
                    <div>blabla</div>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <Button variant="secondary" onClick={() => {}} type="button">
                    <img src="/icons/shared/edit.svg" alt="edit" />
                    <span className={styles.btnText}>Изменить</span>
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {}}
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
                        onClick={() => {}}
                        type="button"
                    >
                        <span>Отменить поездку</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
