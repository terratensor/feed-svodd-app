import {Pathnames} from 'next-intl/navigation';

export const locales = ['ru', 'en'] as const;

export const pathnames = {
    '/': '/',
    '/pathnames': {
        ru: '/pathnames',
        en: '/pathnames'
    }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;