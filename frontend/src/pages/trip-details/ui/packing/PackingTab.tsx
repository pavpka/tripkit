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

type ItemModalState =
    | { type: 'create'; category?: PackingCategory }
    | { type: 'edit'; item: PackingItem };

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

    const [modal, setModal] = useState<
        ItemModalState | null
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
                onAdd={() => setModal({ type: 'create' })}
            />
            <div className={styles.masonryWrapper}>
                {groupByCategory(visibleItems).map((c) => (
                    <PackingList
                        key={c.category}
                        category={c.category}
                        items={c.items}
                        onToggle={handleToggle}
                        onAdd={(category) => setModal({ type: 'create', category })}
                        onDelete={handleDelete}
                        onEdit={(item) => setModal({ type: 'edit', item })}
                    />
                ))}
            </div>
            {modal !== null && (
                <ItemModal
                    key={modal.type === 'edit' ? modal.item.id : 'new'}
                    onClose={() => setModal(null)}
                    category={modal.type === 'create' ? modal.category : undefined}
                    item={modal.type === 'edit' ? modal.item : undefined}
                    onDelete={(item) => {
                        handleDelete(item);
                        setModal(null);
                    }}
                />
            )}
            {pending && (
                <UndoSnackbar type="Вещь" label={pending.label} onUndo={handleUndo} />
            )}
        </div>
    );
}
