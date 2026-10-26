import { apiClient, type RequestOptions } from '@/shared/api';
import type { TripId } from '@/shared/types';
import type { Trip } from '../model/types';
import { mapTripDto, type TripDto } from './dto';

export const tripApi = {
    getAll: async (options?: RequestOptions): Promise<Trip[]> => {
        const trips = await apiClient.get<TripDto[]>('/trips', options);
        return trips.map(mapTripDto);
    },
    getById: async (id: TripId, options?: RequestOptions): Promise<Trip> => {
        const trip = await apiClient.get<TripDto>(`/trips/${id}`, options);
        return mapTripDto(trip);
    },
};
