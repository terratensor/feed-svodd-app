const sources = [
    {site: 'kremlin.ru', title: 'Президент России'},
    {site: 'mid.ru', title: 'Министерство иностранных дел Российской Федерации'},
    {site: 'mil.ru', title: 'Министерство обороны Российской Федерации'}
]
export default function EntrySourceUrl({url}: { url: string }) {

    const sr = sources.map((source) => {
        if (url.toLowerCase().indexOf(source.site) >= 0) {
            return source.title
        }
        return ''
    })

    return <a className="text-svoddRed" href={url} target="_blank">{sr}</a>
}