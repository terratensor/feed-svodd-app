import {showDate, showISOSDate} from "@/lib/utils";
import EntryTitleUrl from "@/ui/search/entry-title-url";
import EntrySummary from "@/ui/search/entry-summary";
import * as React from "react";
import clsx from "clsx";
import {className} from "postcss-selector-parser";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import EntryTags from "@/ui/search/entry-tags";

export default async function LatestEntries({hits, locale}: { hits: Hit[], locale: string }) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const t = await getTranslations('LatestEntries');

    return (<>{hits.map((hit: Hit, index: number ) => {
        return (
            <article
                key={hit._id}
                className={clsx('relative group', className, {
                    "!mt-6": index == 0
                })}>
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    <EntryTitleUrl title={hit._source.title} url={hit._source.url} />

                    <EntrySummary hit={hit} />

                    <EntryTags hit={hit} />
                    {/*<EntrySourceUrl url={hit._source.url} />*/}

                   <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            {hit._source.published ? <time dateTime={`${showISOSDate(hit._source.published)}`}>
                                {showDate(hit._source.published, locale)}
                            </time> : t("dateNotSet")}
                        </dd>
                    </dl>
                </div>
            </article>
        );
    })}
    </>);
}