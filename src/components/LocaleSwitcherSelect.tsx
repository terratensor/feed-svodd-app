'use client';

import clsx from 'clsx';
import {useParams, useSearchParams} from 'next/navigation';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {useRouter, usePathname} from '@/navigation';

type Props = {
    children: ReactNode;
    defaultValue: string;
    label: string;
};

export default function LocaleSwitcherSelect({
    children,
    defaultValue,
    label
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        const params = new URLSearchParams(searchParams);

        let href: string;
        // Если это поисковый запрос, то переключаем язык и страницу,
        // если иное, то переводим на главную с переключением языка интерфейса
        if (params.has('query')){
            href = `${pathname}?${params.toString()}`;
        } else {
            href = '/';
        }

        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                href,
                {locale: nextLocale}
            );
        });
    }

    return (
        <label
            className={clsx(
                'relative text-gray-400',
                isPending && 'transition-opacity [&:disabled]:opacity-30'
            )}
        >
            <p className="sr-only">{label}</p>
            <select
                className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-8 border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 cursor-pointer"
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {children}
            </select>
        </label>
    );
}