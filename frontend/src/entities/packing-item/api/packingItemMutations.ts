import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import type { PackingItem, PackingItemInput } from '../model/types';
import { packingItemApi } from './packingItemApi';
import { packingItemQueries } from './packingItemQueries';

export function useCreatePackingItem(tripId: TripId) {
    const queryClient = useQueryClient();
    const { queryKey } = packingItemQueries.byTrip(tripId);

    return useMutation({
        mutationFn: (item: PackingItemInput) =>
            packingItemApi.create(tripId, item),
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
    });
}

export function useUpdatePackingItem(tripId: TripId) {
    const queryClient = useQueryClient();
    const { queryKey } = packingItemQueries.byTrip(tripId);

    return useMutation({
        mutationFn: ({ id, label, qty, packed, category }: PackingItem) =>
            packingItemApi.update(tripId, id, { label, qty, packed, category }),
        onMutate: async (updated) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (items) =>
                items?.map((item) => (item.id === updated.id ? updated : item)),
            );
            return { previous };
        },
        onError: (_error, _updated, context) => {
            // previous === undefined → кэша не было, оптимистичное обновление тоже ничего не записало
            if (context?.previous)
                queryClient.setQueryData(queryKey, context.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
    });
}
