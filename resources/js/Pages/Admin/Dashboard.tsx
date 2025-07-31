import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminStats from '@/Components/AdminStats';
import AdminDocumentList from '@/Components/AdminDocumentList';

export interface Document {
    id: number;
    title: string;
    description: string;
    type: string;
    file_type: string;
    download_count: number;
    created_at: string;
    creator: {
        name: string;
    };
}

export interface Download {
    id: number;
    downloaded_at: string;
    document: {
        title: string;
        type: string;
    };
    user?: {
        name: string;
    };
    ip_address: string;
}

export interface Stats {
    totalDocuments: number;
    activeDocuments: number;
    totalDownloads: number;
    documentsByType: {
        produk: number;
        dokumen: number;
        buletin: number;
    };
}

export interface Props {
    stats: Stats;
    recentDocuments: Document[];
    popularDocuments: Document[];
    recentDownloads: Download[];
    allDocuments: Document[];
}

export default function AdminDashboard({ stats, recentDocuments, popularDocuments, recentDownloads, allDocuments }: Props) {

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Dashboard Admin</h1>
                <AdminStats documents={allDocuments} />
            </div>

        </AdminLayout>
    );
}
