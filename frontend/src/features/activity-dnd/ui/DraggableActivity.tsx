import type { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { DragData } from '../model/dnd';
import type { Activity } from '@/entities/activity';

export function DraggableActivity({
    activity,
    children,
}: {
    activity: Activity;
    children: ReactNode;
}) {
    const { attributes, listeners, setNodeRef } =
        useDraggable({
            id: activity.id,
            data: { activity } satisfies DragData,
        });

    return (
        <div
            ref={setNodeRef}
            style={{
                cursor: 'grab',
                touchAction: 'none',
            }}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}