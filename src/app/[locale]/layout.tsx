import clsx from "clsx";
import {Inter} from 'next/font/google';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import React, {ReactNode} from 'react';
import {locales} from '@/config';
import {Providers} from "@/app/providers";
import Navigation from "@/components/Navigation";
import getURL from "@/utils/getURL";
import Footer from "@/ui/layout/footer";

const inter = Inter({subsets: ['latin']});

type Props = {
    children: ReactNode;
    params: { locale: string };
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
        <html className="dark 1h-full" lang={locale} suppressHydrationWarning>
        <body className={clsx(inter.className, `bg-svoddWhite-400 dark:bg-svoddBlack-200`)}>
        <Providers>
            <main className="flex h-full flex-col">
                <div className="container mx-auto lg:p-6 md:p-3 max-w-[1320px]">

                    <div className="mb-6 md:mb-0">
                        <Navigation/>
                        {children}
                    </div>

                </div>
            </main>
            <Footer/>
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
        metadataBase: new URL(process.env.PUBLIC_SITE_URL || 'https://feed.svodd.ru'),
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
        description: t('description'),
        openGraph: {
            type: 'website',
            url: new URL(process.env.PUBLIC_SITE_URL || 'http://feed.localhost'),
            images: [
                {
                    url: getURL('/opengraph-image.png'), // Must be an absolute URL
                    width: 1920,
                    height: 480,
                },
            ]
        },
        twitter: {
            images: [getURL('/opengraph-image.png')],
        }
    };
}