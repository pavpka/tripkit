import { apiClient, type RequestOptions } from '@/shared/api';
import type { ExpenseId, TripId } from '@/shared/types';
import type { Expense, ExpenseInput } from '../model/types';

const basePath = (tripId: TripId) => `/trips/${tripId}/expenses`;

export const expensesApi = {
    getAll: (tripId: TripId, options?: RequestOptions) =>
        apiClient.get<Expense[]>(basePath(tripId), options),
    create: (tripId: TripId, item: ExpenseInput) =>
        apiClient.post<string>(basePath(tripId), item),
    update: (tripId: TripId, id: ExpenseId, item: ExpenseInput) =>
        apiClient.put<string>(`${basePath(tripId)}/${id}`, item),
    delete: (tripId: TripId, id: ExpenseId) =>
        apiClient.delete(`${basePath(tripId)}/${id}`),
};
