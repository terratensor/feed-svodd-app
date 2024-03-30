'use client'
import {useLocale} from 'next-intl';
import {locales} from '@/config';
import {Dropdown} from '@mui/base/Dropdown';
import {Menu} from '@mui/base/Menu';
import {MenuButton} from '@mui/base/MenuButton';
import React, {useTransition} from "react";
import {MenuItem} from '@mui/base/MenuItem';
import {usePathname, useRouter} from "@/navigation";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import clsx from "clsx";
import {className} from "postcss-selector-parser";


export default function LocaleSwitcher() {

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
            <Dropdown>
                <MenuButton
                    className="p-3 sm:text-base/7 text-sm">{locale.toUpperCase()
                }</MenuButton>
                <Menu className="bg-svoddWhite-400 dark:bg-svoddBlack-400 border rounded-xl p-7">
                    {locales.map((cur) => (
                        <MenuItem
                            key={cur} onClick={createHandleMenuClick(cur)}
                            className={clsx('cursor-pointer', className, {
                                'font-bold': locale === cur
                            })}
                        >
                            {cur.toUpperCase()}
                        </MenuItem>
                    ))}
                </Menu>
            </Dropdown>
        </Suspense>
    );
}