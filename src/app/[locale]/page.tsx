import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import SearchedEntries from "@/ui/main/searched-entries";
import Pagination from "@/ui/search/pagination";
import {fetchFilteredEntriesTotalHits, ITEMS_PER_PAGE} from "@/lib/data";
import * as React from "react";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import SearchSummary from "@/ui/main/search-summary";


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
    const totalPages = Math.ceil( totalHits / ITEMS_PER_PAGE)

    return (
        <PageLayout title={t('title')}>
            <Suspense key={query + currentPage} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                    <SearchSummary totalHits={totalHits} currentPage={currentPage} />
                    <SearchedEntries
                        query={query}
                        currentPage={currentPage}
                        rids={rids}
                        locale={locale}
                    />
                </div>
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </PageLayout>
    );
}