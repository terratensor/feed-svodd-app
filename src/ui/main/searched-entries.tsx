import {fetchFilteredEntries} from "@/lib/data";
import LatestEntries from "@/ui/search/latest-entries";
import {showDate} from "@/lib/utils";
import EntrySourceUrl from "@/ui/search/entry-source-url";
import clsx from "clsx";
import {className} from "postcss-selector-parser";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";

export default async function SearchedEntries({query, currentPage, rids, locale}: {
    query: string,
    currentPage: number,
    rids: number[],
    locale: string
}) {
// Enable static rendering
    unstable_setRequestLocale(locale);
    const t = await getTranslations('LatestEntries');

    const latestEntries = await fetchFilteredEntries(locale, query, currentPage, rids);
    const hits = latestEntries["hits"] ? latestEntries["hits"]["hits"] : [];

    if (query.length == 0) {
        return <LatestEntries hits={hits} locale={locale}/>
    }

    return (<>{hits.map((hit: Hit, index: number) => {
        return (
            <article
                key={hit._id}
                data-url={hit._source.url}
                className={clsx('relative group', className, {
                    "!mt-10": index == 0
                })}>
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    {hit.highlight.title && hit.highlight.title.length > 0 ?
                        <h3 className="text-xl font-semibold pt-8 mb-2" dangerouslySetInnerHTML={{__html: hit.highlight.title}}/>
                        :
                        <h3 className="text-xl font-semibold pt-8 mb-2">{hit._source.title}</h3>
                    }
                    {
                        hit.highlight.content.length > 0 ?
                            <div className="content text-base/7" dangerouslySetInnerHTML={{__html: hit.highlight.content}}/>
                            :
                            <div className="content text-base/7" dangerouslySetInnerHTML={{__html: hit._source.content}}/>
                    }

                    <EntrySourceUrl url={hit._source.url}/>

                    <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            {hit._source.published ?
                                <time dateTime="2024-03-06T16:30:00.000Z">{showDate(hit._source.published, locale)}</time>
                                : t("dateNotSet")}
                        </dd>
                    </dl>
                </div>
            </article>
        );
    })}
    </>);
}