import Link from 'next/link'
import api from '../utilities/api';
import { useEffect, useState } from 'react';


export default function Navigation() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        api.getCategories().then(categories => {
            setCategories(categories.data);
        })
    }, [])
    return (
        <header className="bg-indigo-600">
            <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex items-center justify-center w-full py-6 border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
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
                </div>
            </nav>
        </header>
    )
}
