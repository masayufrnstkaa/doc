import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Upload, Save, Loader } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    description: string;
    type: string;
    file_type: string;
    created_at: string;
    creator: {
        name: string;
    };
}

interface Props {
    documents: Document[];
}

export default function AdminDocumentList({ documents }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const [filterType, setFilterType] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'dokumen',
        fileType: 'PDF'
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredDocs = documents.filter(doc =>
        filterType === 'all' || doc.type === filterType
    );

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
            router.delete(`/admin/documents/${id}`, {
                onSuccess: () => {
                }
            });
        }
    };

    const handleEdit = (doc: Document) => {
        setEditingDoc(doc);
        setFormData({
            title: doc.title,
            description: doc.description,
            type: doc.type,
            fileType: doc.file_type
        });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingDoc(null);
        setFormData({
            title: '',
            description: '',
            type: 'dokumen',
            fileType: 'PDF'
        });
        setSelectedFile(null);
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('type', formData.type);

            if (selectedFile) {
                formDataToSend.append('file', selectedFile);
            }

            if (editingDoc) {
                // Update existing document
                formDataToSend.append('_method', 'PUT');
                router.post(`/admin/documents/${editingDoc.id}`, formDataToSend, {
                    onSuccess: () => {
                        setShowModal(false);
                        setEditingDoc(null);
                        setSelectedFile(null);
                    },
                    onFinish: () => setIsSubmitting(false)
                });
            } else {
                // Add new document - redirect back to admin dashboard after creating
                router.post('/admin/documents', formDataToSend, {
                    onSuccess: () => {
                        setShowModal(false);
                        setEditingDoc(null);
                        setSelectedFile(null);
                    },
                    onFinish: () => setIsSubmitting(false)
                });
            }
        } catch (error) {
            console.error('Error saving document:', error);
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingDoc(null);
        setSelectedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    >
                        <option value="all">Semua Kategori</option>
                        <option value="produk">Produk</option>
                        <option value="dokumen">Dokumen</option>
                        <option value="buletin">Buletin</option>
                    </select>
                </div>
                <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                >
                    <Plus className="text-sm mr-2 inline-block" />
                    Tambah Dokumen
                </button>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border-color)]">
                                <th className="text-left py-3 px-4 font-medium text-[var(--text-secondary)]">Judul</th>
                                <th className="text-left py-3 px-4 font-medium text-[var(--text-secondary)]">Kategori</th>
                                <th className="text-left py-3 px-4 font-medium text-[var(--text-secondary)]">Tanggal</th>
                                <th className="text-left py-3 px-4 font-medium text-[var(--text-secondary)]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.map((doc) => (
                                <tr key={doc.id} className="border-b border-[var(--border-color)] hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">{doc.title}</p>
                                            <p className="text-sm text-[var(--text-secondary)] truncate">{doc.description}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${doc.type === 'produk' ? 'text-green-600 bg-green-100' :
                                            doc.type === 'dokumen' ? 'text-blue-600 bg-blue-100' :
                                                'text-purple-600 bg-purple-100'
                                            }`}>
                                            {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                                        {formatDate(doc.created_at)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(doc)}
                                                className="text-[var(--primary-color)] hover:text-[var(--primary-hover)]"
                                            >
                                                <Edit className="text-sm" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="text-[var(--danger-color)] hover:text-red-600"
                                            >
                                                <Trash2 className="text-sm" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Document Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-6">
                            {editingDoc ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                        Judul Dokumen
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                        placeholder="Masukkan judul dokumen"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                        placeholder="Deskripsi dokumen"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                            Kategori
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                            required
                                        >
                                            <option value="dokumen">Dokumen</option>
                                            <option value="produk">Produk</option>
                                            <option value="buletin">Buletin</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                            Tipe File
                                        </label>
                                        <select
                                            name="fileType"
                                            value={formData.fileType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                            required
                                        >
                                            <option value="PDF">PDF</option>
                                            <option value="DOCX">DOCX</option>
                                            <option value="XLSX">XLSX</option>
                                            <option value="PPTX">PPTX</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                        File Upload {!editingDoc && '*'}
                                    </label>
                                    <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-6 text-center">
                                        <Upload className="text-2xl text-[var(--text-secondary)] mb-2 mx-auto" />
                                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                                            {selectedFile ? selectedFile.name : 'Klik untuk upload file atau drag & drop'}
                                        </p>
                                        <div className='mx-auto w-fit'>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                required={!editingDoc}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 btn btn-secondary"
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="text-sm mr-2 inline-block animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="text-sm mr-2 inline-block" />
                                            {editingDoc ? 'Update' : 'Simpan'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
