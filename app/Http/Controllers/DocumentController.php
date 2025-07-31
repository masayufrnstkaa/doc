<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display the homepage with all documents.
     */
    public function index(Request $request)
    {
        $query = Document::active()->with('creator');

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

        $documents = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Dashboard', [
            'documents' => $documents,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
            ],
        ]);
    }

    /**
     * Display products page.
     */
    public function products(Request $request)
    {
        $query = Document::active()->byType('produk')->with('creator');

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Products/Index', [
            'documents' => $documents,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display documents page.
     */
    public function documents(Request $request)
    {
        $query = Document::active()->byType('dokumen')->with('creator');

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display bulletins page.
     */
    public function bulletins(Request $request)
    {
        $query = Document::active()->byType('buletin')->with('creator');

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Bulletins/Index', [
            'documents' => $documents,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display a specific document.
     */
    public function show(Document $document)
    {
        $document->load('creator', 'downloads');

        return Inertia::render('Documents/Show', [
            'document' => $document,
        ]);
    }
}
