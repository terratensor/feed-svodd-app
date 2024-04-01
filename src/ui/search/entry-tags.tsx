'use client'
import * as React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import ResourceTag from "@/ui/search/ResourceTag";

export default function EntryTags({hit, name}: { hit: Hit, name: string }) {
    const rid = hit._source.resource_id;
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLElement>, rid: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)
        if (params.get('rid')) {
            params.delete('rid');
        } else {
            params.set('rid', `${rid}`);
        }
        replace(`?${params.toString()}`);
    }

    return <ResourceTag
        className='mt-2'
        rid={rid}
        name={name}
        handleClick={handleClick}
    />;
}