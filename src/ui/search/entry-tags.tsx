'use client'
import * as React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import ResourceTag from "@/ui/search/ResourceTag";
import storage from "@/lib/localStorage";

export default function EntryTags({hit, name}: { hit: Hit, name: string }) {
    const rid = hit._source.resource_id;
    const searchParams = useSearchParams();
    const {push} = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLElement>, rid: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)
        
        if (params.has('rid', rid.toString())) {
            params.delete('rid', rid.toString());
            storage.remove('rid')
        } else {
            params.append('rid', `${rid}`);
            storage.set(`rid`, rid.toString())
        }
        
        push(`?${params.toString()}`);
    }

    return <ResourceTag
        className='mt-2'
        rid={rid}
        name={name}
        handleClick={handleClick}
    />;
}