import clsx from "clsx";
import {Inter} from 'next/font/google';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import React, {ReactNode} from 'react';
import {locales} from '@/config';
import {Providers} from "@/app/providers";
import Navigation from "@/components/Navigation";

const inter = Inter({subsets: ['latin']});

type Props = {
    children: ReactNode;
    params: {locale: string};
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}
export default function LocaleLayout({
    children,
    params: {locale}
}: Readonly<{
    children: React.ReactNode,
    params: { locale: string }
}>) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    return (
        <html className="dark h-full" lang={locale} suppressHydrationWarning>
        <body className={clsx(inter.className, `bg-svoddWhite-400 dark:bg-svoddBlack-200`)}>
        <Providers>
            <main className="flex h-full flex-col">
                <Navigation />
                {children}
            </main>
        </Providers>
        </body>
        </html>
    );
}

export async function generateMetadata({
                                           params: {locale}
                                       }: Omit<Props, 'children'>) {
    const t = await getTranslations({locale, namespace: 'LocaleLayout'});

    return {
        alternates: {
            canonical: '/',
            languages: {
                'ru': '/ru',
                'en': '/en',
                'de': '/de',
                'fr': '/fr',
                'es': '/es',
                'pt': '/pt',
            },
        },
        title: t('title'),
        description: 'Поиск по сайтам Президента России, Министерства иностранных дел Российской Федерации, Министерство обороны Российской Федерации',
        metadataBase: new URL('https://feed.svodd.ru'),
    };
}