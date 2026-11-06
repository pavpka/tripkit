import type { CategoryDetails, PackingCategory } from './types';

export const PACKING_CATEGORY_DETAILS: Record<
    PackingCategory,
    CategoryDetails
> = {
    clothes: {
        label: 'Одежда',
        icon: '/icons/packing-items/clothes.png',
        bgColor: '#DDF3E5',
    },
    docs: {
        label: 'Документы',
        icon: '/icons/packing-items/docs.png',
        bgColor: '#E2EEFF',
    },
    tech: {
        label: 'Техника',
        icon: '/icons/packing-items/tech.png',
        bgColor: '#FFF0BF',
    },
    hygiene: {
        label: 'Гигиена',
        icon: '/icons/packing-items/hygiene.png',
        bgColor: '#FDE3E8',
    },
    other: {
        label: 'Разное',
        icon: '/icons/packing-items/other.png',
        bgColor: '#E2EEFF',
    },
};
