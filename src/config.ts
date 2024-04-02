import {Pathnames} from 'next-intl/navigation';

export const locales = ['ru', 'en', 'de', 'fr', 'es', 'pt'] as const;

export const pathnames = {
    '/': '/',
    '/search': {
        ru: '/search',
        en: '/search',
        de: '/search',
        fr: '/search',
        es: '/search',
        pt: '/search',
    },
    '/entry': {
        ru: '/entry',
        en: '/entry',
        de: '/entry',
        fr: '/entry',
        es: '/entry',
        pt: '/entry',
    }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;