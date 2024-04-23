import {usePathname} from "next/navigation";
import {defaultLocale} from "@/config";
import storage from "@/lib/localStorage";
import {getLanguagePrefix} from "@/utils/getURL";
import {resourceNamesMap} from "@/lib/utils";

export default function useMainPageURL(locale: string, rid?: string | undefined) {

    const pathname = usePathname();
    const resource = resourceNamesMap.find(item => item.rid === Number(rid));

    const params = new URLSearchParams();

    if (resource?.locale.map(locale => locale).includes(locale as string)) {
        if (!rid && storage.get('rid')) {
            params.append('rid', storage.get('rid'));
        } else {
            params.append('rid', rid as string);
        }
        params.delete('page')
    }

    if (params.toString().length > 0) {
        return `${getLanguagePrefix(locale)}/?${params.toString()}`
    }

    return locale === defaultLocale ? '/' : `/${locale}`;
}