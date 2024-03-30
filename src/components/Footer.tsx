import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default async function Footer() {
    return (
        <footer className="container mt-auto mx-auto max-w-[1320px] xl:px-16 md:px-5 pb-4">
            <div className='mx-auto px-4'>
                <div className='flex items-center text-center justify-between '>
                    <div
                        className="flex items-center sm:text-base/7 text-sm text-svoddBlack-100 dark:text-svoddWhite-200">
                        <SvoddLogoIcon
                            className=" h-[16px] w-[16px] -translate-y-[6%] mr-1"/>
                        СВОДД 24.02.2022 - {new Date().getFullYear()}
                    </div>
                    <div>
                        <LocaleSwitcher />
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </footer>
    );
}