import {showDate} from "@/lib/utils";
import EntrySourceUrl from "@/ui/search/entry-source-url";
import EntryTitleUrl from "@/ui/search/entry-title-url";

export default function LatestEntries({hits, locale}: { hits: Hit[], locale: string }) {
    return (<>{hits.map((hit: Hit) => {
        return (
            <article
                key={hit._id}
                className="relative group">
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    <EntryTitleUrl title={hit._source.title} />

                    {
                        hit._source.summary ?
                            <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit._source.summary}}/>
                            :
                            <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit._source.content.substring(0,300)+'…'}}/>
                    }

                    <EntrySourceUrl url={hit._source.url} />

                    <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            <time dateTime="2024-03-06T16:30:00.000Z">{showDate(hit._source.published, locale)}</time>
                        </dd>
                    </dl>
                </div>
            </article>
        );
    })}
    </>);
}