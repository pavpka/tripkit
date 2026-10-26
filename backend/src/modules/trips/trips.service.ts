import type { TripsRepository } from './trips.repository.js';
import type { CreateTripDto } from './trips.types.js';
import { HttpError } from '../../shared/errors/http-error.js';
import type { Trip } from './trips.types.js';

export class TripsService {
    constructor(private readonly repo: TripsRepository) { }

    async getAll(): Promise<Trip[]> {
        return this.repo.findAll();
    }
    async getById(id: string): Promise<Trip> {
        const trip = await this.repo.findById(id);
        if (!trip) throw new HttpError(404, `Trip ${id} not found`);
        return trip;
    }
    async create(trip: CreateTripDto): Promise<Trip> {
        return this.repo.create(trip);
    }
    async delete(id: string): Promise<void> {
        return this.repo.delete(id);
    }
    async update(id: string, trip: CreateTripDto): Promise<void> {
        return this.repo.update(id, trip);
    }
}


/*
Здесь живут правила приложения:

поездка не найдена — ошибка 404;
endDate не может быть раньше startDate;
при создании нужно проставить createdAt;
у статуса idea даты могут быть пустыми.
Сервис ничего не знает про Express, req и res. Он получает обычные данные и возвращает обычные данные, 
поэтому его легко тестировать и можно вызвать откуда угодно. Хранилище приходит снаружи через конструктор, 
а сервис зависит только от интерфейса TripsRepository, а не от конкретного класса.

*/