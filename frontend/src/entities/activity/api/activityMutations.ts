import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import type { ActivityInput } from '../model/types';
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