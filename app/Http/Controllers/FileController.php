<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DocumentDownload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileController extends Controller
{
    /**
     * Download a document file.
     */
    public function download(Request $request, Document $document)
    {
        // Check if document is active
        if (!$document->is_active) {
            return back()->with('error', 'This document is not active and cannot be downloaded.');
        }

        // Check if file exists
        if (!$document->file_path || !Storage::disk('local')->exists($document->file_path)) {
            // For seeded data without actual files, simulate download
            $this->trackDownload($request, $document);

            return back()->with('error', 'File not found. This may be due to seeded data without actual files.');
        }

        // Track the download
        $this->trackDownload($request, $document);

        // Increment download count
        $document->increment('download_count');

        // Return file download response
        $filePath = Storage::disk('local')->path($document->file_path);
        $filename = $document->original_filename ?: $document->title . '.' . strtolower($document->file_type);

        return response()->download($filePath, $filename);
    }

    /**
     * Track document download.
     */
    private function trackDownload(Request $request, Document $document)
    {
        DocumentDownload::create([
            'document_id' => $document->id,
            'user_id' => auth()->id(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'downloaded_at' => now(),
        ]);
    }
}
