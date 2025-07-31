import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Edit,
    Download,
    FileText,
    Calendar,
    User,
    BarChart3,
    Activity,
    Trash2
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Download {
    id: number;
    downloaded_at: string;
    ip_address: string;
    user_agent: string;
    user?: User;
}

interface Document {
    id: number;
    title: string;
    description: string;
    type: string;
    file_type: string;
    file_size: number;
    original_filename: string;
    file_path: string;
    download_count: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    creator: User;
    downloads: Download[];
}

interface Props {
    document: Document;
}

export default function ShowDocument({ document }: Props) {
    const typeColors = {
        produk: 'bg-green-100 text-green-800',
        dokumen: 'bg-blue-100 text-blue-800',
        buletin: 'bg-purple-100 text-purple-800',
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
            window.location.href = `/admin/documents/${document.id}`;
            // You would use router.delete() here in a real implementation
        }
    };

    return (
        <AdminLayout>
            <Head title={`Document - ${document.title}`} />

            <div className="px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link
                                href="/admin/documents"
                                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">{document.title}</h1>
                                <div className="mt-1 flex items-center space-x-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[document.type as keyof typeof typeColors]
                                        }`}>
                                        {document.type}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${document.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {document.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link
                                href={`/download/${document.id}`}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Link>
                            <Link
                                href={`/admin/documents/${document.id}/edit`}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Document Information */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Document Information
                                </h3>

                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{document.title}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Type</dt>
                                        <dd className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[document.type as keyof typeof typeColors]
                                                }`}>
                                                {document.type}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{document.description}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created By</dt>
                                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                                            <User className="w-4 h-4 mr-1 text-gray-400" />
                                            {document.creator.name}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                                        <dd className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${document.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                <Activity className="w-3 h-3 mr-1" />
                                                {document.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                            {formatDate(document.created_at)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                            {formatDate(document.updated_at)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* File Information */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    File Information
                                </h3>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <FileText className="w-12 h-12 text-gray-400" />
                                        <div className="ml-4 flex-1">
                                            <p className="text-lg font-medium text-gray-900">
                                                {document.original_filename}
                                            </p>
                                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                                                <div>
                                                    <span className="font-medium">Type:</span> {document.file_type}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Size:</span> {formatFileSize(document.file_size)}
                                                </div>
                                                <div className="flex items-center">
                                                    <Download className="w-4 h-4 mr-1" />
                                                    <span className="font-medium">{document.download_count}</span> downloads
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/download/${document.id}`}
                                            className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download History */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Recent Downloads
                                </h3>

                                {document.downloads.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        User
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        IP Address
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {document.downloads.slice(0, 10).map((download) => (
                                                    <tr key={download.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {download.user ? download.user.name : 'Anonymous'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {download.ip_address}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {formatDateTime(download.downloaded_at)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <BarChart3 className="mx-auto w-12 h-12 text-gray-400" />
                                        <p className="mt-4 text-sm text-gray-500">No downloads yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Quick Stats
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Download className="w-5 h-5 text-blue-500" />
                                            <span className="ml-2 text-sm text-gray-600">Total Downloads</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {document.download_count}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-green-500" />
                                            <span className="ml-2 text-sm text-gray-600">File Size</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formatFileSize(document.file_size)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                            <span className="ml-2 text-sm text-gray-600">Created</span>
                                        </div>
                                        <span className="text-sm text-gray-900">
                                            {formatDate(document.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Actions
                                </h3>

                                <div className="space-y-3">
                                    <Link
                                        href={`/admin/documents/${document.id}/edit`}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Document
                                    </Link>

                                    <Link
                                        href={`/download/${document.id}`}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download File
                                    </Link>

                                    <button
                                        onClick={handleDelete}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Document
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
