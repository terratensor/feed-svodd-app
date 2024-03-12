export default function LatestEntries({hits}: { hits: Hit[] }) {
    return (<>{hits.map((hit: Hit) => {
        return (
            <div
                key={hit._id}
                className="mb-10">

                <h3 className="text-xl font-semibold">{hit._source.title}</h3>

                {
                    hit._source.summary ?
                        <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit._source.summary}}/>
                        :
                        <div className="text-base/7" dangerouslySetInnerHTML={{__html: hit._source.content}}/>
                }

                <a href={hit._source.url} target="_blank">{hit._source.url}</a>
            </div>
        );
    })}
    </>);
}