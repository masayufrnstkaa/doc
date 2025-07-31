import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Folder, Menu, X, Settings } from 'lucide-react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface AppPageProps {
    auth?: {
        user: User;
    };
    ziggy?: any;
}

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { url, props } = usePage<AppPageProps>();
    const auth = props.auth;

    const navigation = [
        { name: 'Beranda', href: '/', current: url === '/' },
        { name: 'Produk', href: '/produk', current: url === '/produk' },
        { name: 'Dokumen', href: '/dokumen', current: url === '/dokumen' },
        { name: 'Buletin', href: '/buletin', current: url === '/buletin' },
    ];

    return (
        <div className="min-h-screen bg-[var(--background-color)]">
            {/* Navigation */}
            <nav className="navbar">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Folder className="text-2xl text-[var(--primary-color)] mr-3" />
                            <span className="text-xl font-bold text-[var(--text-primary)]">DocStorage</span>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            item.current 
                                                ? 'text-[var(--primary-color)] bg-blue-50' 
                                                : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {auth?.user?.role === 'admin' ? (
                                    <Link
                                        href="/admin"
                                        className="btn btn-primary text-sm inline-flex items-center"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="btn btn-primary text-sm"
                                    >
                                        Login Admin
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            >
                                {isOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[var(--border-color)]">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            item.current 
                                                ? 'text-[var(--primary-color)] bg-blue-50' 
                                                : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {auth?.user?.role === 'admin' ? (
                                    <Link
                                        href="/admin"
                                        className="block w-full text-left btn btn-primary mt-4 inline-flex items-center"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block w-full text-left btn btn-primary mt-4"
                                    >
                                        Login Admin
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}