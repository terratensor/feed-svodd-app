import {Suspense} from "react";
import clsx from "clsx";
import * as React from "react";
import {XMarkIcon} from "@heroicons/react/16/solid";
import {resourceNamesMap} from "@/lib/utils";
import {usePathname} from "next/navigation";

interface ResourceTagProps {
    className?: string;
    rid: number;
    name: string;
    handleClick: (event: React.MouseEvent<HTMLElement>, rid: number) => void;
    showIcon?: boolean;
    active?: boolean;
    locale?: string;
}

export default function ResourceTag({className, rid, name, active, handleClick, locale, showIcon}: ResourceTagProps) {
    if (active === undefined) {
        active = true
    }

    const resource = resourceNamesMap.find(item => item.rid === rid);
    const pathname = usePathname();

    if (pathname.includes('search') || resource?.locale.map(locale => locale).includes(locale as string)) {
        return (<>
            <Suspense>
        <span
            onClick={(event) => handleClick(event, rid)}
            className={clsx('badge text-xl', className, {
                "bg-kremlin text-svoddWhite-300": rid == 1 && active,
                "bg-mid text-svoddWhite-300": rid == 2 && active,
                "bg-mil text-svoddWhite-300": rid == 3 && active,
                "bg-gray-200 text-gray-800 dark:bg-svoddGray-300 dark:text-svoddWhite-300": !active &&(rid == 1 || rid == 2 || rid == 3)
            })}>{name.toUpperCase()}
            {showIcon ? <XMarkIcon className="w-4 h-4" /> : null}
        </span>
            </Suspense>
        </>);
    }

    return null;
}