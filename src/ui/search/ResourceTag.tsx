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