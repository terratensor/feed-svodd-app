import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import {useTranslations} from "next-intl";

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="footer">
            <div className='mx-auto px-4'>
                <div className='flex items-center text-center justify-between '>
                    <div
                        className="flex items-center text-sm text-svoddBlack-100 dark:text-svoddWhite-200">
                        <SvoddLogoIcon
                            className=" h-[16px] w-[16px] -translate-y-[6%] mr-1"/>
                        СВОДД 24.02.2022 - {new Date().getFullYear()}
                    </div>
                    <div>
                        <LocaleSwitcher label={t('localeSwitcher.label')}/>
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </footer>
    );
}