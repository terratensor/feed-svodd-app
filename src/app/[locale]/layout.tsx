import clsx from "clsx";
import {Inter} from 'next/font/google';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import React, {ReactNode} from 'react';
import {locales} from '@/config';
import {Providers} from "@/app/providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Script from "next/script";


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
        <body className={clsx(inter.className, `flex h-full flex-col bg-svoddWhite-400 dark:bg-svoddBlack-200`)}>
        <Script id={"yandex-metrika"} strategy={"afterInteractive"}>
            {
                `<!-- Yandex.Metrika counter --> <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(96981294, "init", { defer: true, clickmap:true, trackLinks:true, accurateTrackBounce:true }); </script> <noscript><div><img src="https://mc.yandex.ru/watch/96981294" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->`
            }
        </Script>
        <Providers>
            <main>
                <div className="container mx-auto lg:p-6 p-3 max-w-[1320px]">
                    <div className="mb-3 md:mb-0">
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
        }
    };
}