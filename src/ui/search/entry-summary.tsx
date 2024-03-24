export default function EntrySummary({hit}: { hit: Hit }) {

    const summary = hit._source.summary
    return (
        <>
            {
                summary ? <div
                    className="text-base/7"
                    dangerouslySetInnerHTML={{__html: summary}}
                /> : ''
            }
        </>
    );
}