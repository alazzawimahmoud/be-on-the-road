import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3BottomLeftIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { BoltIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../utilities/api';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Container({ header, children }) {
    const router = useRouter();
    const userId = router.query.userId;
    const [categories, setCategories] = useState([])
    const [showSidebar, setShowSidebar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const hrefWithQueryParams = (href) => {
        const userId = router.query.userId;
        if (userId) {
            return `${href}?userId=${userId}`
        }
        return href;
    }
    
    useEffect(() => {
        api.getCategories().then(categories => {
            setCategories(categories.data);
        })
    }, [])

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-indigo-700">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 pt-2 -mr-12">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex items-center flex-shrink-0 px-4">
                                        <BoltIcon className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-300" />
                                        <div className="text-lg font-semibold text-white">BE on the Road</div>
                                    </div>
                                    <div className="flex-1 h-0 mt-5 overflow-y-auto">
                                        <nav className="px-2 space-y-1">
                                            {categories.map((item) => (
                                                <Link key={item.title} href={hrefWithQueryParams(item.path)}>
                                                    <a
                                                        key={item.seriesId}
                                                        className={classNames(
                                                            item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                        )}
                                                    >
                                                        <ChevronRightIcon className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-300" aria-hidden="true" />
                                                        {item.title}
                                                        <div className="pl-3 text-xs font-thin" >{item.total}</div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="flex-shrink-0 w-14" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className={classNames(...[
                    "hidden",
                    showSidebar ? "md:fixed md:inset-y-0 md:flex md:w-80 md:flex-col" : ""
                ])}>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 overflow-hidden bg-indigo-700 hover:overflow-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <BoltIcon className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-300" />
                            <div className="text-lg font-semibold text-white">BE on the Road</div>
                        </div>
                        <div className="flex flex-col flex-1 mt-5">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {categories.map((item) => (
                                    <Link key={item.title} href={hrefWithQueryParams(item.path)}>
                                        <a
                                            key={item.seriesId}
                                            className={classNames(
                                                router.asPath === item.path ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                                'group cursor-pointer flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                        >
                                            <ChevronRightIcon className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-300" aria-hidden="true" />
                                            {item.title}
                                            <div className="pl-3 text-xs font-thin" >{item.total}</div>
                                        </a>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className={classNames(...[
                    "flex flex-col flex-1",
                    showSidebar ? 'md:pl-80' : '',
                ])}>
                    <div className="top-0 z-10 flex flex-shrink-0 h-16">
                        <button className={classNames(...[
                            "hidden absolute p-4 md:block",
                        ])} onClick={() => setShowSidebar(!showSidebar)}>
                            {showSidebar ? <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" /> :
                                <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />}
                        </button>

                        <button
                            type="button"
                            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="w-6 h-6" aria-hidden="true" />
                        </button>

                        <div className="grid items-center justify-center pr-4 mx-auto text-center md:pr-0 max-w-7xl">
                            <h1 className="text-2xl font-semibold text-gray-900">{header}</h1>
                            {userId && <h1 className="flex items-center justify-center text-sm font-thin text-gray-400">
                                <UserIcon className="w-3 h-3" />
                                {userId}
                            </h1>}
                        </div>
                    </div>

                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
