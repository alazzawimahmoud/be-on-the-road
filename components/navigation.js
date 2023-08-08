import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { categories } from '../data';


export default function Navigation() {
    const router = useRouter();
    return (
        <header className="bg-indigo-600">
            <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex items-center justify-center w-full py-6 border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        {/* <a href="#">
                            <span className="sr-only">Your Company</span>
                            <img className="w-auto h-10" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
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
                            className="inline-block px-4 py-2 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-opacity-75"
                        >
                            Sign in
                        </a>
                        <a
                            href="#"
                            className="inline-block px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50"
                        >
                            Sign up
                        </a>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}
