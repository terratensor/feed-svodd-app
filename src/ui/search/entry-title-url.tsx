import Link from "next/link";
import getURL from "@/utils/getURL";

export default function EntryTitleUrl({title}: { title: string }) {
    const link = getURL(`?query=@title ${title}`)
    return (
        <Link href={link} prefetch={true}>
            <h3 className="text-xl font-semibold pt-8 mb-2">{title}</h3>
        </Link>
    );
}