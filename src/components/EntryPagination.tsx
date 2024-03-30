'use client'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {PaginationItem} from "@mui/material";

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

    return (
        <div className='flex flex-col mx-auto overflow-x-hidden'>
        <Stack spacing={2} className='svodd-pagination mt-5 overflow-x-hidden'>
            <Pagination
                siblingCount={0}
                boundaryCount={1}
                page={currentPage}
                onChange={handleChange}
                count={totalPages}
                variant="outlined"
                shape="rounded"
                renderItem={(item) => (
                    <PaginationItem
                        className='dark:bg-svoddBlack-400 bg-svoddWhite-400'
                        {...item}
                    />
                )}
            />
        </Stack>
        </div>
    );
}