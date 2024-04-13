import he from 'he';
export function strippedHtml(html: string) {
    const regex = /(<([^>]+)>)/ig;
    return html.replace(regex, '');
}

export function stripNbsp(html: string) {
    const unescapedString: string = he.decode(html);
    return unescapedString.replace(/&nbsp;/g, ' ');
}

export function ucFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}