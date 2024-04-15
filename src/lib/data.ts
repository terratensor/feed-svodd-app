import {unstable_noStore as noStore} from "next/cache";
import getApiURL from "@/utils/getApiURL";
import {number} from "prop-types";
import getIndexName from "@/utils/getIndexName";

export const ITEMS_PER_PAGE = 20;
export const MAX_OFFSET = 10000;

const index = getIndexName();

function setInitialQuery(): QueryString {
    return {
        index: index,
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

function makeIndexQuery(offset: number, rids: number[], locale: string) {

    let query: QueryString = setInitialQuery()

    query.query.bool.must.push({equals: {chunk: 1}})
    query.query.bool.must.push({equals: {language: locale}});
    if (rids && rids.length > 0) {
        query.query.bool.must.push({in: {resource_id: rids}})
    }

    query.sort = [
        {
            published: "desc"
        },
        {
            created: "desc"
        }
    ];

    query.offset = offset

    if (offset >= 1000 && offset < MAX_OFFSET) {
        query.max_matches = offset + ITEMS_PER_PAGE
    }

    return query;
}

function getSortOrder(sortBy: string | undefined) {
    switch (sortBy) {
        case "date":
            return [{published: "desc"}, {created: "desc"}];
        case "-date":
            return [{published: "asc"}, {created: "asc"}];
        default:
            return [];
    }
}

function makeQuery(text: string, offset: number, rids: number[], locale: string, sort?: string) {

    let query: QueryString = setInitialQuery()

    if (text.indexOf('@title') !== -1) {
        if (query.highlight) {
            query.highlight.fields = ["summary", "content"];
        }
    }

    // Условия для отображения записей на главной.
    // TODO разделить запросы
    if (text === "") {
        query.query.bool.must.push({equals: {language: locale}});
        query.sort = [{published: "desc"}, {created: "desc"}]
    } else {
        query.sort = getSortOrder(sort);
    }

    if (rids && rids.length > 0) {
        query.query.bool.must.push({in: {resource_id: rids}})
    }

    query.query.query_string = text;
    query.offset = offset

    if (offset >= 1000 && offset < MAX_OFFSET) {
        query.max_matches = offset + ITEMS_PER_PAGE
    }

    return query;
}

function getEntryQuery(url: string) {
    let query: QueryString = setInitialQuery()
    query.query.bool.must.push({equals: {url: url}})
    query.sort= [
        { chunk: "asc"  },
    ];
    query.limit = 1000;
    return query;
}

export async function fetchEntries(locale: string, currentPage: number, rids: number[]) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 60},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeIndexQuery(offset, rids, locale))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}
export async function fetchFilteredEntries(locale: string, text: string, currentPage: number, rids: number[], sort: string) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 60},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeQuery(text, offset, rids, locale, sort))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchFilteredEntriesTotalHits(locale: string, text: string, rids: number[]) {
    noStore();

    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 60},
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

    return Math.ceil(Number(hits["hits"] ? hits["hits"]["total"] : 0))
}

export async function fetchEntry(url: string) {
    noStore();
    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 60},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(getEntryQuery(url))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

export async function fetchSitemap() {
    const response = await fetch(`${getApiURL('/search')}`, {
        // next: {revalidate: 60},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(makeSitemapQuery(1000))
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}

function makeSitemapQuery(limit: number) {
    let query: QueryString = setInitialQuery()
    query.max_matches = limit;
    query.query.bool.must.push({equals: {chunk: 1}});
    query.sort = [{published: "desc"}, {created: "desc"}];
    query.limit = limit;
    return query;
}