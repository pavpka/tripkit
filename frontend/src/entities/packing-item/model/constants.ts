import type { CategoryDetails, PackingCategory } from './types';

export const PACKING_CATEGORY_DETAILS: Record<
    PackingCategory,
    CategoryDetails
> = {
    clothes: {
        label: 'Одежда',
        icon: 'clothes.png',
        bgColor: '#DDF3E5',
    },
    docs: {
        label: 'Документы',
        icon: 'docs.png',
        bgColor: '#E2EEFF',
    },
    tech: {
        label: 'Техника',
        icon: 'tech.png',
        bgColor: '#FFF0BF',
    },
    hygiene: {
        label: 'Гигиена',
        icon: 'hygiene.png',
        bgColor: '#FDE3E8',
    },
    other: {
        label: 'Разное',
        icon: 'other.png',
        bgColor: '#E2EEFF',
    },
};
