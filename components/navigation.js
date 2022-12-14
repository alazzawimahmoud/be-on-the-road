import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { categories } from '../data';


export default function Navigation() {
    const router = useRouter();
    return (
        <header className="bg-indigo-600">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-center border-b border-indigo-500 py-6 lg:border-none">
                    <div className="flex items-center">
                        {/* <a href="#">
                            <span className="sr-only">Your Company</span>
                            <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
                        </a> */}
                        <div className="ml-10 space-x-8 lg:block">

                            {categories.map((link) => (
                                <Link key={link.title} href={link.path}>
                                    <a className="text-base font-medium text-white hover:text-indigo-50">
                                        {link.title}
                                    </a>
                                </Link>
                            ))}

                        </div>
                    </div>
                    {/* <div className="ml-10 space-x-4">
                        <a
                            href="#"
                            className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                        >
                            Sign in
                        </a>
                        <a
                            href="#"
                            className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                            Sign up
                        </a>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}
