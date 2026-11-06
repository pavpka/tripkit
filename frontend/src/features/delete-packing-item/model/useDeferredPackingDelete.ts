import type { TripId } from '@/shared/types';
import { useDeferredDelete } from '@/shared/lib/deferred-delete';
import {
    packingItemApi,
    packingItemQueries,
    useDeletePackingItem,
    type PackingItem,
} from '@/entities/packing-item';

export function useDeferredPackingDelete(tripId: TripId) {
    const { queryKey } = packingItemQueries.byTrip(tripId);
    const deleteItem = useDeletePackingItem(tripId);

    return useDeferredDelete<PackingItem>({
        queryKey,
        commit: (item) => deleteItem.mutate(item.id),
        commitOnLeave: (item) => {
            void packingItemApi.delete(item.tripId, item.id);
        },
    });
}
