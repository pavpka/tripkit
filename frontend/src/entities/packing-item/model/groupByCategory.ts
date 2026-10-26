import { PACKING_CATEGORY_DETAILS } from './constants';
import type {
    PackingCategory,
    PackingCategoryGroup,
    PackingItem,
} from './types';

export const groupByCategory = (items: PackingItem[]): PackingCategoryGroup[] =>
    (Object.keys(PACKING_CATEGORY_DETAILS) as PackingCategory[]).map(
        (category) => ({
            category,
            items: items.filter((item) => item.category === category),
        }),
    );
