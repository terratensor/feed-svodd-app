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
        <>
            <Search placeholder={t("SearchPlaceholder")} locale={locale}/>
        </>
    );
}