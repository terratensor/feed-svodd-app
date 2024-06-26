'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/lib/utils';
import {usePathname, useSearchParams} from "next/navigation";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/16/solid";
import React, {useEffect, useRef, useState} from "react";
import {ITEMS_PER_PAGE, MAX_OFFSET} from "@/lib/data";

export default function Pagination({ totalPages }: { totalPages: number }) {

    // NOTE: comment in this code when you get to this point in the course
    const lastPageLimit = MAX_OFFSET / ITEMS_PER_PAGE;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const getTotalPages = () => totalPages < lastPageLimit ? totalPages : lastPageLimit

    const allPages = generatePagination(currentPage, getTotalPages());

    const createPageURL = (pageNumber: number|string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return ''
    }

    return (
        <>
            <div className="pagination flex w-full justify-center sticky bottom-0">
                <nav className="flex justify-center detachable">
                    <div className='inline-flex'>
                    <PaginationNumber
                        href={createPageURL(1)}
                        page={1}
                        position={"first"}
                        isActive={false}
                        isDisabled={currentPage === 1}
                    />
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1 || (currentPage > (getTotalPages() - 1) && getTotalPages() < currentPage - 1)}
                    />

                    <div className="flex -space-x-px">
                        {allPages.map((page, index) => {
                            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                            if (index === 0) position = 'single';
                            if (index === allPages.length - 1) position = 'single';
                            if (allPages.length === 1) position = 'single';
                            // if (page === '...') position = 'middle';

                            return (
                                <PaginationNumber
                                    key={index}
                                    href={createPageURL(page)}
                                    page={page}
                                    position={position}
                                    isDisabled={currentPage > (getTotalPages() - 1) && getTotalPages() <= page - 1 }
                                    isActive={currentPage === page}
                                />
                            );
                        })}
                    </div>

                    <PaginationArrow
                        direction="right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= getTotalPages()}
                    />
                    <PaginationNumber
                        href={createPageURL(getTotalPages())}
                        page={getTotalPages()}
                        position={"last"}
                        isActive={false}
                        isDisabled={currentPage === getTotalPages()}
                    />
                    </div>
                </nav>
            </div>
        </>
);
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  isDisabled
}: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex items-center justify-center text-sm border px-3 min-w-10 h-10 text-svoddRed-400 dark:text-svoddRed-200 dark:border-svoddGray-300 border-pageLight-border',
        {
            'rounded-l-md': position === 'first', // || position === 'single',
            'rounded-r-md': position === 'last', // || position === 'single',
            'z-10 dark:text-svoddWhite-200 !text-white dark:border-svoddRed-700 border-svoddRed-900 dark:bg-svoddRed-500 bg-svoddRed-800': isActive,
            'dark:hover:bg-svoddGray-600 hover:bg-svoddWhite-100 dark:bg-svoddBlack-200 bg-svoddWhite-400': !isActive && position !== 'middle' && !isDisabled,
            'text-gray-300 rounded-md': position === 'middle',
            'disabled !dark:border-svoddGray-300 dark:bg-svoddGray-500 bg-svoddWhite-100': isDisabled,
        },
    );

    return isActive || position === 'middle' || isDisabled ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
        {page}
        </Link>
);
}

function PaginationArrow({
 href,
 direction,
 isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-svoddRed-400 dark:text-svoddRed-300 border-t border-b dark:border-svoddGray-300 border-pageLight-border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:dark:bg-svoddGray-600': !isDisabled,
            'mr-0 md:mr-0 dark:bg-svoddBlack-200 bg-svoddWhite-400': direction === 'left',
            'ml-0 md:ml-0 dark:bg-svoddBlack-200 bg-svoddWhite-400': direction === 'right',
        },
    );

    const icon =
        direction === 'left' ? (
            <ChevronDoubleLeftIcon className="w-4" />
        ) : (
            <ChevronDoubleRightIcon className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
        {icon}
        </Link>
);
}
