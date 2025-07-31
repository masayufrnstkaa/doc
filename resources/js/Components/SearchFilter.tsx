import { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { router } from '@inertiajs/react';

interface SearchFilterProps {
    initialSearch?: string;
    initialType?: string;
    showTypeFilter?: boolean;
}

export default function SearchFilter({
    initialSearch = '',
    initialType = '',
    showTypeFilter = true
}: SearchFilterProps) {
    const [search, setSearch] = useState(initialSearch);
    const [type, setType] = useState(initialType);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (type && showTypeFilter) params.set('type', type);

        const queryString = params.toString();
        const url = window.location.pathname + (queryString ? '?' + queryString : '');
        router.visit(url);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // Auto submit on search change
        const params = new URLSearchParams();
        if (e.target.value) params.set('search', e.target.value);
        if (type && showTypeFilter) params.set('type', type);

        const queryString = params.toString();
        const url = window.location.pathname + (queryString ? '?' + queryString : '');

        // Debounce the search
        clearTimeout((window as any).searchTimeout);
        (window as any).searchTimeout = setTimeout(() => {
            router.visit(url,
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true
                });
        }, 300);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        // Auto submit on type change
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (e.target.value && showTypeFilter) params.set('type', e.target.value);

        const queryString = params.toString();
        const url = window.location.pathname + (queryString ? '?' + queryString : '');
        router.visit(url);
    };

    const clearFilters = () => {
        setSearch('');
        setType('');
        router.visit(window.location.pathname);
    };

    const categories = [
        { value: '', label: 'Semua Kategori' },
        { value: 'produk', label: 'Produk' },
        { value: 'dokumen', label: 'Dokumen' },
        { value: 'buletin', label: 'Buletin' }
    ];

    return (
        <div className="card mb-4" id="documents">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari dokumen, produk, atau buletin..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        />
                    </div>
                </div>

                {showTypeFilter && (
                    <div className="md:w-48">
                        <select
                            value={type}
                            onChange={handleTypeChange}
                            className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-white"
                        >
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button
                    onClick={clearFilters}
                    className="btn btn-secondary whitespace-nowrap"
                >
                    <RotateCcw className="text-sm mr-2 inline-block w-4 h-4" />
                    Reset
                </button>
            </div>
        </div>
    );
}
