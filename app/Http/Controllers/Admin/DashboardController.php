<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\DocumentDownload;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get statistics
        $totalDocuments = Document::count();
        $activeDocuments = Document::active()->count();
        $totalDownloads = Document::sum('download_count');
        $recentDownloads = DocumentDownload::with('document', 'user')
            ->orderBy('downloaded_at', 'desc')
            ->limit(10)
            ->get();

        // Get documents by type
        $documentsByType = [
            'produk' => Document::byType('produk')->count(),
            'dokumen' => Document::byType('dokumen')->count(),
            'buletin' => Document::byType('buletin')->count(),
        ];

        // Get recent documents
        $recentDocuments = Document::with('creator')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get popular documents
        $popularDocuments = Document::with('creator')
            ->orderBy('download_count', 'desc')
            ->limit(5)
            ->get();

        // Get all documents for the admin interface
        $allDocuments = Document::with('creator')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalDocuments' => $totalDocuments,
                'activeDocuments' => $activeDocuments,
                'totalDownloads' => $totalDownloads,
                'documentsByType' => $documentsByType,
            ],
            'recentDocuments' => $recentDocuments,
            'popularDocuments' => $popularDocuments,
            'recentDownloads' => $recentDownloads,
            'allDocuments' => $allDocuments,
        ]);
    }
}
