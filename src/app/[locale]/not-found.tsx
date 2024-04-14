import {useTranslations} from 'next-intl';
import PageLayout from "@/components/PageLayout";


// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
    const t = useTranslations('NotFoundPage');

    return (
        <PageLayout>
            <div className='flex flex-col max-w-6xl mx-auto my-6 space-y-16'>
                <div className='mt-10'>
                    <p className="max-w-[460px]">{t('description')}</p>
                </div>
            </div>
        </PageLayout>
    );
}