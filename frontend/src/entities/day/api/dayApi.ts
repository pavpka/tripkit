import { apiClient, type RequestOptions } from '@/shared/api';
import type { TripId } from '@/shared/types';
import type { Day } from '../model/types';

export const dayApi = {
    getAllByTripId: (tripId: TripId, options?: RequestOptions) =>
        apiClient.get<Day[]>(`/trips/${tripId}/days`, options),
};
