import {usePathname} from "next/navigation";
import {defaultLocale} from "@/config";
import storage from "@/lib/localStorage";
import {getLanguagePrefix} from "@/utils/getURL";

export default function useMainPageURL(locale: string, rids?: string[]) {

    const pathname = usePathname();

    const params = new URLSearchParams();

    if (!rids && storage.get('rid')) {
        params.append('rid', storage.get('rid'));
    } else {
        rids && rids.map((rid) => {
            params.append('rid', rid);
        })
    }
    params.delete('page')

    if (params.toString().length > 0) {
        return `${getLanguagePrefix(locale)}/?${params.toString()}`
    }
    if (locale === defaultLocale) {
        return '/';
    }
    return `/${locale}`;
}