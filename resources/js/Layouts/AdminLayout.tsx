import { Link, router, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import {
    Shield,
    LayoutDashboard,
    FileText,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { PageProps } from '@/types';

interface Props {
    children: ReactNode;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AdminPageProps extends PageProps {
    auth: {
        user: User;
    };
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage<AdminPageProps>().props;
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, link: '/admin' },
        { id: 'documents', name: 'Kelola Dokumen', icon: FileText, link: '/admin/documents' },
    ];

    const handleLogout = () => {
        router.post('logout');
    };

    return (
        <div className="min-h-screen bg-[var(--background-color)]">
            {/* Header Navigation - matching original design */}
            <nav className="navbar">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Shield className="text-2xl text-[var(--primary-color)] mr-3" />
                            <span className="text-xl font-bold text-[var(--text-primary)]">Admin Panel</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <Link
                                        key={tab.id}
                                        href={tab.link}
                                        className={
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${url === tab.link
                                                ? 'text-[var(--primary-color)] bg-blue-50'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                                            }`}
                                    >
                                        <Icon className="text-sm mr-2" />
                                        {tab.name}
                                    </Link>
                                );
                            })}

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm"
                                >
                                    Lihat Website
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-danger text-sm"
                                >
                                    <LogOut className="text-sm mr-2 inline-block" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[var(--border-color)]">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <Link
                                            key={tab.id}
                                            href={tab.link}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${url.startsWith(tab.link)
                                                ? 'text-[var(--primary-color)] bg-blue-50'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                                                }`}
                                        >
                                            <Icon className="text-sm mr-2" />
                                            {tab.name}
                                        </Link>
                                    );
                                })}
                                <div className="border-t border-[var(--border-color)] pt-3 mt-3">
                                    <Link
                                        href="/"
                                        className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
                                    >
                                        Lihat Website
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-[var(--danger-color)] hover:bg-red-50"
                                    >
                                        <LogOut className="text-sm mr-2 inline-block" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main content - matching original structure */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
