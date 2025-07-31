import { Calendar, Download, Eye, File, Package, BookOpen } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

interface Document {
    id: number;
    title: string;
    description: string;
    type: 'produk' | 'dokumen' | 'buletin';
    file_type: string;
    created_at: string;
    download_count: number;
}

interface DocumentCardProps {
    document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'produk': return Package;
            case 'dokumen': return File;
            case 'buletin': return BookOpen;
            default: return File;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'produk': return 'text-green-600 bg-green-100';
            case 'dokumen': return 'text-blue-600 bg-blue-100';
            case 'buletin': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const handleDownload = () => {
        router.visit(`/download/${document.id}`, {
            method: 'get'
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    const TypeIcon = getTypeIcon(document.type);

    return (
        <div className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(document.type)}`}>
                    <TypeIcon className="w-6 h-6" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(document.type)}`}>
                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                {document.title}
            </h3>

            <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
                {document.description}
            </p>

            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-4">
                <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(document.created_at)}
                </span>
                <span className="flex items-center">
                    <File className="w-4 h-4 mr-1" />
                    {document.file_type}
                </span>
            </div>

            <div className="flex gap-2">
                <a
                    href={`/download/${document.id}`}
                    className="flex-1 btn btn-primary text-sm"
                >
                    <Download className="w-4 h-4 mr-2 inline-block" />
                    Unduh
                </a>
                <a
                    href={`/download/${document.id}`}
                    className="btn btn-secondary text-sm px-4"
                >
                    <Eye className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
