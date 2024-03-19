'use client'
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Scroll() {
    // when clicking a link, user will not scroll to the top of the page if the header is sticky.
    // their current scroll position will persist to the next page.
    // this useEffect is a workaround to 'fix' that behavior.

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.get('page')

    useEffect(() => {
        console.log(window.innerHeight)
        window.scrollTo({ top: 100, behavior: 'smooth' });
        console.log('scroll')
    }, [search]);
    return <></>;
}
