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
    const start = (ITEMS_PER_PAGE * (currentPage-1)) + 1;
    const next = (totalPages - currentPage) >= 1 ? ((start-1) + ITEMS_PER_PAGE) : (totalHits)

    return (
        <div className='text-sm mb-0'>{t('summary', {start: start, next: next, totalHits: totalHits} )}</div>
    );
}
