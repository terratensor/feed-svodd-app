import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import LatestEntries from "@/ui/main/latest-entries";
import Search from "@/ui/search";
import Pagination from "@/ui/search/pagination";
import {fetchFilteredEntriesPages} from "@/lib/data";


type Props = {
    params: { locale: string };
    searchParams?: {
        query?: string;
        page?: string;
    }
};

export default async function Page({params: {locale}, searchParams}: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = await getTranslations('IndexPage');

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchFilteredEntriesPages(query)

    return (
        <PageLayout title={t('title')}>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-6xl mx-auto">
                <Search placeholder="Поиск по kremlin.ru | mid.ru | mil.ru …"/>
            </div>
            <div className="flex flex-col max-w-6xl mx-auto my-5">
                <LatestEntries query={query}  currentPage={currentPage} />
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </PageLayout>
    );
}