'use client';

import React, {Suspense, useEffect, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import {Link} from "@/navigation";
import SearchResourceFilter from "@/ui/search/SearchResourceFilter";

export default function Search({placeholder}: { placeholder: string }) {

    const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const resourceIDs = searchParams.getAll('rid') || [];
    const {replace} = useRouter();

    const inputEl = useRef<HTMLInputElement>(null);

    // Обработка состояния search input поля при каждой загрузке компонента.
    useEffect(() => {
        if (inputEl.current) {
            if (searchParams.get('query')?.toString() === undefined) {
                inputEl.current.value = '';
            } else {
                inputEl.current.value = searchParams.get('query')?.toString() || '';
            }
        }
    });

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/search?${params.toString()}`);
    }, 500);

    // const href = useMainPageURL(resourceIDs)

    return (
        <Suspense>
            <div className="relative flex flex-1 flex-shrink-0">

                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    ref={inputEl}
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2
                placeholder:text-gray-500 dark:text-svoddBlack-400"
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                    id="search"
                />
                {/*<div className="flex">*/}
                {/*<input type="checkbox" className="rounded"/> kremlin.ru*/}
                {/*<input type="checkbox" className="rounded"/> mid.ru*/}
                {/*<input type="checkbox" className="rounded"/> mil.ru*/}

                {/*</div>*/}
                <Link href="/">
                    <SvoddLogoIcon
                        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </Link>

            </div>
            <SearchResourceFilter />
        </Suspense>
    );
}
