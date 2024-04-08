import ResourceTag from "@/ui/search/ResourceTag";
import React, {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";

const resourceNamesMap = [
    {rid: 1, name: "КРЕМЛЬ", active: false},
    {rid: 2, name: "МИД", active: false},
    {rid: 3, name: "МИНОБОРОНЫ", active: false},
];

function getItem(resource_id: number): { name: string; active: boolean; rid: number } | string {
    return resourceNamesMap.find((item: {
        rid: number,
        name: string,
        active: boolean
    }) => item.rid === resource_id) || "не определено";
}

export default function SearchResourceFilter() {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const params = new URLSearchParams(searchParams)
    const [rids, setRids] = React.useState(resourceNamesMap);

    useEffect(() => {

        // console.log("searchParams", params.getAll('rid'))

        const ridParams = params.getAll('rid');
        ridParams.map((rid) => {
            setRids(rids.map(item => {
                if (item.rid === Number(rid)) {
                    item.active = true;
                    return item;
                } else {
                    return item;
                }
            }));
        })

        // console.log("searchParams2", rids)
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        console.log("use effect 45 params", params.toString())
        console.log("useEffect 45", rids)
        console.log("searchParams 47", params.getAll('rid'))
        params.getAll('rid').map((rid) => {
            rids.forEach((item, index) => {
                if (item.rid === Number(rid) && !item.active) {
                    console.log("index", rids[index])
                }
            });
        })
    });

    function handleChangeRid(rid: number) {
        setRids(rids.map(item => {
            if (item.rid === rid) {
                item.active = !item.active;
                return item;
            } else {
                return item;
            }
        }));
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>, rid: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)

        handleChangeRid(rid)

        if (params.has('rid', rid.toString())) {
            params.delete('rid', rid.toString());
        } else {
            params.append('rid', `${rid}`);
        }

        replace(`?${params.toString()}`);
    }

    return (
        <div className='flex justify-items-start gap-1'>
            {resourceNamesMap.map((item) => {
                return (<div key={item.rid} className='flex flex-col'>
                    <ResourceTag
                        className='text-xs'
                        rid={item.rid}
                        name={item.name}
                        active={item.active}
                        handleClick={handleClick}
                        showIcon={item.active}
                    />
                </div>);
            })}
        </div>
    )
}