import { apiClient, type RequestOptions } from '@/shared/api';
import type { TripId } from '@/shared/types';
import type { Activity, ActivityInput } from '../model/types';

const basePath = (tripId: TripId) => `/trips/${tripId}/activities`;

export const activityApi = {
    getAllByTripId: (tripId: TripId, options?: RequestOptions) =>
        apiClient.get<Activity[]>(basePath(tripId), options),
    create: (tripId: TripId, activity: ActivityInput) =>
        apiClient.post<string>(basePath(tripId), activity),
};
