import { useParams } from 'react-router';
import styles from './PackingTab.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    groupByCategory,
    packingItemQueries,
    PackingList,
    PackingProgress,
    useUpdatePackingItem,
    type PackingCategory,
    type PackingItem,
} from '@/entities/packing-item';

import { ItemModal } from '@/widgets/modals/itemModal';
import { UndoSnackbar } from '@/shared/ui/UndoSnackbar';
import { useDeferredPackingDelete } from '@/features/delete-packing-item';

export default function Packing() {
    const { tripId = '' } = useParams();
    const packingItemsQuery = packingItemQueries.byTrip(tripId);
    const {
        data: items,
        isPending,
        isError,
    } = useQuery(packingItemsQuery);
    const updateItem = useUpdatePackingItem(tripId);
    const { pending, handleDelete, handleUndo } =
        useDeferredPackingDelete(tripId);

    const [modalCategory, setModalCategory] = useState<
        PackingCategory | null | undefined
    >(null);

    const handleToggle = (id: PackingItem['id'], packed: boolean) => {
        const item = items?.find((item) => item.id === id);
        if (item) updateItem.mutate({ ...item, packed });
    };

    if (isPending) return <div>Загрузка...</div>;
    if (isError) return <div>Не удалось загрузить вещи</div>;

    const visibleItems = pending
        ? items.filter((item) => item.id !== pending.id)
        : items;

    return (
        <div>
            <PackingProgress
                items={visibleItems}
                onAdd={() => setModalCategory(undefined)}
            />
            <div className={styles.masonryWrapper}>
                {groupByCategory(visibleItems).map((c) => (
                    <PackingList
                        key={c.category}
                        category={c.category}
                        items={c.items}
                        onToggle={handleToggle}
                        onAdd={setModalCategory}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            {modalCategory !== null && (
                <ItemModal
                    onClose={() => setModalCategory(null)}
                    category={modalCategory}
                />
            )}
            {pending && (
                <UndoSnackbar type="Вещь" label={pending.label} onUndo={handleUndo} />
            )}
        </div>
    );
}
