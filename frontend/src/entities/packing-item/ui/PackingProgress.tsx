import styles from './PackingProgress.module.scss';
import type { PackingItem } from '../model';
import { Button } from '@/shared/ui/Button';

export function PackingProgress({
    items,
    onAdd,
}: {
    items: PackingItem[];
    onAdd: () => void;
}) {
    const packedItems = items.filter((item) => item.packed).length;

    const progress = items.length > 0 ? (packedItems / items.length) * 100 : 0;
    return (
        <div>
            <div className={styles.progressContainer}>
                <div className={styles.progressStatus}>
                    <div
                        className={styles.progressDonut}
                        style={
                            {
                                '--progress': `${progress}%`,
                            } as React.CSSProperties &
                                Record<'--progress', string>
                        }
                        role="progressbar"
                        aria-valuenow={packedItems}
                        aria-valuemin={0}
                        aria-valuemax={items.length}
                        aria-label="Собрано вещей"
                    >
                        <span className={styles.progressText}>
                            {packedItems}/{items.length}
                        </span>
                    </div>
                    <div>
                        <span>
                            Собрано {packedItems} из {items.length}
                        </span>
                    </div>
                </div>
                <div style={{ height: '36px' }}>
                    <Button type="button" onClick={onAdd}>
                        <img
                            src="/icons/shared/plus.svg"
                            alt="add"
                            className="plus-icon"
                        />
                        Вещь
                    </Button>
                </div>
            </div>
        </div>
    );
}
