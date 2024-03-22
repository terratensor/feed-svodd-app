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
            pre_tags: "<mark>",
            post_tags: "</mark>",
        },
        query: {
            query_string: "",
            bool: {
                must: []
            },
        },
        limit: ITEMS_PER_PAGE,
        offset: 0,
    };
}

function makeQuery(text: string, offset: number, rids: number[], locale: string) {

    let query: QueryString = setInitialQuery()

    if (text.indexOf('@title') !== -1) {
        if (query.highlight) {
            query.highlight.fields = ["summary", "content"];
        }
        query.sort = [
            {
                published: "desc"
            },
            {
                created: "desc"
            }
        ]
    }

    if (text === "") {
        query.query.bool.must.push({equals: {language: locale}});
        query.sort = [
            {
                published: "desc"
            },
            {
                created: "desc"
            }
        ]
    }

    if (rids && rids.length > 0) {
        query.query.bool.must.push({in: {resource_id: rids}})
    }

    query.query.query_string = text;
    query.offset = offset

    if (offset >= 1000) {
        query.max_matches = offset + ITEMS_PER_PAGE
    }

    return query;
}

export async function fetchFilteredEntries(locale: string, text: string, currentPage: number, rids: number[]) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${getApiURL('/search')}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, offset, rids, locale))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchFilteredEntriesPages(locale: string, text: string, rids: number[]) {
    noStore();

    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, 0, rids, locale))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    let hits = await response.json();

    return Math.ceil(Number(hits["hits"] ? hits["hits"]["total"] : 0) / ITEMS_PER_PAGE)
}