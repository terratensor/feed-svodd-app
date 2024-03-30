import ResourceTag from "@/ui/search/ResourceTag";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function SearchResourceFilter() {
    const searchParams = useSearchParams();
    const {push} = useRouter();

    const handleRids = (rid: string | string[] | undefined) => {
        let result: number[] = [];
        if (rid && rid instanceof Array) {
            rid.map((value) => {
                return result.push(Number(value))
            })
        } else if (rid) {
            result.push(Number(rid))
        }

        return result
    }
    const rids = handleRids(searchParams.getAll('rid'));

    const handleClick = (event: React.MouseEvent<HTMLElement>, rid: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)

        if (params.get('rid')) {
            console.log(params.get('rid'))
            params.delete('rid', rid.toString());
        } else {
            params.set('rid', `${rid}`);
        }
        push(`?${params.toString()}`);
    }

    return (
        <div className='flex justify-items-start gap-1'>
            {rids ? rids.map((rid) => {
                return (<div key={rid} className='flex flex-col'>
                    <ResourceTag className='text-xs' rid={rid} handleClick={handleClick} showIcon={true}/>
                </div>);
            }) : null}
        </div>
    )
}