import {defaultLocale, locales} from "@/config";

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 2 && totalPages <= 2) {
        return [1, 2];
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 1) {
        return [totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        currentPage - 1,
        currentPage,
        currentPage + 1,
    ];
};

export const showDate = (published: number, locale: string) => {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(published * 1000)
}

export const showISOSDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString();
}


export const getAlternatesMetadata = async ({ locale }: { locale: string }) => {
    const siteURL: URL = new URL(process.env.PUBLIC_SITE_URL || 'https://feed.svodd.ru');

    siteURL.pathname = locale !== defaultLocale ? `/${locale}` : "";

    return {
        canonical: siteURL.toString(),
    }
}

export const getEntryAlternates = async ({locale, entry}: {
    locale: string,
    entry: Source
}) => {
    const initialPathname = "/entry"
    const url: URL = new URL(process.env.PUBLIC_SITE_URL || 'https://feed.svodd.ru');

    url.pathname = entry.language !== defaultLocale ? `${entry.language}${initialPathname}` : initialPathname;
    url.searchParams.set('url', entry.url);

    const alternateUrl: URL = new URL(url);

    const languages: Record<string, string> = locales.reduce((obj: { [key: string]: string }, localeAlt) => {
        if (localeAlt !== entry.language) {
            alternateUrl.pathname = `${localeAlt}${initialPathname}`;
            obj[localeAlt] = alternateUrl.toString();
        }
        return obj;
    }, {});

    return {
        canonical: url.toString(),
        languages: languages,
    }
}