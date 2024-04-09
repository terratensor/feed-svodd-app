import {Suspense} from "react";
import clsx from "clsx";
import * as React from "react";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface ResourceTagProps {
    className?: string;
    rid: number;
    name: string;
    handleClick: (event: React.MouseEvent<HTMLElement>, rid: number) => void;
    showIcon?: boolean;
    active?: boolean;
}

export default function ResourceTag({className, rid, name, active, handleClick, showIcon}: ResourceTagProps) {
    if (active === undefined) {
        active = true
    }
    return (<>
        <Suspense>
        <span
            onClick={(event) => handleClick(event, rid)}
            className={clsx('badge text-svoddWhite-300 text-xl', className, {
                "bg-kremlin": rid == 1 && active,
                "bg-mid": rid == 2 && active,
                "bg-mil": rid == 3 && active,
                "dark:bg-svoddGray-300 dark:text-svoddWhite-300 bg-gray-200 text-gray-700": !active &&(rid == 1 || rid == 2 || rid == 3)
            })}>{name.toUpperCase()}
            {showIcon ? <XMarkIcon className="w-4 h-4" /> : null}
        </span>
        </Suspense>
    </>);
}