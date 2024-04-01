import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import LatestEntries from "@/ui/search/latest-entries";
import {fetchFilteredEntries, fetchFilteredEntriesTotalHits, ITEMS_PER_PAGE} from "@/lib/data";
import * as React from "react";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import Pagination from "@/ui/pagination/Pagination";


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

    const latestEntries = await fetchFilteredEntries(locale, query, currentPage, rids);
    const hits = latestEntries["hits"] ? latestEntries["hits"]["hits"] : [];



    return (
        <PageLayout>
            <Suspense key={query + currentPage} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 md:space-y-16 space-y-12  text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                   <LatestEntries hits={hits} locale={locale}/>
                </div>
                <Pagination totalPages={totalPages}/>
            </Suspense>
        </PageLayout>
    );
}