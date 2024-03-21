import {usePathname} from "next/navigation";

export default function useMainPageURL(rids: string[]) {

    const pathname = usePathname();

    const params = new URLSearchParams();
    rids && rids.map((rid) => {
        params.append('rid', rid);
    })
    params.delete('page')
    return `${pathname}?${params.toString()}`;
}