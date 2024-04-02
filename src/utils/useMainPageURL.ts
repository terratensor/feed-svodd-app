import {usePathname} from "next/navigation";
import {defaultLocale} from "@/config";

export default function useMainPageURL(locale: string, rids?: string[]) {

    const pathname = usePathname();

    const params = new URLSearchParams();
    rids && rids.map((rid) => {
        params.append('rid', rid);
    })
    params.delete('page')

    if (params.toString().length > 0) {
        return `/${locale}${params.toString()}`
    }
    if (locale === defaultLocale) {
        return '/';
    }
    return `/${locale}`;
}