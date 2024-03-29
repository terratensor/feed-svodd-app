import Link from "next/link";
import getURL from "@/utils/getURL";

export default function EntryTitleUrl({title, url}: { title: string, url: string }) {
    const link = getURL(`entry?url=${url}`)
    return (
        <Link href={link} prefetch={true}>
            <h3 className="text-xl font-semibold pt-8 mb-2">{title}</h3>
        </Link>
    );
}