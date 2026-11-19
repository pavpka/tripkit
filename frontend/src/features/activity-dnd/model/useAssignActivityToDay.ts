import type { TripId } from '@/shared/types';
import { type Activity, useUpdateActivity } from '@/entities/activity';
import type { DragEndEvent } from '@dnd-kit/core';
import type { DragData, DropData } from './dnd';

export function useAssignActivityToDay(tripId: TripId) {
    const assignDay = useUpdateActivity(tripId);

    return (event: DragEndEvent) => {
        const drag = event.active.data.current as DragData | undefined;
        const drop = event.over?.data.current as DropData | undefined;
        if (!drag || !drop) return;

        assignDay.mutate({ ...drag.activity, dayId: drop.dayId });
    };
}