import {showISOSDate} from "@/lib/utils";
import Script from "next/script";
import {getTranslations} from "next-intl/server";
import getEntryAuthor from "@/utils/resources";

export default async function EntryJsonLD({entry}: {entry: Source}) {

    const t = await getTranslations('EntrySourceUrl')
    const author = await getEntryAuthor(entry)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: entry.title,
        description: entry.content,
        url: entry.url,
        datePublished: showISOSDate(entry.published),
        dateModified: showISOSDate(entry.updated_at),
        author: {
            '@type': 'Organization',
            name: author
        }
    }

    return (
        <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
    );
}