<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get admin user (already created by DatabaseSeeder)
        $admin = User::where('email', 'admin@docstorage.com')->first();

        // Create sample products (produk)
        $products = [
            [
                'title' => 'Sistem Manajemen Inventory',
                'description' => 'Aplikasi untuk mengelola stok barang dan inventory perusahaan dengan fitur real-time monitoring.',
                'type' => 'produk',
                'file_type' => 'PDF',
            ],
            [
                'title' => 'Platform E-Learning',
                'description' => 'Solusi pembelajaran online dengan fitur video conference, quiz, dan tracking progress siswa.',
                'type' => 'produk',
                'file_type' => 'DOCX',
            ],
            [
                'title' => 'Aplikasi Mobile Banking',
                'description' => 'Aplikasi perbankan mobile dengan keamanan tinggi dan interface yang user-friendly.',
                'type' => 'produk',
                'file_type' => 'PDF',
            ],
        ];

        // Create sample documents (dokumen)
        $documents = [
            [
                'title' => 'Panduan Implementasi ISO 27001',
                'description' => 'Dokumen lengkap mengenai standar keamanan informasi dan langkah-langkah implementasinya.',
                'type' => 'dokumen',
                'file_type' => 'PDF',
            ],
            [
                'title' => 'Kebijakan Keamanan Data',
                'description' => 'Dokumen kebijakan perusahaan terkait pengelolaan dan keamanan data sensitif.',
                'type' => 'dokumen',
                'file_type' => 'DOCX',
            ],
            [
                'title' => 'SOP Pengembangan Aplikasi',
                'description' => 'Standard Operating Procedure untuk proses pengembangan aplikasi dari planning hingga deployment.',
                'type' => 'dokumen',
                'file_type' => 'PDF',
            ],
            [
                'title' => 'Manual User Testing',
                'description' => 'Panduan lengkap untuk melakukan user testing dan analisis feedback pengguna.',
                'type' => 'dokumen',
                'file_type' => 'DOCX',
            ],
        ];

        // Create sample bulletins (buletin)
        $bulletins = [
            [
                'title' => 'Buletin Teknologi Q1 2024',
                'description' => 'Update terbaru mengenai tren teknologi, inovasi, dan perkembangan industri IT di kuartal pertama 2024.',
                'type' => 'buletin',
                'file_type' => 'PDF',
            ],
            [
                'title' => 'Newsletter Keamanan Cyber',
                'description' => 'Informasi terkini tentang ancaman keamanan cyber dan tips proteksi untuk perusahaan.',
                'type' => 'buletin',
                'file_type' => 'PDF',
            ],
            [
                'title' => 'Buletin Pengembangan Tim',
                'description' => 'Tips dan strategi untuk pengembangan tim, produktivitas, dan kolaborasi yang efektif.',
                'type' => 'buletin',
                'file_type' => 'PDF',
            ],
        ];

        // Combine all documents
        $allDocuments = array_merge($products, $documents, $bulletins);

        // Create documents with realistic dates
        $dates = [
            '2024-01-10', '2024-01-15', '2024-01-20', '2024-01-25',
            '2024-02-01', '2024-02-05', '2024-02-12', '2024-02-15',
            '2024-02-28', '2024-03-01'
        ];

        foreach ($allDocuments as $index => $docData) {
            Document::create([
                'title' => $docData['title'],
                'description' => $docData['description'],
                'type' => $docData['type'],
                'file_type' => $docData['file_type'],
                'file_path' => null, // Will be set when files are uploaded
                'file_size' => rand(50000, 2000000), // Random file size between 50KB - 2MB
                'original_filename' => null,
                'download_count' => rand(0, 100),
                'is_active' => true,
                'created_by' => $admin->id,
                'created_at' => $dates[$index] ?? now(),
                'updated_at' => $dates[$index] ?? now(),
            ]);
        }

        $this->command->info('Initial data seeded successfully!');
        $this->command->info('Admin credentials:');
        $this->command->info('Email: admin@docstorage.com');
        $this->command->info('Password: admin123');
    }
}
