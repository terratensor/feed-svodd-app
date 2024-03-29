import SvoddLogoIcon from "@/ui/icons/SvoddLogoIcon";
import React from "react";

export default function Footer() {
    return (
        <footer className="container mx-auto max-w-[1320px] xl:px-16 md:px-5 pt-6 pb-4">
            <div className='mx-auto px-4'>
                <div className='flex items-center text-center justify-between '>
                    <div className="flex items-center text-base/7 text-svoddBlack-100 dark:text-svoddWhite-200">
                        <SvoddLogoIcon
                            className=" h-[16px] w-[16px] -translate-y-[6%] mr-1"/>
                        СВОДД 24.02.2022 - {new Date().getFullYear()}</div>
                    <span>Язык</span>
                </div>
            </div>
        </footer>
    );
}