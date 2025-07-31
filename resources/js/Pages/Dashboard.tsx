import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Hero from '@/Components/Hero';
import SearchFilter from '@/Components/SearchFilter';
import DocumentCard from '@/Components/DocumentCard';
import { Search } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    description: string;
    type: 'produk' | 'dokumen' | 'buletin';
    file_type: string;
    created_at: string;
    download_count: number;
}

interface DashboardProps {
    documents: {
        data: Document[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

export default function Dashboard({ documents, filters }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Digital Document Storage - Beranda" />
            
            <Hero />

            <main className="container mx-auto px-4 py-8">
                <SearchFilter
                    initialSearch={filters.search}
                    initialType={filters.type}
                    showTypeFilter={true}
                />

                {documents.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {documents.data.map((document) => (
                                <DocumentCard key={document.id} document={document} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {documents.links && documents.links.length > 3 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex space-x-2">
                                    {documents.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                link.active
                                                    ? 'bg-[var(--primary-color)] text-white'
                                                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Search className="mx-auto text-4xl text-[var(--secondary-color)] mb-4 w-16 h-16" />
                        <p className="text-[var(--text-secondary)]">Tidak ada dokumen yang ditemukan</p>
                    </div>
                )}
            </main>
        </AppLayout>
    );
}
