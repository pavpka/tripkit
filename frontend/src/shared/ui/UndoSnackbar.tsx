import { Button } from '@/shared/ui/Button';
import styles from './UndoSnackbar.module.scss';

export function UndoSnackbar({
    type,
    label,
    onUndo,
}: {
    type: string;
    label: string;
    onUndo: () => void;
}) {
    return (
        <div className={styles.undoBar} role="status">
            <span>{type} «{label}» удалена</span>
            <Button type="button" variant="primary" onClick={onUndo}>
                <img src="/icons/shared/undo.svg" alt="undo" className={styles.icon} />
                Отменить
            </Button>
        </div>
    );
}
