'use client'
import {useLocale} from 'next-intl';
import {locales} from '@/config';
import React, {useTransition} from "react";
import {usePathname, useRouter} from "@/navigation";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import LocaleSwitcherSelect from "@/components/LocaleSwitcherSelect";
import {ucFirst} from "@/utils/html";


export default function LocaleSwitcher({label}: { label: string }) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const locale = useLocale();
    const searchParams = useSearchParams();

    const createHandleMenuClick = (cur: string) => {
        const params = new URLSearchParams(searchParams);
        return () => {
            startTransition(() => {
                router.push(
                    // @ts-expect-error -- TypeScript will validate that only known `params`
                    // are used in combination with a given `pathname`. Since the two will
                    // always match for the current route, we can skip runtime checks.
                    `${pathname}?${params.toString()}`,
                    {locale: cur}
                );
            });
        };
    };

    return (
        <Suspense>
            <LocaleSwitcherSelect defaultValue={locale} label={label}>
                {locales.map((cur) => (
                    <option key={cur} value={cur}>
                        {ucFirst(cur)}
                    </option>
                ))}
            </LocaleSwitcherSelect>
        </Suspense>
    );
}