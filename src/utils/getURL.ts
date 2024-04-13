// utils/getURL.ts
import {defaultLocale} from "@/config";

const IS_SERVER = typeof window === "undefined";
export default function getURL(path: string) {
    const baseURL = IS_SERVER
        ? process.env.PUBLIC_SITE_URL!
        : window.location.origin;
    return new URL(path, baseURL).toString();
}

export function getLanguagePrefix(locale: string) {
    return locale !== defaultLocale ? `/${locale}` : ""
}
