'use client';

import React, {FormEvent, Suspense, useEffect, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import SearchResourceFilter from "@/ui/search/SearchResourceFilter";
import useMainPageURL from "@/utils/useMainPageURL";

export default function Search({placeholder, locale}: { placeholder: string, locale: string }) {

    const searchParams = useSearchParams();
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

    const href = useMainPageURL(locale)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const params = new URLSearchParams(searchParams)
        const formData = new FormData(event.currentTarget)

        const term = formData.get('query')?.toString() || '';
        params.delete('page');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/${locale}/search?${params.toString()}`);
    }

    return (
        <Suspense>
            <form className="svodd-search-form" onSubmit={onSubmit}>
                <div className="relative flex flex-1 flex-shrink-0">

                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <input
                        ref={inputEl}
                        name="query"
                        className="peer block w-full rounded-l-md border border-gray-200 py-[9px] pl-10 text-sm outline-2
                placeholder:text-gray-500 dark:text-svoddBlack-400"
                        placeholder={placeholder}
                        defaultValue={searchParams.get('query')?.toString()}
                        id="search"
                    />
                    {/*<div className="flex">*/}
                    {/*<input type="checkbox" className="rounded"/> kremlin.ru*/}
                    {/*<input type="checkbox" className="rounded"/> mid.ru*/}
                    {/*<input type="checkbox" className="rounded"/> mil.ru*/}

                    {/*</div>*/}
                    <a href={href}>
                        <SvoddLogoIcon
                            className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </a>
                    <button className="btn-svodd" type="submit">Поиск</button>

                </div>
            </form>
            <SearchResourceFilter/>
        </Suspense>
    );
}
