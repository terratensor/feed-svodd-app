import { MetadataRoute } from 'next'
import {fetchSitemap} from "@/lib/data";
import getURL from "@/utils/getURL";
import {showISOSDate} from "@/lib/utils";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const result = await fetchSitemap();
    const hits = result["hits"] ? result["hits"]["hits"] : [];

    return hits.map((hit: Hit, index: number ) => {
        const link = getURL(`/entry?url=${hit._source.url}`)
        return {
            url: link,
            lastModified: showISOSDate(hit._source.updated_at),
        }
    });
}