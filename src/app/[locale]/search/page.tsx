import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import type {Metadata, ResolvingMetadata} from 'next'
import {fetchFilteredEntriesTotalHits, ITEMS_PER_PAGE, MAX_OFFSET} from "@/lib/data";
import PageLayout from "@/components/PageLayout";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import SearchSummary from "@/ui/main/search-summary";
import SearchedEntries from "@/ui/main/searched-entries";
import * as React from "react";
import Pagination from "@/ui/pagination/Pagination";
import {notFound} from "next/navigation";
import EmptyQuery from "@/components/EmptyQuery";
import SortFilter from "@/ui/sorting/SortFilter";


type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
        rid?: string | string[];
        sort?: string;
    }
};
export default async function Page({params: {locale}, searchParams}: Props) {
    unstable_setRequestLocale(locale);

    const query = searchParams?.query || '';
    const sort = searchParams?.sort || '';
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
    // Если задан параметр страницы более чем установленный лимит, то показывает 404 и есть результаты поиска,
    // иначе показываем сообщение об отсутствии результатов
    if ((currentPage > getTotalPages() && totalHits > 0) || currentPage < 0) {
        return notFound();
    }

    if (query.length == 0) {
        return <EmptyQuery/>
    }

    return (
        <PageLayout>
            <Suspense key={query + currentPage} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 lg:pt-0 pt-5 text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between justify-start items-baseline sm:mt-3 md:mt-4">
                        <SearchSummary totalHits={totalHits} currentPage={currentPage}/>
                        {totalHits ? <SortFilter locale={locale}/> : null }
                    </div>
                    <SearchedEntries
                        query={query}
                        currentPage={currentPage}
                        rids={rids}
                        sort={sort}
                        locale={locale}
                    />
                </div>
                <Pagination totalPages={totalPages}/>
            </Suspense>
        </PageLayout>
    );
}

export async function generateMetadata(
    {params, searchParams}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const t = await getTranslations({locale: params.locale, namespace: 'SearchPage'});

    return {
        robots: 'noindex',
        alternates: null,
        title: t("searchResults", {query: searchParams?.query?.toString()}),
        description: t('description'),
        openGraph: {
            title: t("searchResults", {query: searchParams?.query?.toString()}),
        }
    }
}