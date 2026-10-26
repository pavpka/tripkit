import { apiClient, type RequestOptions } from '@/shared/api';
import type { TripId } from '@/shared/types';
import type { Activity } from '../model/types';

export const activityApi = {
    getAllByTripId: (tripId: TripId, options?: RequestOptions) =>
        apiClient.get<Activity[]>(`/trips/${tripId}/activities`, options),
};
