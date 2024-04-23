import ResourceTag from "@/ui/search/ResourceTag";
import React, {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import storage from "@/lib/localStorage";
import {useLocale} from "next-intl";
import {resourceNamesMap} from "@/lib/utils";

export default function SearchResourceFilter() {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const params = new URLSearchParams(searchParams)
    const [rid, setRid] = React.useState(0)
    const locale = useLocale();

    // устанавливаем при первой загрузке значение rid из searchParams
    useEffect(() => {
        const ridParam = params.get('rid');
        if (ridParam) {
            storage.set(`rid`, ridParam.toString())
            setRid(Number(ridParam.toString()))
        } else {
            storage.remove('rid')
        }
    }, []);

    useEffect(() => {
        storage.get('rid') ? setRid(storage.get('rid')) : setRid(0)
    });

    function handleChangeRid(ridParam: number) {
        rid == ridParam ? setRid(0) : setRid(ridParam);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>, ridParam: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)

        handleChangeRid(ridParam)

        if (params.has('rid', ridParam.toString())) {
            params.delete('rid', ridParam.toString());
            storage.remove('rid')
        } else {
            params.set('rid', `${ridParam}`);
            storage.set(`rid`, ridParam.toString())
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
                        active={rid == item.rid}
                        handleClick={handleClick}
                        locale={locale}
                    />
                </div>);
            })}
        </div>
    )
}