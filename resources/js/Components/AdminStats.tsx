import { Package, FileText, BookOpen, Folder } from 'lucide-react';

interface Document {
    id: number;
    type: string;
}

interface Props {
    documents: Document[];
}

export default function AdminStats({ documents }: Props) {
    const stats = [
        {
            title: 'Total Produk',
            count: documents.filter(doc => doc.type === 'produk').length,
            icon: Package,
            color: 'text-green-600 bg-green-100'
        },
        {
            title: 'Total Dokumen',
            count: documents.filter(doc => doc.type === 'dokumen').length,
            icon: FileText,
            color: 'text-blue-600 bg-blue-100'
        },
        {
            title: 'Total Buletin',
            count: documents.filter(doc => doc.type === 'buletin').length,
            icon: BookOpen,
            color: 'text-purple-600 bg-purple-100'
        },
        {
            title: 'Total Semua',
            count: documents.length,
            icon: Folder,
            color: 'text-gray-600 bg-gray-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.title}</p>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.count}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                                <Icon className="text-xl" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}