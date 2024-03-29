import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import * as React from "react";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import {fetchEntry} from "@/lib/data";
import EntryUrl from "@/ui/entry/entry-url";
import Head from "next/head";
import type {Metadata, ResolvingMetadata} from "next";

type Props = {
    params: { locale: string };
    searchParams: {
        url: string;
    }
};

async function getHits(query: string) {
    const response = await fetchEntry(query);
    return response["hits"] ? response["hits"]["hits"] : []
}
export default async function Page({params: {locale}, searchParams}: Props) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('IndexPage');
    const query = searchParams.url;
    const hits = await getHits(query);

    return (
        <PageLayout title={hits ? hits[0]._source.title : t('title')}>
            <Head>
                <title>{hits ? hits[0]._source.title : t('title')}</title>
            </Head>
            <Suspense key={query} fallback={<SearchedEntriesSkeleton/>}>
                <div
                    className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200`}
                >
                    <EntryUrl
                        hits={hits}
                        locale={locale}
                    />
                </div>
            </Suspense>
        </PageLayout>
    );
}

export async function generateMetadata(
    {searchParams}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const t = await getTranslations('SearchPage');
    const query = searchParams.url;
    const hits = await getHits(query);
    return {
        title: hits ? hits[0]._source.title : t('title'),
    }
}