'use client'
import {useLocale} from 'next-intl';
import {locales} from '@/config';
import {Dropdown} from '@mui/base/Dropdown';
import {Menu} from '@mui/base/Menu';
import {MenuButton} from '@mui/base/MenuButton';
import React, {useTransition} from "react";
import MenuItem from "@mui/material/MenuItem";
import {usePathname, useRouter} from "@/navigation";
import {useParams} from "next/navigation";
import {Suspense} from "react";


export default function LocaleSwitcher() {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();
    const createHandleMenuClick = (menuItem: string) => {
        if (menuItem === locale) {
            return;
        }
        return () => {
            startTransition(() => {
                router.replace(
                    // @ts-expect-error -- TypeScript will validate that only known `params`
                    // are used in combination with a given `pathname`. Since the two will
                    // always match for the current route, we can skip runtime checks.
                    {pathname, params},
                    {locale: menuItem}
                );
            });
        };
    };

    return (
        <Suspense>
            <Dropdown>
                <MenuButton className="p-3 sm:text-base/7 text-sm">{locale.toUpperCase()}</MenuButton>
                <Menu className="bg-svoddWhite-400 dark:bg-svoddBlack-400 border rounded-xl p-3">
                    {locales.map((cur) => (
                        <MenuItem key={cur} onClick={createHandleMenuClick(cur)}>
                            {cur.toUpperCase()}
                        </MenuItem>
                    ))}
                </Menu>
            </Dropdown>
        </Suspense>
    );
}