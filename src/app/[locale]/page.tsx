import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import LatestEntries from "@/ui/search/latest-entries";
import {
    fetchEntries,
    fetchFilteredEntriesTotalHits,
    ITEMS_PER_PAGE,
    MAX_OFFSET
} from "@/lib/data";
import * as React from "react";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import Pagination from "@/ui/pagination/Pagination";
import {notFound} from "next/navigation";

type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
        rid?: string | string[];
    }
};

export default async function Page({params: {locale}, searchParams}: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = await getTranslations('IndexPage');

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const lastPageLimit = MAX_OFFSET / ITEMS_PER_PAGE;

    const handleRids = (rid: string | string[] | undefined) => {
        let result: number[] = [];
        if (rid && rid instanceof Array) {
            rid.map((value) => {
                return result.push(Number(value))
            })
        } else if (rid) {
            result.push(Number(rid))
        }

        return result
    }
    const rids = handleRids(searchParams?.rid);

    const totalHits = await fetchFilteredEntriesTotalHits(locale, query, rids)
    const totalPages = Math.ceil(totalHits / ITEMS_PER_PAGE)

    const getTotalPages = () => totalPages < lastPageLimit ? totalPages : lastPageLimit
    // Если задан параметр страницы более чем установленный лимит, то показывает 404
    if (currentPage > getTotalPages() || currentPage < 0) {
        return notFound();
    }

    const latestEntries = await fetchEntries(locale, currentPage, rids);
    const hits = latestEntries["hits"] ? latestEntries["hits"]["hits"] : [];

    return (
        <PageLayout>
            <Suspense key={query + currentPage} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 md:space-y-16 space-y-12 pt-5 text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                   <LatestEntries hits={hits} locale={locale}/>
                </div>
                <Pagination totalPages={totalPages}/>
            </Suspense>
        </PageLayout>
    );
}