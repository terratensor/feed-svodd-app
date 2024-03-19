'use client'
import React, {useState, useEffect} from 'react'

// const SuspenseEntrySummary = dynamic(() => import('@/ui/search/entry-content'),
//     {
//         ssr: false,
//         loading: () => <EntryContentSkeleton />,
//     }
// );

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

export default function EntrySummary({hit}: { hit: Hit }) {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    const summary = hit._source.summary ? hit._source.summary : hit._source.content.substring(0, 300)
    // return <>{<div className="text-base/7" dangerouslySetInnerHTML={{__html: summary}} />}</>
    return <>
        {isClient ? <div
        className="text-base/7"
        dangerouslySetInnerHTML={{__html: summary}}
    /> : ''}</>
    // return <div className="text-base/7" >{summary}</div>

    // return <SuspenseEntrySummary hit={hit}/>
}