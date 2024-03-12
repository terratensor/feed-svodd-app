import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import ExternalLink from './ExternalLink';

type Props = {
    children?: ReactNode;
    title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
    const t = useTranslations('PageLayout');

    return (
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl">{title}</h1>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
}