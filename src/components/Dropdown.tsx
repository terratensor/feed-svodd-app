import {Menu, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'
import {Bars3Icon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {
    ForwardToInboxOutlined,
    LibraryBooksOutlined,
    QuestionAnswer,
    Telegram
} from "@mui/icons-material";
import Link from "next/link";

export default function Dropdown() {
    return (
        <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="inline-flex w-full justify-center py-2 px-2 text-sm font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-white/75">
                        <Bars3Icon className='w-7 h-7' aria-hidden="true"/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute sm:right-0 -right-3 mt-2 w-80 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md
                        dark:bg-svoddBlack-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                            <div className='group flex w-full items-center rounded-md px-2 py-2 text-sm
                            dark:bg-svoddBlack-100 dark:text-svoddWhite-300 cursor-default'>
                                <MagnifyingGlassIcon
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                Источники концептуального поиска
                            </div>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://svodd.ru')}
                                    >
                                        {active ? (
                                            <QuestionAnswer
                                                className="mr-2 h-5 w-5 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <QuestionAnswer
                                                className="mr-2 h-5 w-5 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://svodd.ru'>
                                            Вопросы и комментарии на ФКТ
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://kob.svodd.ru')}
                                    >
                                        {active ? (
                                            <LibraryBooksOutlined
                                                className="mr-2 h-5 w-5 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <LibraryBooksOutlined
                                                className="mr-2 h-5 w-5 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://kob.svodd.ru'>
                                            Тексты толстых книг ВП СССР
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://lib.svodd.ru')}
                                    >
                                        {active ? (
                                            <LibraryBooksOutlined
                                                className="mr-2 h-5 w-5 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <LibraryBooksOutlined
                                                className="mr-2 h-5 w-5 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://lib.svodd.ru'>
                                            Военно-историческая библиотека
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://svodd.ru/bolshaya-svoddnaya-tema?sort=-date')}
                                    >
                                        {active ? (
                                            <ChatBubbleLeftRightIcon
                                                className="mr-2 h-6 w-6 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ChatBubbleLeftRightIcon
                                                className="mr-2 h-6 w-6 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://svodd.ru/bolshaya-svoddnaya-tema?sort=-date'>
                                            Соборное обсуждение
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://t.me/svoddru')}
                                    >
                                        {active ? (
                                            <Telegram
                                                className="mr-2 h-5 w-5 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Telegram
                                                className="mr-2 h-5 w-5 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://t.me/svoddru'>
                                            @svoddru
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={`${
                                            active ? 'dark:bg-svoddRed-900 bg-svoddRed-1000 text-white' : 'text-gray-900 dark:text-svoddWhite-300'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => window.open('https://svodd.ru/contact')}
                                    >
                                        {active ? (
                                            <ForwardToInboxOutlined
                                                className="mr-2 h-5 w-5 dark:text-red-200"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ForwardToInboxOutlined
                                                className="mr-2 h-5 w-5 text-svoddRed-100"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <Link href='https://svodd.ru/contact'>
                                            Обратная связь
                                        </Link>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
