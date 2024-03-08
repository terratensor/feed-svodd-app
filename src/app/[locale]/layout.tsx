import clsx from "clsx";
import {Inter} from 'next/font/google';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import React, {ReactNode} from 'react';
import {locales} from '@/config';

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
        <html className="h-full" lang={locale}>
        <body className={clsx(inter.className, 'flex h-full flex-col')}>
        {/*<Navigation />*/}
        {children}
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
                'en': '/en',
                'ru': '/ru',
            },
        },
        title: t('title'),
        description: 'The official Next.js Course Dashboard, built with App Router.',
        metadataBase: new URL('https://feed.svodd.ru'),
    };
}