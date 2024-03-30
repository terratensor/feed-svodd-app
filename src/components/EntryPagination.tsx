'use client'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {PaginationItem} from "@mui/material";
import Link from "next/link";


export default function EntryPagination({totalPages}: { totalPages: number }) {

    const [page, setPage] = React.useState(1);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {push} = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;

    if (totalPages <= 1) {
        return ''
    }
    const handleChange = (Event: React.ChangeEvent<unknown>, pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        setPage(pageNumber);
        params.set('page', pageNumber.toString());
        push(`${pathname}?${params.toString()}`);
    };

    const createPageURL = (pageNumber: number|string) => {
        const params = new URLSearchParams(searchParams);
        if (pageNumber === 1) {
            params.delete('page');
            return `${pathname}?${params.toString()}`;
        }
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className='flex flex-col mx-auto overflow-x-hidden'>
        <Stack spacing={0} className='svodd-pagination mt-5 overflow-x-hidden'>
            <Pagination
                size={"large"}
                siblingCount={0}
                boundaryCount={1}
                showLastButton={false}
                onChange={handleChange}
                page={currentPage}
                count={totalPages}
                variant="outlined"
                shape="rounded"
                // renderItem={(item) => (
                //     <PaginationItem
                //         className='dark:bg-svoddBlack-400 bg-svoddWhite-400'
                //         {...item}
                //     />
                // )}
                renderItem={(item) => (
                    <PaginationItem
                        className='dark:bg-svoddBlack-400 bg-svoddWhite-400'
                        component={Link}
                        href={createPageURL(item.page === null ? '' : item.page )}
                        {...item}
                    />
                )}
            />
        </Stack>
        </div>
    );
}