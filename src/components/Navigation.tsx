import Search from "@/ui/search";
import React from "react";
import {getTranslations} from "next-intl/server";

type Props = {
    params: { locale: string };
};

export default async function Navigation() {
    const t = await getTranslations('IndexPage');
    return (
        <div
            className="fixed top-0 w-full p-3 z-40 flex items-center
                justify-between gap-2 max-w-[1200px] inset-x-0 with mx-auto bg-svoddWhite-400 dark:bg-svoddBlack-400">
            <Search placeholder={t("SearchPlaceholder")}/>
            {/*<MainMenu/>*/}
        </div>
    );
}