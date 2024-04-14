import {ITEMS_PER_PAGE} from "@/lib/data";
import {useTranslations} from "next-intl";

type Props = {
    totalHits: number,
    currentPage: number
};
export default function SearchSummary(
    {totalHits, currentPage}: Props
) {
    const t = useTranslations('SearchSummary');

    const totalPages =  Math.ceil( totalHits / ITEMS_PER_PAGE);
    const start = totalPages ? (ITEMS_PER_PAGE * (currentPage-1)) + 1 : 0;
    const next = (totalPages - currentPage) >= 1 ? ((start-1) + ITEMS_PER_PAGE) : (totalHits)

    return (
        <div className='search-summary text-sm py-3 mb-0 pl-3 sm:pl-0'>{
            totalPages ? t('summary', {start: start, next: next, totalHits: totalHits} ) : t('notFound')
        }</div>
    );
}
