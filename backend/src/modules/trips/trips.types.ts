type TripStatus = 'idea' | 'planning' | 'booked' | 'ongoing' | 'done' | 'cancelled';
type Currency = 'RUB' | 'USD' | 'EUR';

export interface Trip {
    id: string;
    title: string;
    destinations: string[];
    startDate: string | null;
    endDate: string | null;
    status: TripStatus;
    budget: number | null;
    currency: Currency;
    travellersCount: number;
    coverNote: string | null;
    emoji: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateTripDto = Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>;