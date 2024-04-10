'use client';

import React, {FormEvent, Suspense, useEffect, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import SearchResourceFilter from "@/ui/search/SearchResourceFilter";
import useMainPageURL from "@/utils/useMainPageURL";
import Link from "next/link";
import {useScrollPosition} from "@/utils/useScrollPosition";
import usePrevious from "@/utils/usePrevious";
import clsx from "clsx";
import {className} from "postcss-selector-parser";

export default function Search({placeholder, locale}: { placeholder: string, locale: string }) {

    const searchParams = useSearchParams();
    const {push} = useRouter();

    const inputEl = useRef<HTMLInputElement>(null);
    //
    const scrollPosition = useScrollPosition();
    const prevScrollPosition = usePrevious(scrollPosition)
    const [isVisible, setVisible] = useState(true)

    useEffect(() => {

        console.log(scrollPosition - (prevScrollPosition || 0))
        if (scrollPosition - (prevScrollPosition || 0) > 0) {
            console.log("scrollDown")
            setVisible(false)
        } else {
            console.log("scrollUp")
            setVisible(true)
        }
        // something happens after it reaches 80% of the screen

    }, [scrollPosition]);

    // Обработка состояния search input поля при каждой загрузке компонента.
    useEffect(() => {
        if (inputEl.current) {
            if (searchParams.get('query')?.toString() === undefined) {
                inputEl.current.value = '';
            } else {
                inputEl.current.value = searchParams.get('query')?.toString() || '';
            }
        }
    }, []);

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
        <div className={clsx('search-panel', className, {
            "transition-all duration-250 opacity-100": isVisible,
            "transition-all duration-250 opacity-0": !isVisible,
        })}>
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
                        <button className="btn-svodd" type="submit">Поиск</button>
                    </div>
                </form>
                <SearchResourceFilter/>
            </Suspense>
        </div>
    );
}
