import {Suspense} from "react";
import clsx from "clsx";
import {className} from "postcss-selector-parser";
import * as React from "react";

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
export default function ResourceTag({rid, handleClick}: { rid: number, handleClick: (event: React.MouseEvent<HTMLElement>, rid: number) => void }) { // rid: number}: { rid: number }) {
    return (<>
        <Suspense>
        <span
            onClick={(event) => handleClick(event, rid)}
            className={clsx('badge text-svoddWhite-300 text-xl', className, {
                "bg-kremlin": rid == 1,
                "bg-mid": rid == 2,
                "bg-mil": rid == 3,
            })}>{getTagName(rid)}</span>
        </Suspense>
    </>);
}