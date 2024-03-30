import {Suspense} from "react";
import clsx from "clsx";
import * as React from "react";
import {XMarkIcon} from "@heroicons/react/16/solid";

function getTagName(resource_id: number) {
    switch (resource_id) {
        case 1:
            return "КРЕМЛЬ"
        case 2:
            return "МИД"
        case 3:
            return "МИНОБОРОНЫ"
        default:
            return "не определено"
    }
}

interface ResourceTagProps {
    className?: string;
    rid: number;
    handleClick: (event: React.MouseEvent<HTMLElement>, rid: number) => void;
    showIcon?: boolean;
}

export default function ResourceTag({className, rid, handleClick, showIcon}: ResourceTagProps) {
    return (<>
        <Suspense>
        <span
            onClick={(event) => handleClick(event, rid)}
            className={clsx('badge text-svoddWhite-300 text-xl', className, {
                "bg-kremlin": rid == 1,
                "bg-mid": rid == 2,
                "bg-mil": rid == 3,
            })}>{getTagName(rid)}
            {showIcon ? <XMarkIcon className="w-4 h-4" /> : null}
        </span>
        </Suspense>
    </>);
}