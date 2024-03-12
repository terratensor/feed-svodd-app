import {fetchFilteredEntries, fetchLatestEntries} from "@/lib/data";
import clsx from "clsx";

export default async function LatestEntries({query}: { query: string }) {
    // const latestEntries = await fetchLatestEntries();
    const latestEntries = await fetchFilteredEntries(query);
    const hits = latestEntries["hits"]["hits"];

    console.log(hits)

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