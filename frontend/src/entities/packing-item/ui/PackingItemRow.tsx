import { CheckboxInput } from '@/shared/ui/CheckboxInput';
import type { PackingItem } from '../model';
import styles from './PackingItemRow.module.scss';

type Props = {
    item: PackingItem;
    onToggle: (id: PackingItem['id'], packed: boolean) => void;
    onDelete: (item: PackingItem) => void;
};

export function PackingItemRow({ item, onToggle, onDelete }: Props) {
    const onEdit = () => {
        console.log('edit');
    };
    return (
        <li>
            <div className={styles.itemContent}>
                <CheckboxInput
                    checked={item.packed}
                    id={`${item.category}-${item.id}`}
                    onChange={(packed) => {
                        onToggle(item.id, packed);
                    }}
                >
                    <span>{item.label}</span>
                </CheckboxInput>
                <div className={styles.buttonsContainer}>
                    <button className={styles.button} onClick={onEdit}>
                        <img src="/icons/shared/edit.svg" alt="edit" className={styles.icon} />
                    </button>
                    <button className={styles.button} onClick={() => onDelete(item)}>
                        <img src="/icons/shared/close.svg" alt="delete" className={styles.icon} />
                    </button>
                </div>
                {item.qty > 1 && (
                    <span className={styles.itemQty}> {`x${item.qty}`}</span>
                )}
            </div>
        </li>
    );
}
