import {getTranslations} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {Suspense} from "react";
import {SearchedEntriesSkeleton} from "@/ui/sceletons";
import * as React from "react";
import {fetchEntry} from "@/lib/data";
import EntryUrl from "@/ui/entry/entry-url";

type Props = {
    params: { locale: string };
    searchParams: {
        url: string;
    }
};

export default async function Page({params: {locale}, searchParams}: Props) {

    const t = await getTranslations('EntryPage');
    const query = searchParams.url;

    const response = await fetchEntry(locale, query);
    const hits = response["hits"] ? response["hits"]["hits"] : [];

    return (
        <PageLayout title={t('title')}>
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