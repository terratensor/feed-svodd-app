import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import type {Metadata, ResolvingMetadata} from 'next'
import {fetchFilteredEntriesTotalHits, ITEMS_PER_PAGE} from "@/lib/data";
import PageLayout from "@/components/PageLayout";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import SearchSummary from "@/ui/main/search-summary";
import SearchedEntries from "@/ui/main/searched-entries";
import Pagination from "@/ui/search/pagination";
import * as React from "react";
import EntryPagination from "@/components/EntryPagination";

type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
        rid?: string | string[];
    }
};
export default async function Page({params: {locale}, searchParams}: Props) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('SearchPage');

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

    return (
        <PageLayout>
            <Suspense key={query + currentPage} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                    <SearchSummary totalHits={totalHits} currentPage={currentPage}/>
                    <SearchedEntries
                        query={query}
                        currentPage={currentPage}
                        rids={rids}
                        locale={locale}
                    />
                </div>
            </Suspense>

            <div className="flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </PageLayout>
    );
}

export async function generateMetadata(
    {searchParams}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const t = await getTranslations('SearchPage');
    return {
        title: t("searchResults", {query: searchParams?.query?.toString()}),
    }
}