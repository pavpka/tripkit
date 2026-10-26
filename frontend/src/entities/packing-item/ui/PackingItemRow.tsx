import { CheckboxInput } from '@/shared/ui/CheckboxInput';
import type { PackingItem } from '../model';
import styles from './PackingItemRow.module.scss';

type Props = {
    item: PackingItem;
    onToggle: (id: PackingItem['id'], packed: boolean) => void;
};

export function PackingItemRow({ item, onToggle }: Props) {
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
                {item.qty > 1 && (
                    <span className={styles.itemQty}> {`x${item.qty}`}</span>
                )}
            </div>
        </li>
    );
}
