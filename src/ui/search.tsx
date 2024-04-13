'use client';

import React, {FormEvent, Suspense, useEffect, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import SearchResourceFilter from "@/ui/search/SearchResourceFilter";
import useMainPageURL from "@/utils/useMainPageURL";
import Link from "next/link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import MyDropdown from "@/components/MyDropdown";

export default function Search({placeholder, locale}: { placeholder: string, locale: string }) {

    const searchParams = useSearchParams();
    const {push} = useRouter();

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

    const href = useMainPageURL(locale, searchParams.get('rid')?.toString()?.split(','))

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const params = new URLSearchParams(searchParams)
        const formData = new FormData(event.currentTarget)

        const term = formData.get('query')?.toString() || '';
        // Если задан пустой запрос, ничего не делаем return
        if (term == '') {
            return
        }
        params.delete('page');
        params.delete('url');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        push(`/${locale}/search?${params.toString()}`);
    }

    return (
        <div className="search-panel opacity-100">
            <Suspense>
                <form className="svodd-search-form" onSubmit={onSubmit}>
                    <div className="relative flex flex-1 flex-shrink-0">

                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <input
                            ref={inputEl}
                            name="query"
                            className="search-input"
                            placeholder={placeholder}
                            defaultValue={searchParams.get('query')?.toString()}
                            id="search"
                        />
                        <Link href={href}>
                            <SvoddLogoIcon
                                className="svodd-input-logo"/>
                        </Link>
                        <button className="btn-svodd" type="submit">
                            <MagnifyingGlassIcon className="w-6 h-6"/>
                        </button>
                        <MyDropdown />
                    </div>
                </form>
                <SearchResourceFilter/>
            </Suspense>
        </div>
    );
}
