import {fetchFilteredEntries} from "@/lib/data";
import LatestEntries from "@/ui/search/latest-entries";

export default async function SearchedEntries({query, currentPage}: { query: string, currentPage: number }) {
    // const latestEntries = await fetchLatestEntries();
    const latestEntries = await fetchFilteredEntries(query, currentPage);
    const hits = latestEntries["hits"]["hits"];
    console.log(query)
    if (query.length == 0) {
        return <LatestEntries hits={hits}/>
    }
    return (<>{hits.map((hit: Hit) => {
        return (
            <div
                key={hit._id}
                className="mb-10">
                {hit.highlight.title.length > 0 ?
                    <h3 className="text-xl font-semibold" dangerouslySetInnerHTML={{__html: hit.highlight.title}}/>
                    :
                    <h3 className="text-xl font-semibold">{hit._source.title}</h3>
                }
                {
                    hit.highlight.content.length > 0 ?
                        <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit.highlight.content}}/>
                        :
                        <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit._source.content}}/>
                }

                <a href={hit._source.url} target="_blank">{hit._source.url}</a>
            </div>
        );
    })}
    </>);
}