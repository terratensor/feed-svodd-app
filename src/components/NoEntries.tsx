import PageLayout from "@/components/PageLayout";
import * as React from "react";
import {useTranslations} from "next-intl";

export default function NoEntries() {
    const t = useTranslations('SearchSummary');
    return (
        <PageLayout>
            <div
                className={`flex flex-col max-w-6xl mx-auto my-6 space-y-16 text-svoddBlack-100 dark:text-svoddWhite-200`}
            >
                <div className="mt-10">{t('noEntries')}</div>
            </div>
        </PageLayout>
    );
}