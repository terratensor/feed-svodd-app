import {unstable_noStore as noStore} from "next/cache";

let query = {
    index: "feed",
    highlight: {
        fields: [
            "title",
            "summary",
            "content"
        ],
        limit: 200,
        no_match_size: 0,
        // max_matches: 100,
        pre_tags: "<mark>",
        post_tags: "</mark>"
    },
    query: {
        // query_string: "Заявление Минобороны России",
        query_string: "",
        bool: {
            should: [
                {equals : { language: "ru" }},
            ],
        },
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

export async function fetchLatestEntries() {
    noStore();
    const response = await fetch('http://localhost:9308/search', {
        next: {revalidate: 10},
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(query)
    });
    if (!response.ok) {
        throw new Error("failed to fetch API data");
    }
    return response.json();
}