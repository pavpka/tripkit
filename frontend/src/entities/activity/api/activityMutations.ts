import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ActivityId, TripId } from '@/shared/types';
import type { Activity, ActivityInput } from '../model/types';
import { activityApi } from './activityApi';
import { activityQueries } from './activityQueries';

export function useCreateActivity(tripId: TripId) {
    const queryClient = useQueryClient();
    const { queryKey } = activityQueries.byTrip(tripId);

    return useMutation({
        mutationFn: (activity: ActivityInput) =>
            activityApi.create(tripId, activity),
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
    });
}

export function useUpdateActivity(tripId: TripId) {
    const queryClient = useQueryClient();
    const { queryKey } = activityQueries.byTrip(tripId);

    return useMutation({
        mutationFn: ({id, tripId: _, ...input}: Activity) =>
            activityApi.update(tripId, id, input),
        onMutate: async (updated) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (activities) =>
                activities?.map((activity) => (activity.id === updated.id ? updated : activity)),
            );
            return { previous };
        },
        onError: (_error, _updated, context) => {
            if (context?.previous)
                queryClient.setQueryData(queryKey, context.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
    });
}