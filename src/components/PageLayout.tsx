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
            <div className="w-full mt-[70px]">
                <div className="mx-auto px-5">{children}</div>
            </div>
        </div>
    );
}