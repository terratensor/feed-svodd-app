import {ReactNode} from 'react';

type Props = {
    children?: ReactNode;
};

export default function PageLayout({children}: Props) {

    return (
        <div className="mt-[55px]">
            <div className="mx-auto">{children}</div>
        </div>
    );
}