import type { DayId } from '@/shared/types';
import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { dayDropId } from '../model/dnd';
import type { DropData } from '../model/dnd';

export function DayDropZone({
    dayId,
    children,
}: {
    dayId: DayId;
    children: (isOver: boolean) => ReactNode;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: dayDropId(dayId),
        data: { dayId } satisfies DropData,
    });

    return <div ref={setNodeRef}>{children(isOver)}</div>;
}