interface Hit {
    _id: string,
    _source: Source
    highlight: Highlight
}

interface Source {
    title: string;
    summary: string;
    content: string;
    url: string;
    published: number;
}

interface Highlight {
    title: string;
    summary: string;
    content: string;
    url: string;
}
