'use client'
import * as React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getLanguagePrefix} from "@/utils/getURL";

export default function SortFilter({locale}: { locale: string }) {

    const searchParams = useSearchParams();
    const {push} = useRouter();
    const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams)
        const sort = event.target.value;
        if (sort === 'date') {
            params.set('sort', 'date')
        }
        if (sort === '-date') {
            params.set('sort', '-date')
        }
        if (sort === '') {
            params.delete('sort')
        }

        push(`${getLanguagePrefix(locale)}/search?${params.toString()}`);
    }
    return (<div className='w-full sm:w-auto'>
            <label htmlFor="sort" aria-label="Сортировка"></label>
            <select
                id="input-sort"
                className="entries-sort relative rounded-md border-0 bg-transparent py-2 pl-4 pr-7
                 text-svoddBlack-100 dark:text-svoddWhite-200 ring-1 ring-inset ring-svoddGray-100 dark:ring-gray-700 focus:ring-svoddGray-100 text-sm leading-6
                 w-full sm:w-auto cursor-pointer"
                onChange={handleSort}
            >
                <option selected={(searchParams.get('sort') === undefined)} value={''}>Сортировка по умолчанию</option>
                <option selected={(searchParams.get('sort') === 'date')} value={'date'}>Сначала новые записи</option>
                <option selected={(searchParams.get('sort') === '-date')} value={'-date'}>Сначала старые записи</option>

            </select>
        </div>
    );
}