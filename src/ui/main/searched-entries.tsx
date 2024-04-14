import {fetchFilteredEntries} from "@/lib/data";
import {showDate} from "@/lib/utils";
import clsx from "clsx";
import {className} from "postcss-selector-parser";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import EntryTags from "@/ui/search/entry-tags";
import {getLanguagePrefix} from "@/utils/getURL";

export default async function SearchedEntries({query, currentPage, rids, sort, locale}: {
    query: string,
    currentPage: number,
    rids: number[],
    sort: string,
    locale: string
}) {
// Enable static rendering
    unstable_setRequestLocale(locale);
    const t = await getTranslations('LatestEntries');

    const latestEntries = await fetchFilteredEntries(locale, query, currentPage, rids, sort);
    const hits = latestEntries["hits"] ? latestEntries["hits"]["hits"] : [];

    function getTagName(resource_id: number) {
        switch (resource_id) {
            case 1:
                return t('tags.kremlin')
            case 2:
                return t('tags.mid')
            case 3:
                return t('tags.mil')
            default:
                return t('tags.notDefined')
        }
    }

    if (query.length == 0) {
        // return <LatestEntries hits={hits} locale={locale}/>
        return <div>Задан пустой запрос</div>
    }

    return (<>{hits.map((hit: Hit, index: number) => {
        return (
            <article
                key={hit._id}
                data-url={hit._source.url}
                className={clsx('relative group mx-5 lg:mx-0', className, {
                    "!mt-8": index == 0
                })}>
                <div
                    className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 rounded-2xl bg-svoddWhite-600 dark:bg-svoddBlack-400"></div>
                <div className="relative">
                    {/*{hit.highlight.title && hit.highlight.title.length > 0 ?*/}
                    {/*    <h3 className="text-xl font-semibold pt-8 mb-2" dangerouslySetInnerHTML={{__html: hit.highlight.title}}/>*/}
                    {/*    :*/}
                    {/*    <h3 className="text-xl font-semibold pt-8 mb-2">{hit._source.title}</h3>*/}
                    {/*}*/}
                    <div className={'flex justify-end'}>
                        <a className='text-svoddRed-100 underline-offset-0'
                            href={`${getLanguagePrefix(locale)}/entry?url=${hit._source.url}#${hit._source.chunk}`}
                        ><span className='underline underline-offset-1'>контекст</span></a>
                    </div>
                    {
                        hit.highlight.content.length > 0 ?
                            <div className="content text-base/7 pt-8"
                                 dangerouslySetInnerHTML={{__html: hit.highlight.content}}/>
                            :
                            <div className="content text-base/7 pt-8"
                                 dangerouslySetInnerHTML={{__html: hit._source.content}}/>
                    }

                    <dl className="absolute left-0 top-0 lg:right-full lg:mr-[calc(6.5rem+1px)]">
                        <dt className="sr-only">Date</dt>
                        <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
                            {hit._source.published ?
                                <time
                                    dateTime="2024-03-06T16:30:00.000Z">{showDate(hit._source.published, locale)}</time>
                                : t("dateNotSet")}
                        </dd>
                    </dl>

                    <div className='articel-footer mt-10'>
                    {hit.highlight.title && hit.highlight.title.length > 0 ?
                        <div><b className="text-base pt-8 mb-2"
                                dangerouslySetInnerHTML={{__html: hit.highlight.title}}/></div>
                        :
                        <div><b className="text-base pt-8 mb-2">{hit._source.title}</b></div>
                    }

                    {hit._source.author &&
                        <div><i className="text-base pt-8 mb-2">{hit._source.author}</i></div>
                    }

                    {/*<EntrySourceUrl url={hit._source.url}/><br />*/}
                    <EntryTags hit={hit} name={getTagName(hit._source.resource_id)}/>


                    {/*<dl className="lg:right-full lg:mr-[calc(6.5rem+1px)]">*/}
                    {/*    <dt className="sr-only">Date</dt>*/}
                    {/*    <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">*/}
                    {/*        {hit._source.published ?*/}
                    {/*            <time*/}
                    {/*                dateTime="2024-03-06T16:30:00.000Z">{showDate(hit._source.published, locale)}</time>*/}
                    {/*            : t("dateNotSet")}*/}
                    {/*    </dd>*/}
                    {/*</dl>*/}
                    </div>
                </div>
            </article>
        );
    })}
    </>);
}