import { Link } from '@inertiajs/react';
import { Search, Shield } from 'lucide-react';

interface HeroProps {
    title?: string;
    subtitle?: string;
    stats?: {
        documents: number;
        downloads: number;
        users: number;
    };
}

export default function Hero({ title, subtitle, stats }: HeroProps) {

    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                        Platform Penyimpanan
                        <span className="text-[var(--primary-color)]"> Dokumen Digital</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] mb-8">
                        Akses mudah ke produk, dokumen, dan buletin. Temukan dan unduh file yang Anda butuhkan dengan cepat dan aman.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#documents" className="btn btn-primary text-lg px-8 py-3">
                            <Search className="text-lg mr-2 inline-block" />
                            Jelajahi Dokumen
                        </Link>
                        <Link href="/admin" className="btn btn-secondary text-lg px-8 py-3">
                            <Shield className="text-lg mr-2 inline-block" />
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
