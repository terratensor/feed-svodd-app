'use client'
import clsx from "clsx";
import {className} from "postcss-selector-parser";
import * as React from "react";
import {useRouter, useSearchParams} from "next/navigation";

function getTagName(resource_id: number) {
    switch (resource_id) {
        case 1:
            return "КРЕМЛЬ"
        case 2:
            return "МИД"
        case 3:
            return "МИНОБОРОНЫ"
        default:
            return "не определено"
    }
}

export default function EntryTags({hit}: { hit: Hit }) {
    const rid = hit._source.resource_id;
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLElement>, rid: number) => {
        const params = new URLSearchParams(searchParams)
        if (params.get('rid')) {
            params.delete('rid');
        } else {
            params.set('rid', `${rid}`);
        }
        replace(`?${params.toString()}`);
    }

    return (<>
        <span
            onClick={(event) => handleClick(event, rid)}
            className={clsx('badge text-svoddWhite-300 text-xl', className, {
            "bg-kremlin": rid == 1,
            "bg-mid": rid == 2,
            "bg-mil": rid == 3,
        })}>{getTagName(rid)}</span>
    </>);
}