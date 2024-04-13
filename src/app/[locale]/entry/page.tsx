import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import * as React from "react";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import {fetchEntry} from "@/lib/data";
import EntryUrl from "@/ui/entry/entry-url";
import Head from "next/head";
import type {Metadata, ResolvingMetadata} from "next";
import {getEntryAlternates} from "@/lib/utils";
import {strippedHtml} from "@/utils/html";

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
        <PageLayout>
            <Head>
                <title>{hits ? hits[0]?._source.title : t('title')}</title>
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
    {params, searchParams}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const t = await getTranslations({locale: params.locale, namespace: 'SearchPage'});
    const query: string = searchParams.url;
    const hits = await getHits(query);
    const entry: Source = hits ? hits[0]?._source : null;

    const alternates = await getEntryAlternates({
        locale: params.locale,
        entry: entry
    });

    const summary = entry ?
        strippedHtml(entry.summary.trim()) : null;

    return {
        alternates: alternates,
        title: entry ? entry.title : t('title'),
        description: summary && summary != "" ? summary : t('description'),
    }
}