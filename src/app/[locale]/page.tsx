import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import SearchedEntries from "@/ui/main/searched-entries";
import Search from "@/ui/search";
import Pagination from "@/ui/search/pagination";
import {fetchFilteredEntriesPages} from "@/lib/data";
import MainMenu from "@/ui/menu/main-menu";
import * as React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";


type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
    }
};

export default async function Page({params: {locale}, searchParams}: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = await getTranslations('IndexPage');

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchFilteredEntriesPages(locale, query)

    return (
        <PageLayout title={t('title')}>
            <div
                className="sticky top-0 p-3 z-40 flex items-center
                justify-between gap-2 max-w-[1200px] mx-auto bg-svoddWhite-400 dark:bg-svoddBlack-400">
                <Search placeholder={t("SearchPlaceholder")}/>
                <MainMenu/>
                <ThemeSwitch/>
            </div>
            <div
                className="flex flex-col max-w-6xl mx-auto my-5 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200">
                <SearchedEntries query={query} currentPage={currentPage} locale={locale} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </PageLayout>
    );
}