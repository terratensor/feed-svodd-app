import React, {forwardRef} from 'react'
import {Menu} from '@headlessui/react'
import Link from "next/link";
import {Bars3Icon} from "@heroicons/react/24/solid";

interface MyLinkProps {
    href: string;
    children: React.ReactNode;
}

const MyLink = React.forwardRef<HTMLAnchorElement, MyLinkProps>((props, ref) => {
    let {href, children, ...rest} = props
    return (
        (<Link href={href} ref={ref} {...rest}>
            {children}
        </Link>)
    );
})

let MyCustomButton = forwardRef<HTMLButtonElement>(function (props, ref) {
    return <button className="" ref={ref} {...props} />
})

MyLink.displayName = 'MyLink';
MyCustomButton.displayName = 'MyCustomButton'
export default function MyDropdown() {
    return (
        <Menu>
            <Menu.Button><Bars3Icon className='w-7 h-7 ml-2'/></Menu.Button>
            <Menu.Items>
                <Menu.Item>
                    {({active}) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Account settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Documentation
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item disabled>
                    <span className="opacity-75">Invite a friend (coming soon!)</span>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}