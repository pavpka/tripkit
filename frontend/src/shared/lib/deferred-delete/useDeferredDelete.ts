import { useEffect, useRef, useState } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

const UNDO_MS = 500000;

type Identifiable = { id: unknown };

export function useDeferredDelete<T extends Identifiable>({
    queryKey,
    commit,
    commitOnLeave,
}: {
    queryKey: QueryKey;
    commit: (item: T) => void;
    commitOnLeave: (item: T) => void;
}) {
    const queryClient = useQueryClient();
    const [pending, setPending] = useState<T | null>(null);
    const pendingRef = useRef<T | null>(null);
    const timerRef = useRef<number | null>(null);
    const commitOnLeaveRef = useRef(commitOnLeave);
    commitOnLeaveRef.current = commitOnLeave;

    const setPendingItem = (item: T | null) => {
        pendingRef.current = item;
        setPending(item);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleDelete = (item: T) => {
        if (pendingRef.current) commit(pendingRef.current);
        clearTimer();
        void queryClient.cancelQueries({ queryKey });
        queryClient.setQueryData<T[]>(queryKey, (current) =>
            current?.filter((existing) => existing.id !== item.id),
        );
        setPendingItem(item);
        timerRef.current = window.setTimeout(() => {
            commit(item);
            setPendingItem(null);
            timerRef.current = null;
        }, UNDO_MS);
    };

    const handleUndo = () => {
        const item = pendingRef.current;
        if (!item) return;
        clearTimer();
        queryClient.setQueryData<T[]>(queryKey, (current) => {
            if (!current) return [item];
            if (current.some((existing) => existing.id === item.id))
                return current;
            return [...current, item];
        });
        setPendingItem(null);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            const item = pendingRef.current;
            if (item) commitOnLeaveRef.current(item);
        };
    }, []);

    return { pending, handleDelete, handleUndo };
}
