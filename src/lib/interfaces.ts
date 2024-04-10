interface Hit {
    _id: string,
    _source: Source
    highlight: Highlight
}

interface Source {
    title: string;
    summary: string;
    content: string;
    resource_id: number;
    chunk: number;
    published: number;
    updated: number;
    created: number;
    updated_at: number;
    language: string;
    url: string;
    author: string;
    number: string;
}

interface Highlight {
    title: string;
    summary: string;
    content: string;
    url: string;
}

interface HighlightFields {
    fields: string[];
    limit: number;
    no_match_size: number;
    pre_tags: string;
    post_tags: string;
}

interface QueryString {
    index: string;
    highlight?: HighlightFields;
    query: {
        query_string: string;
        bool: {
            must: {}[];
        };
    };
    limit: number;
    offset: number;
    max_matches?: number;
    sort?: {}[];
}