import {getTranslations} from "next-intl/server";

const sources = [
    {site: 'kremlin.ru', title: 'kremlin'},
    {site: 'mid.ru', title: 'mid'},
    {site: 'mil.ru', title: 'mil'}
]
export default async function EntrySourceUrl({url}: { url: string }) {

    const t = await getTranslations('EntrySourceUrl')

    const sr = sources.map((source) => {
        if (url.toLowerCase().indexOf(source.site) >= 0) {
            return t(source.title)
        }
        return ''
    })

    return <a className="text-svoddRed-100" href={url} target="_blank">{sr}</a>
}