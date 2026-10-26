import type { PackingItem } from './types';

export const sortedByPacked = (items: PackingItem[]) => {
    return [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
};
