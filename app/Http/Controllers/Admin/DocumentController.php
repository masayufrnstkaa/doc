<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of documents for admin.
     */
    public function index(Request $request)
    {
        $query = Document::with('creator');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $query->byType($request->type);
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate(15);

        $allDocuments = Document::with('creator')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'allDocuments' => $allDocuments,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:produk,dokumen,buletin',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:10240', // 10MB max
        ]);

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('documents', $fileName, 'local');

        Document::create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'file_type' => strtoupper($file->getClientOriginalExtension()),
            'file_path' => $filePath,
            'file_size' => $file->getSize(),
            'original_filename' => $file->getClientOriginalName(),
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.documents.index')->with('success', 'Document created successfully.');
    }

    /**
     * Display the specified document.
     */
    public function show(Document $document)
    {
        $document->load('creator', 'downloads.user');

        return Inertia::render('Admin/Documents/Show', [
            'document' => $document,
        ]);
    }

    /**
     * Update the specified document in storage.
     */
    public function update(Request $request, Document $document)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:produk,dokumen,buletin',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:10240', // 10MB max
            'is_active' => 'boolean',
        ]);

        $updateData = [
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'is_active' => $request->boolean('is_active', true),
        ];

        // Handle file upload if provided
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($document->file_path && Storage::disk('local')->exists($document->file_path)) {
                Storage::disk('local')->delete($document->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('documents', $fileName, 'local');

            $updateData['file_type'] = strtoupper($file->getClientOriginalExtension());
            $updateData['file_path'] = $filePath;
            $updateData['file_size'] = $file->getSize();
            $updateData['original_filename'] = $file->getClientOriginalName();
        }

        $document->update($updateData);

        return redirect()->route('admin.documents.index')->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified document from storage.
     */
    public function destroy(Document $document)
    {
        // Delete file if exists
        if ($document->file_path && Storage::disk('local')->exists($document->file_path)) {
            Storage::disk('local')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('admin.documents.index')->with('success', 'Document deleted successfully.');
    }
}
