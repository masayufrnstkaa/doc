import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Shield, LogIn, Loader } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login - Digital Document Storage" />
            
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-md w-full mx-4">
                    <div className="text-center mb-8">
                        <Shield className="mx-auto text-4xl text-[var(--primary-color)] mb-4 w-16 h-16" />
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Login</h1>
                        <p className="text-[var(--text-secondary)] mt-2">Masuk ke panel administrator</p>
                    </div>

                    <div className="card">
                        {status && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                    placeholder="admin@docstorage.com"
                                    required
                                    autoComplete="username"
                                    autoFocus
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                    placeholder="Masukkan password"
                                    required
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {(errors.email || errors.password) && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">Email atau password salah</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full btn btn-primary"
                            >
                                {processing ? (
                                    <Loader className="text-lg animate-spin mr-2 inline-block w-5 h-5" />
                                ) : (
                                    <LogIn className="text-lg mr-2 inline-block w-5 h-5" />
                                )}
                                {processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                            <div className="text-center">
                                <Link
                                    href="/"
                                    className="text-[var(--primary-color)] hover:text-[var(--primary-hover)] text-sm font-medium"
                                >
                                    ← Kembali ke Beranda
                                </Link>
                            </div>
                            
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Demo Login:</strong><br/>
                                    Email: admin@docstorage.com<br/>
                                    Password: admin123
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
