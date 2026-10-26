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

export default function Packing() {
    const { tripId = '' } = useParams();
    const {
        data: items,
        isPending,
        isError,
    } = useQuery(packingItemQueries.byTrip(tripId));
    const updateItem = useUpdatePackingItem(tripId);

    const [modalCategory, setModalCategory] = useState<
        PackingCategory | null | undefined
    >(null);
    const openAddItemModal = (category?: PackingCategory) => {
        setModalCategory(category);
    };
    const closeModal = () => setModalCategory(null);

    const handleToggle = (id: PackingItem['id'], packed: boolean) => {
        const item = items?.find((item) => item.id === id);
        if (item) updateItem.mutate({ ...item, packed });
    };

    if (isPending) return <div>Загрузка...</div>;
    if (isError) return <div>Не удалось загрузить вещи</div>;

    return (
        <div>
            <PackingProgress items={items} onAdd={() => openAddItemModal()} />
            <div className={styles.masonryWrapper}>
                {groupByCategory(items).map((c) => (
                    <PackingList
                        key={c.category}
                        category={c.category}
                        items={c.items}
                        onToggle={handleToggle}
                        onAdd={openAddItemModal}
                    />
                ))}
            </div>
            {modalCategory !== null && (
                <ItemModal onClose={closeModal} category={modalCategory} />
            )}
        </div>
    );
}
