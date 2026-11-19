import type { TripId } from '@/shared/types';
import type { Activity } from '@/entities/activity';
import type { ReactNode } from 'react';
import { useAssignActivityToDay } from '../model/useAssignActivityToDay';
import { DragOverlay, useSensors } from '@dnd-kit/core';
import { useSensor } from '@dnd-kit/core';
import { PointerSensor } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import type { DragData } from '../model/dnd';

export function AssignActivityDndProvider({
    tripId,
    children,
    renderDragOverlay,
}: {
    tripId: TripId;
    children: ReactNode;
    renderDragOverlay?: (activity: Activity) => ReactNode;
}) {
    const handleDrop = useAssignActivityToDay(tripId);
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    );

    const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => setActiveActivity((active.data.current as DragData).activity)}
            onDragEnd={(event) => {
                setActiveActivity(null);
                handleDrop(event);
            }}
            onDragCancel={() => setActiveActivity(null)}
        >
            {children}
            <DragOverlay dropAnimation={null}>
                {activeActivity && renderDragOverlay?.(activeActivity)}
            </DragOverlay>
        </ DndContext>

    );
}