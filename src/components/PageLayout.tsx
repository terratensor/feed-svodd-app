import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

type Props = {
    children?: ReactNode;
    title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
    const t = useTranslations('PageLayout');

    return (
        <div className="flex-grow md:overflow-y-auto">
            <div className="w-full">
                <div className="mx-auto px-2">{children}</div>
            </div>
        </div>
    );
}