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
                should: [{}]
            },
        },
        limit: ITEMS_PER_PAGE,
        offset: 0,
        sort: [
            {
                created: {
                    order: "desc"
                }
            }
        ]
    };
}

function makeQuery(text: string, offset: number, rid: number, locale: string) {

    let query: QueryString = setInitialQuery()

    if (text.indexOf('@title') !== -1) {
        if (query.highlight) {
            query.highlight.fields = ["summary", "content"];
        }
    }

    if (text === "") {
        query.query.bool.should = [{equals: {language: locale}}];
    }
    console.log(rid)
    if (rid > 0) {
        query.query.bool.should = [{equals: {resource_id: rid}}]
    }

    query.query.query_string = text;
    query.offset = offset

    console.log("%", query.query.bool.should)
    return query;
}

export async function fetchFilteredEntries(locale: string, text: string, currentPage: number, rid: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const response = await fetch(`${getApiURL('/search')}`, {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, offset, rid, locale))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchFilteredEntriesPages(locale: string, text: string, rid: number) {
    noStore();

    const response = await fetch(`${getApiURL('/search')}`, {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, 0, rid, locale))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    let hits = await response.json();

    return Math.ceil(Number(hits["hits"] ? hits["hits"]["total"] : 0) / ITEMS_PER_PAGE)
}