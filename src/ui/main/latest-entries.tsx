import {fetchFilteredEntries, fetchLatestEntries} from "@/lib/data";
import clsx from "clsx";

export default async function LatestEntries({query}: {query: string}) {
    // const latestEntries = await fetchLatestEntries();
    const latestEntries = await fetchFilteredEntries(query);
    const hits = latestEntries["hits"]["hits"];

    console.log(hits)

    return (<>{hits.map((hit: Hit) => {
        return (
            <div
                key={hit._id}
                className="mb-10">
                <h3 className="text-xl font-semibold ">{hit._source.title}</h3>
                <div className="text-base/7">{hit._source.content}</div>
                <a href={hit._source.url} target="_blank">{hit._source.url}</a>
            </div>
        );
    })}
    </>);
}