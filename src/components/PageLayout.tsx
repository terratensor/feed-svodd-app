import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

type Props = {
    children?: ReactNode;
    title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
    const t = useTranslations('PageLayout');

    return (
        <div className="mt-[50px]">
            <div className="mx-auto px-5">{children}</div>
        </div>
    );
}