import AdminDocumentList from "@/Components/AdminDocumentList"
import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import { Props } from "../Dashboard"


const IndexPage: React.FC<Props> = ({ stats, recentDocuments, popularDocuments, recentDownloads, allDocuments }) => {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Kelola Dokumen</h1>
                <AdminDocumentList documents={allDocuments} />
            </div>
        </AdminLayout>
    )
}

export default IndexPage
