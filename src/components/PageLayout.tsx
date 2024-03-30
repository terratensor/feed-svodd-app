import {ReactNode} from 'react';

type Props = {
    children?: ReactNode;
};

export default function PageLayout({children}: Props) {

    return (
        <div className="mt-[50px]">
            <div className="mx-auto px-5">{children}</div>
        </div>
    );
}