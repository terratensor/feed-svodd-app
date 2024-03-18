
export default async function EntrySummary({hit}: {hit: Hit}) {
    const summary = hit._source.summary ? hit._source.summary : hit._source.content.substring(0, 320)
    return <div className="text-base/7" dangerouslySetInnerHTML={{__html: summary}} />
}