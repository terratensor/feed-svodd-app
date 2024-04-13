import Link from "next/link";
import getURL, {getLanguagePrefix} from "@/utils/getURL";
import {getLocale} from "next-intl/server";

export default async function EntryTitleUrl({title, url}: { title: string, url: string }) {
    const locale = await getLocale();
    const link = getURL(`${getLanguagePrefix(locale)}/entry?url=${url}`)
    return (
        <Link href={link} prefetch={true}>
            <h3 className="text-xl font-semibold pt-8 mb-2">{title}</h3>
        </Link>
    );
}