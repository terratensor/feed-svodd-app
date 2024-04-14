import {getTranslations} from "next-intl/server";

export const sources = [
    {rid: 1, site: 'kremlin.ru', title: 'kremlin'},
    {rid: 2, site: 'mid.ru', title: 'mid'},
    {rid: 3, site: 'mil.ru', title: 'mil'}
]

export default async function getEntryAuthor(entry: Source) {
    const translations = await getTranslations('EntrySourceUrl');
    const resourceId = entry.resource_id;

    switch (resourceId) {
        case 1:
            return entry.author || translations('kremlin');
        case 2:
            return entry.author || translations('mid');
        case 3:
            return entry.author || translations('mil');
        default:
            return entry.author || translations('defaultTranslation');
    }
}