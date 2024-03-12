import React from "react";
import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import LatestEntries from "@/ui/main/latest-entries";
import Search from "@/ui/search";
import {lusitana} from "@/ui/fonts";


type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
    }
};

export default function IndexPage({params: {locale}, searchParams}: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('IndexPage');

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <PageLayout title={t('title')}>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-6xl mx-auto">
                <Search placeholder="Search invoices..."/>
            </div>

            <div className="flex flex-col max-w-6xl mx-auto my-5">
                <LatestEntries query={query}/>
            </div>

        </PageLayout>
    );
}