'use server'
/** app/sitemap.xml/route.ts **/
import {fetchSitemap} from "@/lib/data";
import getURL from "@/utils/getURL";
import {showISOSDate} from "@/lib/utils";
import {defaultLocale} from "@/config";

// dynamically generate sitemap xml data
async function getSitemap() {
    const result = await fetchSitemap();
    const hits = result["hits"] ? result["hits"]["hits"] : [];

    function getLanguage(language: string) {
        if (language !== defaultLocale) {
            return `/${language}`;
        }
        return '';
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${hits
        .map(
            (hit: Hit) => `
            <url>
              <loc>${getURL(`${getLanguage(hit._source.language)}/entry?url=${hit._source.url}`)}</loc>
              <lastmod>${showISOSDate(hit._source.updated_at)}</lastmod>
            </url>
          `,
        )
        .join('')}
    </urlset>
  `;
}

export async function GET()  {
    return new Response(await getSitemap(), {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
}
