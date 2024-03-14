import {unstable_noStore as noStore} from "next/cache";
import getApiURL from "@/utils/getApiURL";

const ITEMS_PER_PAGE = 20;

function setInitialQuery(): QueryString {
    return {
        index: "feed",
        highlight: {
            fields: ["title", "summary", "content"],
            limit: 0,
            no_match_size: 0,
            // max_matches: 0,
            pre_tags: "<mark>",
            post_tags: "</mark>"
        },
        query: {
            query_string: "",
            bool: {
                should: [{equals: {language: "ru"}}]
            }
        },
        limit: 20,
        offset: 0,
        sort: [
            {
                created: {
                    order: "desc"
                }
            }
        ]
    }
}

function makeQuery(text: string, offset: number) {

    let query: QueryString = setInitialQuery()

    if (text.indexOf('@title') !== -1) {
        if (query.highlight) {
            query.highlight.fields = ["summary", "content"];
        }
    }

    query.query.query_string = text;
    query.offset = offset

    return query;
}

export async function fetchLatestEntries() {
    noStore();
    const response = await fetch(`${getApiURL('/search')}`, {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(setInitialQuery())
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchFilteredEntries(text: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const response = await fetch(`${getApiURL('/search')}`, {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, offset))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchFilteredEntriesPages(text: string) {
    noStore();

    const response = await fetch(`${getApiURL('/search')}`, {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, 0))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    let hits = await response.json();

    return Math.ceil(Number(hits["hits"] ? hits["hits"]["total"] : 0) / ITEMS_PER_PAGE)
}