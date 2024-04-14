import clsx from "clsx";
import {className} from "postcss-selector-parser";
import EntrySourceUrl from "@/ui/search/entry-source-url";
import {showDate, showISOSDate} from "@/lib/utils";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import EntryJsonLD from "@/components/EntryJsonLD";


export default async function EntryUrl({hits, locale}: { hits: Hit[], locale: string }) {
    const t = await getTranslations('LatestEntries');

    if (hits.length <= 0) {
        return notFound();
    }

    const hit = hits[0]

    return (<>{
            <article
                key={hit._id}
                data-url={hit._source.url}
                className={clsx('relative group mx-5 lg:mx-0', className, {
                    "!mt-8": true
                })}>
                <EntryJsonLD entry={hit._source}/>
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    {hit.highlight.title && hit.highlight.title.length > 0 ?
                        <h3 className="text-xl font-semibold pt-8 mb-2"
                            dangerouslySetInnerHTML={{__html: hit.highlight.title}}/>
                        :
                        <h3 className="text-xl font-semibold pt-8 mb-2">{hit._source.title}</h3>
                    }
                    {
                        hits.map((hit: Hit, index: number) => {
                            return <>{
                            hit.highlight.content.length > 0 ?
                                <div key={hit._id} className="content text-base/7"
                                     dangerouslySetInnerHTML={{__html: hit.highlight.content}}
                                     id={hit._source.chunk.toString()}
                                />
                                :
                                <div key={hit._id} className="content text-base/7"
                                     dangerouslySetInnerHTML={{__html: hit._source.content}}
                                     id={`${hit._source.chunk.toString()}`}
                                />
                            }</>
                        })
                    }

                    <EntrySourceUrl url={hit._source.url}/>

                    <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            {hit._source.published ?
                                <time
                                    dateTime={showISOSDate(hit._source.published)}
                                >{
                                    showDate(hit._source.published, locale)}
                                </time>
                                : t("dateNotSet")}
                        </dd>
                    </dl>
                </div>
            </article>

  }
    </>);
}