import Search from "@/ui/search";
import React from "react";
import {getLocale, getTranslations} from "next-intl/server";

type Props = {
    params: { locale: string };
};

export default async function Navigation() {
    const t = await getTranslations('IndexPage');
    const locale = await getLocale();

    return (
        <div
            className="search-panel fixed top-0 w-full p-3 z-40 flex flex-col gap-1 max-w-[1200px] inset-x-0 with mx-auto bg-svoddWhite-400 dark:bg-svoddBlack-400">
            <Search placeholder={t("SearchPlaceholder")} locale={locale}/>
            {/*<MainMenu/>*/}
        </div>
    );
}