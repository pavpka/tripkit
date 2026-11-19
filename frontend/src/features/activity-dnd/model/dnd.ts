import type { Activity } from '@/entities/activity';
import type { DayId } from '@/shared/types';


export type DragData = { activity: Activity };
export type DropData = { dayId: DayId | null };

export const dayDropId = (id: DayId | null) => `day:${id}`;