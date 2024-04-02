import {number} from "prop-types";
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
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 2) {
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

// TODO непонятно почему если использовать объект url, то измененные searchParams не передаются в generateMetadata (page=1)
// поэтому используется url.toString()
export const getAlternatesMetadata = async ({locale, pathname, searchParams}: {
    locale: string,
    pathname: string,
    searchParams?: {
        query?: string;
        page?: string;
        rid?: string | string[];
        url?: string;
    }
}) => {
    const url: URL = new URL(process.env.PUBLIC_SITE_URL || 'https://feed.svodd.ru');

    url.pathname = pathname;
    const sp = new URLSearchParams();
    const numPage = Number(searchParams?.page);

    (searchParams?.page && numPage > 1) && url.searchParams.set('page', searchParams?.page.toString());
    searchParams?.rid && url.searchParams.set('rid', searchParams?.rid?.toString() || '');
    searchParams?.query && url.searchParams.set('query', searchParams?.query?.toString() || '');
    searchParams?.url && url.searchParams.set('url', searchParams?.url?.toString() || '');

    const alternateUrl = new URL(url);
    // TODO непонятно почему если использовать объект url, то измененные searchParams не передаются в generateMetadata (page=1)
    // поэтому используется url.toString()
    const languages: Record<string, string> = locales.reduce((obj: { [key: string]: string }, locale) => {
        alternateUrl.pathname = `${locale}${pathname}`;
        obj[locale] = alternateUrl.toString();
        return obj;
    }, {});

    return  {
        canonical: url.toString(),
        languages: languages,
    }
}