import { Button } from '@/shared/ui/Button';
import styles from './TripsHeader.module.scss';
import SearchInput from '@/shared/ui/SearchInput';

export function TripsHeader({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
            }}
        >
            <div>{children}</div>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '46px',
                }}
            >
                <div>
                    <SearchInput placeholder="Поиск по названию или городу" />
                </div>

                <Button type="button" variant="secondary" onClick={() => {}}>
                    <img
                        src="/icons/shared/filter.svg"
                        alt="filter"
                        className={styles.btnIcon}
                    />
                    <span className={styles.btnText}>Фильтр</span>
                </Button>
                <Button type="button" variant="primary" onClick={() => {}}>
                    <img
                        src="/icons/shared/plus.svg"
                        alt="plus"
                        className={styles.btnIcon}
                    />
                    <span>Новая поездка</span>
                </Button>
            </div>
        </div>
    );
}
