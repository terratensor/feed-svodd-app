import clsx from "clsx";
import {Inter} from 'next/font/google';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import React, {ReactNode} from 'react';
import {locales} from '@/config';
import {Providers} from "@/app/providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import YandexMetrika from "@/components/YandexMetrika";
import { GoogleAnalytics } from '@next/third-parties/google'
import {getAlternatesMetadata} from "@/lib/utils";


const inter = Inter({subsets: ['latin']});

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
 children,
 params: {locale}
}: Readonly<{
    children: React.ReactNode,
    params: { locale: string }
}>) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    return (
        <html className="dark h-full" lang={locale}>
        <body className={clsx(inter.className)}>
        <YandexMetrika />
        <Providers>
            <main>
                <div className="container mx-auto max-w-[1320px]">
                    <div className="mb-3 md:mb-0">
                        <Navigation/>
                        {children}
                    </div>
                </div>
            </main>
            <Footer/>
        </Providers>
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-ZXB6SWHW8E" />}
        </body>
        </html>
    );
}

export async function generateMetadata({
   params: {locale}
}: Omit<Props, 'children'>) {

    const t = await getTranslations({locale, namespace: 'LocaleLayout'});

    return {
        metadataBase: new URL(process.env.PUBLIC_SITE_URL || 'https://feed.svodd.ru'),
        alternates: await getAlternatesMetadata({locale}),
        title: t('title'),
        description: t('description'),
        openGraph: {
            url: new URL(process.env.PUBLIC_SITE_URL || 'http://feed.localhost'),
            images: [
                {
                    url: '/opengraph-image.png', // Must be an absolute URL
                    width: 1920,
                    height: 480,
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            images: ['/opengraph-image.png'],
        },
    };
}