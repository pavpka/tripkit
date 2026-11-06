import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ItemModal.module.scss';
import { Button } from '@/shared/ui/Button';
import { QuantityInput } from '@/shared/ui/QuantityInput';
import { ChoiceChips } from '@/shared/ui/ChoiceChips';
import { CheckboxInput } from '@/shared/ui/CheckboxInput';
import { useParams } from 'react-router';
import {
    PACKING_CATEGORY_DETAILS,
    useCreatePackingItem,
    useUpdatePackingItem,
    type PackingCategory,
    type PackingItem,
} from '@/entities/packing-item';

type ItemModalProps = {
    onClose: () => void;
    category?: PackingCategory | null;
    item?: PackingItem;
    onDelete?: (item: PackingItem) => void;
}

export function ItemModal({
    onClose,
    category,
    item,
    onDelete,
}: ItemModalProps) {
    const isEdit = Boolean(item);
    const [value, setValue] = useState(item?.label ?? '');
    const [quantity, setQuantity] = useState(item?.qty ?? 1);
    const [selectedCategory, setSelectedCategory] =
        useState<PackingCategory | null>(item?.category ?? category ?? null);
    const [packed, setPacked] = useState(item?.packed ?? false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { tripId = '' } = useParams();
    const createItem = useCreatePackingItem(tripId);
    const updateItem = useUpdatePackingItem(tripId);

    const isPending = createItem.isPending || updateItem.isPending;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            )
                onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCategory) {
            alert('Please select a category');
            return;
        }
        const payload = { label: value, qty: quantity, category: selectedCategory, packed };
        if (item) {
            updateItem.mutate({ ...item, ...payload }, { onSuccess: onClose });
            return
        }
        createItem.mutate(payload, { onSuccess: onClose });
    };

    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContainer} ref={modalRef}>
                    <form onSubmit={onSubmit}>
                        {/* Header */}
                        <div className={styles.modalHeader}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: '#FFE6D5',
                                        borderRadius: '15px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src="/icons/packing-items/other.png"
                                        alt="add-item-icon"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className={styles.modalTitle}>
                                        {isEdit ? 'Изменить вещь' : 'Новая вещь'}
                                    </h3>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#7E756C',
                                            fontWeight: '400',
                                            lineHeight: '1.5',
                                        }}
                                    >
                                        blabla
                                    </div>
                                </div>
                            </div>
                            <button
                                className={styles.modalClose}
                                onClick={onClose}
                            >
                                <img
                                    src="/icons/shared/close.svg"
                                    alt="close"
                                />
                            </button>
                        </div>

                        {/* Body */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <div style={{ width: '75%' }}>
                                <label
                                    htmlFor="name"
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        display: 'block',
                                    }}
                                >
                                    Название
                                </label>
                                <input
                                    aria-required="true"
                                    type="text"
                                    id="name"
                                    required
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className={styles.itemModalInput}
                                    placeholder="Например, дождевик"
                                />
                            </div>

                            <div style={{ width: '23%' }}>
                                <span
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        display: 'block',
                                    }}
                                >
                                    Количество
                                </span>
                                <QuantityInput
                                    count={quantity}
                                    onChange={setQuantity}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <ChoiceChips
                                categories={PACKING_CATEGORY_DETAILS}
                                selectedCategory={selectedCategory}
                                onChange={(category) =>
                                    setSelectedCategory(
                                        category as PackingCategory,
                                    )
                                }
                            />
                        </div>

                        <div className={styles.packedContainer}>
                            <CheckboxInput
                                id={item ? `edit-packed-${item.id}` : 'add-packed-item'}
                                checked={packed}
                                onChange={setPacked}
                            />
                            <div>
                                <div>Уже собрано</div>
                                <div className={styles.packedItemClue}>
                                    Вещь сразу попадет в «собрано»
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className={styles.modalFooter}>
                            {item && onDelete && (
                                <Button type="button" variant="secondary" onClick={() => onDelete(item)}>
                                    <img
                                        src="/icons/shared/trash.svg"
                                        alt="delete"
                                        className={styles.modalFooterDeleteIcon}
                                    />
                                    <span className={styles.modalFooterDeleteText}>Удалить</span>
                                </Button>
                            )}
                            <div className={styles.modalFooterActions}>
                                <Button
                                    onClick={onClose}
                                    type="button"
                                    variant="secondary"
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isPending}
                                >
                                    {isEdit ? 'Сохранить' : (
                                        <>
                                            < img
                                                src="/icons/shared/plus.svg"
                                                alt="add"
                                                className="plus-icon"
                                            />
                                            Добавить
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body,
    );
}
