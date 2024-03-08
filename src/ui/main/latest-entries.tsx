import {fetchLatestEntries} from "@/lib/data";
import clsx from "clsx";

export default async function LatestEntries() {
    const latestEntries = await fetchLatestEntries();
    const hits = latestEntries["hits"]["hits"];

    return (<div> {hits.map((hit: Hit) => {
        return (
            <div
                key={hit._id}
                className="flex flex-col max-w-4xl mx-auto my-5">
                <h3 className="text-xl my-3">{hit._source.title}</h3>
                <div className="text-base/7">{hit._source.summary}</div>
                <a href={hit._source.url} target="_blank">{hit._source.url}</a>
            </div>
        );
    })}
    </div>);
}