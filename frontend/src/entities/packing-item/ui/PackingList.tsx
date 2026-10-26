import { PackingItemRow } from './PackingItemRow';
import styles from './PackingList.module.scss';
import {
    PACKING_CATEGORY_DETAILS,
    sortedByPacked,
    type PackingCategory,
    type PackingItem,
} from '../model';
import { Button } from '@/shared/ui/Button';

export function PackingList({
    category,
    items,
    onToggle,
    onAdd,
}: {
    category: PackingCategory;
    items: PackingItem[];
    onToggle: (id: PackingItem['id'], packed: boolean) => void;
    onAdd: (category: PackingCategory) => void;
}) {
    const sortedItems = sortedByPacked(items);
    const packedItems = sortedItems.filter((item) => item.packed);

    return (
        <div className={styles.itemCard}>
            <div className={styles.categoryHeader}>
                <div className={styles.categoryHeaderContent}>
                    <div className={styles.categoryIcon}>
                        <img
                            src={`/icons/packing-items/${PACKING_CATEGORY_DETAILS[category].icon}`}
                            alt={category}
                            className={styles.categoryIconImage}
                        />
                    </div>
                    <h2 className={styles.categoryLabel}>
                        {PACKING_CATEGORY_DETAILS[category].label}
                    </h2>
                </div>
                <div className={styles.categoryProgress}>
                    <span>
                        {packedItems.length}/{sortedItems.length}
                    </span>
                </div>
            </div>
            <ul>
                {sortedItems.map((item) => (
                    <PackingItemRow
                        key={item.id}
                        item={item}
                        onToggle={onToggle}
                    />
                ))}
            </ul>
            <Button
                onClick={() => onAdd(category)}
                type="button"
                variant="secondary"
            >
                <img
                    src="/icons/shared/plus.svg"
                    alt="Добавить"
                    className={styles.plusIcon}
                />
                Добавить
            </Button>
        </div>
    );
}
