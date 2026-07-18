import AdminLayout from '@/Layouts/AdminLayout'
import { router, usePage } from '@inertiajs/react'
import React from 'react'

export default function DataPengajuanDiskon({ pengajuan, jenis: jenisFilter }) {
    const { flash } = usePage().props
    const [search, setSearch] = React.useState('')
    const [jenis, setJenis] = React.useState(jenisFilter || '')
    const confirmRef = React.useRef(null)
    const [confirmData, setConfirmData] = React.useState({ title: '', text: '', color: '', onConfirm: null })

    React.useEffect(() => {
        if (flash?.success) {
            Swal.fire({ icon: 'success', title: 'Berhasil', text: flash.success, timer: 1500, showConfirmButton: false })
        }
        if (flash?.error) {
            Swal.fire({ icon: 'error', title: 'Gagal', text: flash.error })
        }
    }, [flash])

    const openConfirm = (title, text, color, onConfirm) => {
        setConfirmData({ title, text, color, onConfirm })
        confirmRef.current?.showModal()
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/pengajuan-diskon', { search, jenis }, { preserveState: true, replace: true })
    }

    const statusBadge = (status) => {
        if (status === 'disetujui') return <span className="badge badge-success badge-sm">Disetujui</span>
        if (status === 'ditolak') return <span className="badge badge-error badge-sm">Ditolak</span>
        return <span className="badge badge-warning badge-sm">Pending</span>
    }

    const jenisBadge = (itemJenis) => {
        if (itemJenis === 'desain') return <span className="badge badge-info badge-sm"><i className="fas fa-palette mr-1"></i> Desain</span>
        return <span className="badge badge-secondary badge-sm"><i className="fas fa-industry mr-1"></i> Produksi</span>
    }

    return (
        <AdminLayout>
            <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                        <h2 className="card-title">Data Pengajuan Diskon</h2>
                    </div>

                    <div className="mb-3">
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                            <input
                                type="text"
                                placeholder="Cari no invoice, customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="text-sm select select-bordered select-success select-sm w-full max-w-[180px]"
                                value={jenis}
                                onChange={(e) => setJenis(e.target.value)}
                            >
                                <option value="">Semua Jenis</option>
                                <option value="desain">Desain</option>
                                <option value="produksi">Produksi</option>
                            </select>
                            <button type="submit" className="btn btn-success btn-sm">
                                <i className="fas fa-search"></i> Cari
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No Invoice</th>
                                    <th>Jenis</th>
                                    <th>Customer</th>
                                    <th>Tanggal</th>
                                    <th>Harga Awal</th>
                                    <th>Mode Diskon</th>
                                    <th>Diskon</th>
                                    <th>Harga Diskon</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {pengajuan.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="text-center py-8 text-base-content/50">
                                            Tidak ada data pengajuan diskon
                                        </td>
                                    </tr>
                                ) : (
                                    pengajuan.data?.map((item, idx) => (
                                        <tr key={item.id}>
                                            <td>{pengajuan.from + idx}</td>
                                            <td className="font-mono font-semibold">{item.no_invoice}</td>
                                            <td>{jenisBadge(item.jenis)}</td>
                                            <td>{item.customer}</td>
                                            <td>{item.tanggal}</td>
                                            <td className="tabular-nums">Rp {Number(item.harga_awal || 0).toLocaleString('id-ID')}</td>
                                            <td>
                                                <span className={`badge badge-sm ${item.mode_diskon === 'persen' ? 'badge-info' : 'badge-warning'}`}>
                                                    {item.mode_diskon === 'persen' ? 'Persen' : 'Rupiah'}
                                                </span>
                                            </td>
                                            <td className="tabular-nums">
                                                {item.mode_diskon === 'persen' ? `${item.diskon}%` : `Rp ${Number(item.diskon).toLocaleString('id-ID')}`}
                                            </td>
                                            <td className="tabular-nums font-semibold text-success">Rp {Number(item.harga_diskon || 0).toLocaleString('id-ID')}</td>
                                            <td>{statusBadge(item.status)}</td>
                                            <td>
                                                {item.status === 'pending' && (
                                                    <div className="flex gap-1">
                                                        <button className="btn btn-success btn-xs" onClick={() => openConfirm('Setujui Pengajuan?', 'Diskon akan diterapkan ke invoice', 'success', () => router.put(`/pengajuan-diskon/${item.id}/approve`))}>
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button className="btn btn-error btn-xs" onClick={() => openConfirm('Tolak Pengajuan?', 'Pengajuan akan ditolak', 'error', () => router.put(`/pengajuan-diskon/${item.id}/reject`))}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                )}
                                                {item.status === 'disetujui' && (
                                                    <button className="btn btn-warning btn-xs" onClick={() => openConfirm('Batalkan Persetujuan?', 'Status akan kembali ke pending', 'warning', () => router.put(`/pengajuan-diskon/${item.id}/cancel`))}>
                                                        Batal
                                                    </button>
                                                )}
                                                {item.status === 'ditolak' && (
                                                    <button className="btn btn-success btn-xs" onClick={() => openConfirm('Setujui Pengajuan?', 'Diskon akan diterapkan ke invoice', 'success', () => router.put(`/pengajuan-diskon/${item.id}/approve`))}>
                                                        <i className="fas fa-check"></i> Setujui
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pengajuan.last_page > 1 && (
                        <div className="flex justify-center mt-4">
                            <div className="join">
                                {pengajuan.links?.map((link, i) => (
                                    <button
                                        key={i}
                                        className={`join-item btn btn-sm ${link.active ? 'btn-success' : ''}`}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <dialog ref={confirmRef} className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{confirmData.title}</h3>
                    <p className="py-2 text-base-content/70">{confirmData.text}</p>
                    <div className="modal-action">
                        <button className="btn btn-sm" onClick={() => confirmRef.current?.close()}>Batal</button>
                        <button className={`btn btn-sm ${confirmData.color === 'success' ? 'btn-success' : confirmData.color === 'error' ? 'btn-error' : 'btn-warning'}`} onClick={() => { confirmRef.current?.close(); confirmData.onConfirm?.() }}>
                            Ya
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </AdminLayout>
    )
}
