import {showDate, showISOSDate} from "@/lib/utils";
import EntryTitleUrl from "@/ui/search/entry-title-url";
import EntrySummary from "@/ui/search/entry-summary";
import * as React from "react";
import EntrySourceUrl from "@/ui/search/entry-source-url";

export default async function LatestEntries({hits, locale}: { hits: Hit[], locale: string }) {
    return (<>{hits.map((hit: Hit) => {
        return (
            <article
                key={hit._id}
                className="relative group">
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    <EntryTitleUrl title={hit._source.title} />

                    <EntrySummary hit={hit} />

                    <EntrySourceUrl url={hit._source.url} />

                    <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            <time dateTime={`${showISOSDate(hit._source.published)}`}>
                                {showDate(hit._source.published, locale)}
                            </time>
                        </dd>
                    </dl>
                </div>
            </article>
        );
    })}
    </>);
}