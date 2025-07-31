<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DocumentController::class, 'index'])->name('dashboard');
Route::get('/produk', [DocumentController::class, 'products'])->name('products');
Route::get('/dokumen', [DocumentController::class, 'documents'])->name('documents');
Route::get('/buletin', [DocumentController::class, 'bulletins'])->name('bulletins');

// Public document viewing
Route::get('/documents/{document}', [DocumentController::class, 'show'])->name('documents.show');

// File download routes
Route::get('/download/{document}', [FileController::class, 'download'])->name('files.download');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('documents', AdminDocumentController::class);
});

require __DIR__.'/auth.php';
