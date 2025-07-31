import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SearchFilter from '@/Components/SearchFilter';
import DocumentCard from '@/Components/DocumentCard';
import { Package } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    description: string;
    type: 'produk' | 'dokumen' | 'buletin';
    file_type: string;
    created_at: string;
    download_count: number;
}

interface ProductsIndexProps {
    documents: {
        data: Document[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
    };
}

export default function ProductsIndex({ documents, filters }: ProductsIndexProps) {
    return (
        <AppLayout>
            <Head title="Produk - Digital Document Storage" />

            {/* Header Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <Package className="mx-auto text-4xl text-green-600 mb-4 w-16 h-16" />
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Produk Kami
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Koleksi aplikasi dan sistem yang telah dikembangkan untuk berbagai kebutuhan bisnis dan teknologi.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <SearchFilter
                    initialSearch={filters.search}
                    showTypeFilter={false}
                />

                {documents.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {documents.data.map((document) => (
                                <DocumentCard key={document.id} document={document} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {documents.links && documents.links.length > 3 && (
                            <div className="flex justify-center">
                                <nav className="flex space-x-2">
                                    {documents.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${link.active
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
                        <div className="text-[var(--text-secondary)] text-lg mb-4">
                            Tidak ada produk yang ditemukan
                        </div>
                        <p className="text-[var(--text-secondary)]">
                            Coba ubah kriteria pencarian yang Anda gunakan
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
